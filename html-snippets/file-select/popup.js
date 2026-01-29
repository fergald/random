function navigateGoogle() {
  console.log("navigating");
  window.opener.location = "https://www.google.com";
}

navigateParentThenDialogButton.onclick = () => {
  navigateGoogle();
  fileInput.click();
}
