function setup() {
  const x = new MessageChannel();
  let channel = new WeakRef(new MessageChannel());
  let port1 = new WeakRef(channel.deref().port1);
  let port2 = new WeakRef(channel.deref().port2);

  // Send 1 message.
  channel.deref().port2.onmessage = (e) => {console.log(`receieved message: ${e.data}`)};
  port1.deref().postMessage("asdf");

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
  const sendPort1Cross = document.getElementById("sendPort1Cross");
  const sendPort1Same = document.getElementById("sendPort1Same");
  sendPort1Cross.onclick = () => {
    sendPort1Cross.setAttribute("disabled", "");
    sendPort1Same.setAttribute("disabled", "");
    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    iframe.src = "https://www.example.com/";
    iframe.contentWindow.postMessage(port1.deref(), "*", [port1.deref()]);
    const deleteIframe = document.getElementById("deleteIframe");
    deleteIframe.removeAttribute("disabled");
    deleteIframe.onclick = () => {
      document.body.removeChild(iframe);
      deleteIframe.setAttribute("disabled", "");
    };
  };

  let messageHolder;

  sendPort1Same.onclick = () => {
    sendPort1Cross.setAttribute("disabled", "");
    sendPort1Same.setAttribute("disabled", "");
    const iframe = document.createElement("iframe");
    document.body.appendChild(iframe);
    iframe.src = "about:blank";
    iframe.contentWindow.onmessage = message => {
      console.log("message received");
      messageHolder = message;
    };
    iframe.contentWindow.postMessage(port1.deref(), "*", [port1.deref()]);
    const dropReference = document.getElementById("dropReference");
    dropReference.removeAttribute("disabled");
    dropReference.onclick = () => {
      messageHolder = null;
      dropReference.setAttribute("disabled", "");
    };
  };
}

setup();
