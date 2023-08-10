function setup() {
  let channel = new WeakRef(new MessageChannel());
  let port1 = new WeakRef(channel.deref().port1);
  let port2 = new WeakRef(channel.deref().port2);
  //channel.deref().port1.close();
  //channel.deref().port2.close();

  const logFunction = () => {
    document.getElementById("content").textContent = `port1: ${port1.deref()} port2: ${port2.deref()} channel: ${channel ? channel.deref() : "null"}`;
  };

  document.getElementById("logButton").onclick = logFunction;
  document.getElementById("clearButton").onclick = () => {
    console.log("clearing");
    channel = null;
    logFunction();
  };
  document.getElementById("closePort1").onclick = () => { port1.deref().close() };
  document.getElementById("closePort2").onclick = () => { port2.deref().close() };
  const sendPort1 = document.getElementById("sendPort1");
  sendPort1.onclick = () => {
    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    iframe.src = "https://www.example.com/";
    iframe.contentWindow.postMessage(port1.deref(), "*", [port1.deref()]);
    sendPort1.textContent = "delete iframe";
    sendPort1.onclick = () => {
      document.body.removeChild(iframe);
    };
  };
}

setup();
