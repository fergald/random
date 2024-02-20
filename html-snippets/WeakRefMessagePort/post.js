let { port1, port2 } = new MessageChannel();
const port1_weak = new WeakRef(port1);
port1.start();
port1 = null;

function updateMessage() {
  document.getElementById("message").textContent = `WeakRef.deref() == ${port1_weak.deref()}`;
}

function sendPort() {
  w = window.open("about:blank");
  w.postMessage("Transferring message port", "*", [port2]);
  setInterval(updateMessage, 50);
}
