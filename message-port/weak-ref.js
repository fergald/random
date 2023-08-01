let channel = new WeakRef(new MessageChannel());
setInterval(() => {
  console.log(channel.deref());
}, 1000);
