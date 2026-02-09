let isRunning = false;
let removedCount = 0;

const sleep = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const coreKeywords = [
  "jee",
  "neet",
  "cbse",
  "class 11",
  "class 12",
  "class xi",
  "class xii",
  "board exam",
  "ncert",
  "iit-jee",
  "jee mains",
  "jee advanced",
];

const eduContextKeywords = [
  "chapter",
  "lecture",
  "lectures",
  "batch",
  "batches",
  "revision",
  "syllabus",
  "topic",
  "notes",
  "exercise",
  "dpp",
];

const subjectKeywords = [
  "physics",
  "chemistry",
  "maths",
  "math",
  "biology",
  "botany",
  "zoology",
];

const normalize = (text) => text.toLowerCase().replace(/\s+/g, " ").trim();

const isEducational = (title) => {
  const text = normalize(title);
  if (!text) return false;

  const hasCore = coreKeywords.some((keyword) => text.includes(keyword));
  if (hasCore) return true;

  const hasSubject = subjectKeywords.some((keyword) => text.includes(keyword));
  const hasContext = eduContextKeywords.some((keyword) => text.includes(keyword));
  return hasSubject && hasContext;
};

const getHistoryItems = () =>
  Array.from(
    document.querySelectorAll(
      "ytd-video-renderer,ytd-playlist-video-renderer,ytd-reel-item-renderer"
    )
  );

const getTitleFromItem = (item) => {
  const titleEl = item.querySelector("#video-title");
  return titleEl?.textContent?.trim() ?? "";
};

const openMenu = async (item) => {
  const menuButton = item.querySelector(
    "ytd-menu-renderer #button, ytd-menu-renderer button"
  );
  if (!menuButton) return false;
  menuButton.click();
  await sleep(350);
  return true;
};

const clickRemoveFromHistory = async () => {
  const menuItems = Array.from(
    document.querySelectorAll(
      "ytd-menu-service-item-renderer, tp-yt-paper-item"
    )
  );
  const removeItem = menuItems.find((item) => {
    const text = item.textContent?.toLowerCase() ?? "";
    return text.includes("remove from watch history");
  });
  if (!removeItem) return false;
  removeItem.click();
  await sleep(800);
  return true;
};

const processItem = async (item) => {
  const title = getTitleFromItem(item);
  if (isEducational(title)) return false;

  const menuOpened = await openMenu(item);
  if (!menuOpened) return false;

  const removed = await clickRemoveFromHistory();
  if (removed) removedCount += 1;
  return removed;
};

const autoScroll = async () => {
  window.scrollBy(0, window.innerHeight * 1.2);
  await sleep(600);
};

const startCleaning = async () => {
  isRunning = true;
  removedCount = 0;

  while (isRunning) {
    const items = getHistoryItems();
    let didRemove = false;

    for (const item of items) {
      if (!isRunning) break;
      const removed = await processItem(item);
      if (removed) {
        didRemove = true;
        await sleep(600);
      }
    }

    if (!isRunning) break;
    if (!didRemove) {
      await autoScroll();
    }
  }
};

chrome.runtime.onMessage.addListener((message, _sender, sendResponse) => {
  if (message.type === "START_CLEAN") {
    if (!isRunning) {
      startCleaning();
    }
    sendResponse({ status: "running" });
    return true;
  }

  if (message.type === "STOP_CLEAN") {
    isRunning = false;
    sendResponse({ status: `stopped (removed ${removedCount})` });
    return true;
  }

  return false;
});
