async function forceGc() {
  const ref = new WeakRef(new Set());
  const gcStart = Date.now();
  for (gcCount = 0; true; gcCount++) {
    let a = [];
    for (let i = 0; i < 1000; i++) {
      let s = "";
      for (let j = 0; j < 1000; j++) {
        s += `${j}`;
      }
      a.push(s);
    }
    a = [];
    if (!ref.deref()) {
      console.log("gc", gcCount, Date.now() - gcStart);
      return;
    }
    await new Promise((r) => setTimeout(r, 0));
  }
}
