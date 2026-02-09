# YouTube History Cleaner (JEE/NEET/CBSE Filter)

This is a Chrome/Edge extension that **removes non-educational videos** from your YouTube watch history.  
It keeps only videos related to **JEE, NEET, Class 11–12, CBSE**, and **chapter-wise lectures/batches**.

## ✅ What counts as “educational” (kept)
- JEE / NEET / CBSE / Board exam content
- Class 11 / Class 12 / XI / XII
- Chapter-wise lectures, batches, revision, syllabus topics
- Subjects like Physics/Chemistry/Maths/Biology **only when** combined with lecture/batch/chapter/class context

## ❌ What gets removed
Everything else, including “science facts”, “black hole explained”, etc.

---

# Step-by-step (No Coding Required)

## 1) Download the ZIP (GitHub)
1. Open the GitHub page where these files live.
2. Look for a green **Code** button (top-right of the file list).
3. Click **Code** → click **Download ZIP**.
4. Your browser will download a file like `Dooooob-main.zip` (name may vary).

## 2) Extract/unzip the ZIP
### Windows
1. Open **File Explorer** → go to your **Downloads** folder.
2. Right-click the ZIP file → click **Extract All…**
3. Choose a location (Desktop is fine) → click **Extract**.

### Mac
1. Open **Finder** → go to **Downloads**.
2. Double-click the ZIP file to unzip it.
3. A new folder will appear next to it.

### After extracting (important)
Open the extracted folder and make sure you see files like:
- `manifest.json`
- `popup.html`
- `popup.js`
- `contentScript.js`

✅ If you do **not** see `manifest.json`, you are in the wrong folder.  
Open the folder again until you see it.

## 3) Install the extension (Chrome / Edge)
1. Open Chrome.
2. Go to: `chrome://extensions`
3. Turn **Developer mode** ON (top-right).
4. Click **Load unpacked**.
5. Select the **folder that contains `manifest.json`** (not the ZIP file).

> The extension icon will appear in your browser toolbar.

---

## 4) Use the extension
1. Open YouTube and go to your **History page**:  
   `https://www.youtube.com/feed/history`
2. Click the extension icon.
3. Click **“Start Cleaning”**.
4. Leave the tab open while it works.  
   It will scroll and remove non-educational videos.

You can click **“Stop”** anytime.

---

## 5) If something is removed by mistake
Unfortunately YouTube does not provide a restore option for removed history items.  
If you want, I can help you fine-tune the educational filter to be more strict or more lenient.

---

# Fixing “Manifest is not valid JSON” error
This error happens when Chrome cannot read `manifest.json`.  
Follow these exact steps:

1. **Do not select the ZIP file** in “Load unpacked.”  
   You must select the **folder** that contains `manifest.json`.
2. Open the folder and make sure the file is actually named:  
   **`manifest.json`** (not `manifest.json.txt`).
   - On Windows: turn on **View → File name extensions** in File Explorer.
3. If you downloaded files manually:
   - Re-download the ZIP.
   - Extract it.
   - Load the extracted folder again.

If you still see the error, tell me **exactly** which folder you selected and I’ll guide you.
