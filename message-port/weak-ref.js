let channel = new WeakRef(new MessageChannel());
setInterval(() => {
  console.log(channel.deref());
  document.body.textContent = channel.deref();
}, 1000);
