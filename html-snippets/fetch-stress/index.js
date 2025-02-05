const fetchUrlBase = "fetch";
const limit = 100;

function addInstructions(startUrl) {
  const div = document.createElement("div");
  div.innerHTML = `Simple stress test of keep-alive fetches.
  <p>Run a simple webserver, e.g
  <pre>python3 -m http.server |& tee /tmp/log</pre>
  <p>Then go to <a href="${startUrl}">${startUrl}</a> to start it.
  You probably need to paste that URL and hit enter.
  <p>After running, check the logs to see if you received all of the fetches.
  <p>This will refuse to run on github because you don't have access to the logs
  and you'll just be pointlessly slamming their servers.
  `;
  document.body.appendChild(div);


}
function navigate() {
  const url = new URL(document.location.toString());
  const previousI = url.hash.substring(1);
  const pathParts = url.pathname.split("/");
  const last = pathParts.pop();
  const newLast = (last == "1.html" ? "2" : "1") + ".html";
  pathParts.push(newLast);
  url.pathname = pathParts.join("/");
  url.hash = "0";
  addInstructions(url.toString());

  if (previousI == "") {
    return;
  }
  if (url.origin.indexOf("github") != -1) {
    console.error("Refusing to run on github.");
  }
  const i = parseFloat(previousI) + 1;
  if (i > limit) {
    return;
  }

  const fetchUrl = `${fetchUrlBase}?${i}`;
  console.log("fetchUrl", fetchUrl);

  window.onpagehide = () => {
    for (let i = 1; i <= 8; i++) {
      fetch(`${fetchUrl}-${i}`, { keepalive: true });
    }
  }

  url.hash = i;
  const navigateUrl = url.toString();
  console.log("navigateUrl", navigateUrl);
  const w = window;
  setTimeout(() => {
    // window.location = navigateUrl
    w.open(navigateUrl);
    w.close();
  }, 0);
}

window.onload = navigate;
