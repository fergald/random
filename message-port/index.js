if (location.hash == '') {
  // We are the main frame.
  window.addEventListener(
    "message",
    (event) => {
      console.log(event);
      event.data.port.postMessage("hello");
      console.log("posted hello");
    }
  );
  const iframe = document.createElement("iframe");
  iframe.src = "#sub";
  content.appendChild(iframe);
} else {
  // We are the subframe.
  const channel = new MessageChannel();
  channel.port2.close();
  channel.port2.onmessage = (e) => { console.log("message on port", e) };
  window.parent.postMessage({
    name: "port",
    port: channel.port1,
  }, "*", [channel.port1]);
}
