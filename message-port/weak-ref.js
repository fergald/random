let channel = new WeakRef(new MessageChannel());
channel.deref().port1.close();
channel.deref().port2.close();
setInterval(() => {
  console.log(channel.deref());
  document.body.textContent = channel.deref();
}, 1000);
