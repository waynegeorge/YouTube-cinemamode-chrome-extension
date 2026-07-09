// Automatically enables cinema (theatre) mode on YouTube watch pages.
//
// Approach: rather than sending a synthetic "T" keypress (which is a blind
// toggle and could switch theatre mode OFF if it is already on), we inspect
// the page state and only click YouTube's own size button when needed.

const POLL_INTERVAL_MS = 250;
const MAX_ATTEMPTS = 40; // give up after ~10 seconds

let pollTimer = null;

function isWatchPage() {
  return location.pathname === "/watch";
}

function enableTheaterMode() {
  const watchFlexy = document.querySelector("ytd-watch-flexy");
  if (!watchFlexy) {
    return false; // page not ready yet
  }

  // Already in theatre mode or fullscreen — nothing to do.
  if (watchFlexy.hasAttribute("theater") || watchFlexy.hasAttribute("fullscreen")) {
    return true;
  }

  const sizeButton = document.querySelector("button.ytp-size-button");
  if (!sizeButton) {
    return false; // player controls not ready yet
  }

  sizeButton.click();

  // Confirm the click took effect; if not, keep polling.
  return watchFlexy.hasAttribute("theater");
}

function startPolling() {
  if (pollTimer !== null) {
    clearInterval(pollTimer);
    pollTimer = null;
  }

  if (!isWatchPage()) {
    return;
  }

  let attempts = 0;
  pollTimer = setInterval(() => {
    attempts += 1;
    if (enableTheaterMode() || attempts >= MAX_ATTEMPTS) {
      clearInterval(pollTimer);
      pollTimer = null;
    }
  }, POLL_INTERVAL_MS);
}

// YouTube is a single-page app: this fires on every in-app navigation
// (e.g. clicking a video from the home page or a related video).
window.addEventListener("yt-navigate-finish", startPolling);

// Handle the initial full-page load (e.g. opening a video link directly).
startPolling();
