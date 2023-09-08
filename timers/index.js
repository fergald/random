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
