async function run() {
  const sh = await showDirectoryPicker();
  for await (const [name, handle] of sh.entries()) {
    console.log("name", name);
    console.log("handle", handle);
    logDiv.textContent += `Trying to get ${name}\n`;
    const file = await handle.getFile();
    console.log("file", file);
    logDiv.textContent += `Got ${name}\n`;
  }
}
