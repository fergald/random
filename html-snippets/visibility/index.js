window.addEventListener("visibilitychange", e => {
  logElement.textContent += `event ${new Date()} ${document.visibilityState}\n`;
});
