addEventListener("pageshow", e => {
  const logDiv = document.getElementById("logPre");
  logDiv.textContent += `Peristed ${e.persisted}\n`;
  const navEntries = performance.getEntriesByType("navigation");
  for (const navEntry of navEntries) {
  logDiv.textContent += `Reasons ${JSON.stringify(navEntry.notRestoredReasons, null, "  ")}\n`;
  }

  const iframeDiv = document.getElementById("iframeDiv");
  const iframe = document.createElement("iframe");
  iframeDiv.appendChild(iframe);
});

addEventListener("pagehide", () => {
  const iframeDiv = document.getElementById("iframeDiv");
  iframeDiv.innerHTML = "";
});
