function logIt(...data) {
  data.splice(0, 0, new Date());
  console.log(...data);
  const d = document.createElement("div");
  d.textContent = data.join(" | ");
  document.querySelector("#content").appendChild(d);
}
addEventListener("visibilitychange", (e) => {
  logIt(e.type, document.visibilityState);
});

addEventListener("freeze", (e) => {
  logIt(e.type);
});

let count = 0;

setInterval(() => {
  logIt("interval", count++);
}, 30 * 1000)


function fetchLater(url, limitMs) {
  const finalTime = Date.now() + limitMs;
  const timeLeft = () => {
    return finalTime - Date.now();
  }
  let abortController = new AbortController();
  let fetchResult = fetchLater(url, { signal: abortController.signal });

  const pagehideHandler = e => {
    if (!e.persisted) {
      // Not going into BFCache.
      return;
    }
    if (fetchResult.activated) {
      // It was already sent.
      removeEventListener("pagehide", pagehideHandler);
      return;
    }
    abortController.abort();
    abortController = new AbortController();
    fetchResult = fetchLater(url, {
      signal: abortController,
      backgroundTimeout: timeLeft()
    });
  }
  addEventListener("pagehide", pagehideHandler);

  // Send it on time.
  setTimeout(() => {
    removeEventListener("pagehide", pagehideHandler);
    if (fetchResult.activated) {
      // It was already sent.
      return;
    }
    abortController.abort();
    fetch(url);
  }, timeLeft());
}
