// Adds an iframe and optionally removes it again before calling it's queryLocks
// function.
function addIframe(remove) {
  const iframe = document.createElement("iframe");
  iframe.src = "iframe.html";
  document.body.appendChild(iframe);
  iframe.onload = () => {
    const queryLocks = iframe.contentWindow.queryLocks;
    if (remove) {
      console.log("removing iframe");
      document.body.removeChild(iframe);
    }
    console.log("calling queryLocks()");
    queryLocks();
  }
}
