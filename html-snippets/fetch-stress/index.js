const fetchUrlBase = "fetch";
const limit = 100;

function navigate() {
  const div = document.createElement("div");
  div.innerHTML = `Simple stress test of keep-alive fetches.
  Run a simple webserver, e.g
  <pre>python3 -m http.server |& tee /tmp/log</pre>
  Then go to <a href="1.html#0">1.html#0</a> to start it.
  You probably need to paste that URL and hit enter.
  `;
  document.body.appendChild(div);

  const url = new URL(document.location.toString());
  const previousI = url.hash.substring(1);
  if (previousI == "") {
    return;
  }
  const i = parseFloat(previousI) + 1;
  if (i >= limit) {
    return;
  }

  const fetchUrl = `${fetchUrlBase}?${i}`;
  console.log("fetchUrl", fetchUrl);

  window.onpagehide = () => {
    fetch(fetchUrl, { keepalive: true });
  }

  const pathParts = url.pathname.split("/");
  const last = pathParts.pop();
  const newLast = (last == "1.html" ? "2" : "1") + ".html";
  pathParts.push(newLast);
  url.pathname = pathParts.join("/");
  url.hash = i;
  const navigateUrl = url.toString();
  console.log("navigateUrl", navigateUrl);
  window.location = navigateUrl;
}

window.onload = navigate;
