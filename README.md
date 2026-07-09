# YouTube Cinema Mode

A minimal Chrome extension that automatically switches YouTube videos to cinema (theatre) mode.

## How it works

A content script runs on YouTube watch pages. Instead of simulating a "T" keypress (which is a blind toggle and could accidentally switch theatre mode *off*), it checks the page state via the `theater` attribute on the `<ytd-watch-flexy>` element and, only if theatre mode is not already active, clicks YouTube's own size button (`.ytp-size-button`).

Because YouTube is a single-page app, the script also listens for the `yt-navigate-finish` event so it works when you click through to a video from the home page, search results, or related videos — not just on a full page load.

If you are watching in fullscreen, the script leaves things alone.

## Installation

1. Open Chrome and go to `chrome://extensions`.
2. Enable **Developer mode** (toggle in the top-right corner).
3. Click **Load unpacked** and select this folder.
4. Open any YouTube video — it should switch to cinema mode automatically.

## Files

- `manifest.json` — Manifest V3 configuration; runs the content script on `youtube.com`.
- `content.js` — the logic that detects and enables theatre mode.
