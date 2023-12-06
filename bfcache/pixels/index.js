const RED = "rgb(255, 0, 0)"

function chooseColour(e) {
  console.log("persisted", e.persisted);
  if (!e.persisted) {
    return "blue";
  }
  console.log("spinning for a while");
  const now = Date.now();
  while (Date.now() - now < 5000) {

  }
  console.log("setting colour");
  if (getComputedStyle(document.body).backgroundColor == RED) {
    return "blue";
  } else {
    return "red";
  }

}
window.onpageshow = (e) => {
  let colour = chooseColour(e);
  document.body.style = `background-color: ${colour}`;
}
