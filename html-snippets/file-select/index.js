window.addEventListener("pageshow", e => {
  bfcacheLogDiv.textContent = `Restored from BFCache = ${e.persisted}`;
});

function openGoogleTab() {
  console.log("opening new tab");
  window.open("https://www.google.com");
}

function navigateGoogle() {
  console.log("navigating");
  window.location = "https://www.google.com";
}

dialogThenTabButton.onclick = () => {
  fileInput.click();
  openGoogleTab();
}

tabThenDialogButton.onclick = () => {
  openGoogleTab();
  fileInput.click();
};

delayedDialogButton.onclick = () => {
  setTimeout(() => {
    fileInput.click();
  },
    2000);
}

delayedTabButton.onclick = () => {
  setTimeout(() => {
    openGoogleTab();
  },
    2000);
}

delayedNavigateButton.onclick = () => {
  setTimeout(() => {
    navigateGoogle();
  },
    2000);
}

popupButton.onclick = () => {
  window.open("popup.html", "", "popup, width = 10, height = 10")
}
