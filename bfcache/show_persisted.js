let div = document.createElement("div");
let tSpan = document.createElement("span");
tSpan.textContent = "peristed: ";
div.append(tSpan)
let vSpan = document.createElement("span");
div.append(vSpan)
document.body.append(div);

window.addEventListener('pageshow', (event) => {
  vSpan.textContent = event.persisted;
});
