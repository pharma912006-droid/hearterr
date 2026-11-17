# HeartCare

Offline cardiovascular wellness app (educational, not a diagnostic tool).

## Run
Easiest: double-click index.html. Everything is linked by relative paths, so keep the folder structure as it is.

Offline install (optional): serve the folder over http://localhost or https so the service worker can cache it.

    cd heartcare
    python3 -m http.server 8080

Open http://localhost:8080 once while online, then it works offline and can be installed from the browser menu. To publish, upload the folder to GitHub Pages or any static host.

## Files
- index.html: entry page linking everything below
- css/styles.css: light glass theme, responsive layout
- js/engine.js: BMI helpers and the rules engine that explains each recommendation
- js/app.js: pages, IndexedDB storage, charts, 3D heart and body
- vendor/: Chart.js and three.js, bundled locally
- data/: medical knowledge base (drugs, supplements, exercise, safety, audit). Prototype subset, marked as needing pharmacist review
- data/data.js: the JSON files bundled for direct opening. Run `python3 tools/build_data.py` after editing any JSON
- sw.js, manifest.json: offline cache and installable app

User data stays in your browser (IndexedDB). Export and import a backup from Settings.

## Troubleshooting
- Buttons or pages seem dead: open the browser console (F12) and look for a red error. The app now shows a notice on the page instead of failing silently.
- No 3D view: your browser or device has WebGL switched off. The 3D panels are replaced by a message; the substance buttons, study notes, BMI and charts still work.
- "Saving is unavailable" notice: the browser blocks storage (private mode or a restricted preview). Use a normal window to keep your data.
- Old version keeps appearing after you edit files: raise the version in `sw.js` (`const V='heartcare-v4'` to `v5`, and so on) every time you ship changes. App files are now fetched network-first, so edits show up on the next reload.
