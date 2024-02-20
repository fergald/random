let { port1, port2 } = new MessageChannel();
const port1_weak = new WeakRef(port1);
port1.start();

let control = ["a string"];
const control_weak = new WeakRef(control);

function updateMessage() {
  document.getElementById("message").textContent = `port1_weak.deref() == ${port1_weak.deref()}\ncontrol_weak.deref() == ${control_weak.deref()}`;
}

function sendPort() {
  w = window.open("about:blank");
  w.postMessage("Transferring message port", "*", [port2]);
  port1 = null;
  control = null;
  setInterval(updateMessage, 50);
}
