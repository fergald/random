async function copyDirectoryToPrivateStorage(sourceHandle, targetHandle, result = { count: 0, errors: [] }) {
  for await (const [name, handle] of sourceHandle.entries()) {
    console.log(name);
    try {
      if (handle.kind === "file") {
        // if (!isAllowedFile(name))
        // {
        //     continue;
        // }
        // SAF read (may fail on Android)
        // Chromium Recent BUG on Android? for handle.getFile() silent fails.
        // GrapheneOS
        // No longer working on Microsoft Edge and Vadadium. Why?
        // Same issue happens for snaeplayer
        // https://github.com/minht11/local-music-pwa/issues/76
        const file = await handle.getFile();
        console.log(file);
        let writable = null;
        try {
          const targetFileHandle = await targetHandle.getFileHandle(name, { create: true });
          writable = await targetFileHandle.createWritable();
          await writable.write(file);
          ++result.count;
        } finally {
          if (writable) await writable.close();
        }

      } else if (handle.kind === "directory") {
        let newDirHandle;
        try {
          newDirHandle = await targetHandle.getDirectoryHandle(name, { create: true });
        } catch (err) {
          result.errors.push(`Failed to create directory '${name}': ${err.message}`);
          continue;
        }

        await copyDirectoryToPrivateStorage(handle, newDirHandle, result);
      }

    } catch (err) {
      result.errors.push(`Failed to copy '${name}': ${err.message}`);
    }

    // Yield to avoid UI freeze
    await new Promise(requestAnimationFrame);
  }

  return result;
}

async function run() {
  const sh = await window.showDirectoryPicker()
  const th = await window.showDirectoryPicker();
  copyDirectoryToPrivateStorage(sh, th);
}
