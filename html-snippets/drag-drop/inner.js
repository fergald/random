document.addEventListener('drop', async (e) => {
  e.preventDefault();
  for (const item of e.dataTransfer.items) {
    const handle = await item.getAsFileSystemHandle();
    if (handle && handle.kind === 'file') {
      const file = await handle.getFile();
	    const contents = await file.text();
	    console.log(contents);
    }
  }
});

document.addEventListener('dragover', (e) => e.preventDefault());
