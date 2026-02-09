const startButton = document.getElementById("start");
const stopButton = document.getElementById("stop");
const statusEl = document.getElementById("status");

const setStatus = (text) => {
  statusEl.textContent = `Status: ${text}`;
};

const withActiveTab = async (callback) => {
  const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
  if (!tab?.id) {
    setStatus("no active tab");
    return;
  }
  callback(tab.id);
};

startButton.addEventListener("click", () => {
  withActiveTab((tabId) => {
    chrome.tabs.sendMessage(tabId, { type: "START_CLEAN" }, (response) => {
      if (chrome.runtime.lastError) {
        setStatus("open YouTube history page");
        return;
      }
      setStatus(response?.status ?? "running");
    });
  });
});

stopButton.addEventListener("click", () => {
  withActiveTab((tabId) => {
    chrome.tabs.sendMessage(tabId, { type: "STOP_CLEAN" }, (response) => {
      if (chrome.runtime.lastError) {
        setStatus("open YouTube history page");
        return;
      }
      setStatus(response?.status ?? "stopped");
    });
  });
});
