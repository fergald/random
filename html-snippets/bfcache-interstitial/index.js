const kShowText = "show interstitial";
const kDismissText = "interstitial is showing. Dismiss it";

goToInitialState();

function log(message) {
  console.log(message);
  window.logPre.textContent += `${message}\n`;
}

function goToInitialState() {
  log("goToInitialState");
  window.goButton.textContent = kShowText;
  window.goButton.onclick = onShowInterstitialClicked;
  document.title = "the original page";
}

function onShowInterstitialClicked() {
  log("OnShowInterstitialClicked");
  const newUrl = new URL(window.location.toString());
  newUrl.hash = "interstitial";
  window.history.pushState({}, null, newUrl.toString())
  window.goButton.textContent = kDismissText;
  window.goButton.onclick = onDismissInterstitialClicked;
  document.title = "the interstitial";
}

function onDismissInterstitialClicked() {
  log("onDismissInterstitialClicked");
  window.history.back();
  window.location = "https://www.google.com";
}

window.onpageshow = (event) => {
  log(`pageshow: persisted: ${event.persisted}`);
  if (window.goButton.textContent == kDismissText) {
    window.history.back();
  }
  goToInitialState();
}
