const kShowText = "show interstitial";
const kDismissText = "interstitial is showing. Dismiss it";
const kInterstitial = "interstitial";

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
  newUrl.hash = kInterstitial;
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
  log(`pageshow: event.persisted: ${event.persisted}`);
  log(`window.goButton.textContent: ${window.goButton.textContent}`);
  const hash = window.location.hash;
  log(`window.location.hash: ${hash}`);

  // If we somehow get back to the page with the interstitial showing, remove
  // it.
  if (hash == kInterstitial) {
    log('going back after landing on interstitial');
    if (window.goButton.textContent != kDismissText) {
      log("Inconsistent state between hash an UI.");
    }
    window.history.back();
    goToInitialState();
  }
}

window.onhashchange = (event) => {
  log(`hashchange newURL: ${event.newURL}`);
  if (new URL(event.newURL).hash != kInterstitial) {
    goToInitialState();
  }
}
