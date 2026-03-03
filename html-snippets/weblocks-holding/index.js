async function query() {
  const result = await window.navigator.locks.query();
  logPre.textContent += `Log ${new Date()}\n`;
  for (const l of result.held) {
    logPre.textContent += `held ${l.name}\n`;
  }
  for (const l of result.pending) {
    logPre.textContent += `pending ${l.name}\n`;
  }
}

query();

navigator.locks.request("l", async () => {
  await new Promise(r => {

  });
});

query();
