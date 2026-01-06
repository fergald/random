const tap = document.getElementById("tap");
const tap2 = document.getElementById("tap2");
const button = document.getElementById("button");
const logElem = document.getElementById("log");

function log(message) {
  console.log(message);
  const messageElem = document.createElement('pre');
  messageElem.textContent = message;
  logElem.appendChild(messageElem);
}
tap.onclick = e =>{
  log("single on 1");
};

tap2.ondblclick = e =>{
  log("double");
};

tap2.onclick = e =>{
  log("single on 2");
};

button.onclick = e => {
  log("single on button");
};
