const a = "https://storage.googleapis.com/jmstore/WebAIDemos/models/Gemma2/gemma2-2b-it-gpu-int8.bin"

async function fetchSerial() {
   return await fetch(a).then(r => r.blob());
}

async function fetchParallel() {
   return await fetchInChunks(a);
}

async function go(f) {
  const start = Date.now();
  const b = await f();
  const end = Date.now();
  console.log("b", b.size);
  const t = end - start;
  console.log("time", t);
  return t;
}

function makeUI(f, type) {
  const d = document.createElement("div");
  document.body.appendChild(d);
  const b = document.createElement("button");
  b.innerText = `Download ${type}`;
  d.appendChild(b);
  const p = document.createElement("pre");
  d.appendChild(p);
  b.onclick = async () => {
    const t = await go(f);
    p.innerText += `download ${type} took ${t/1000} seconds`;
  };
}

makeUI(fetchSerial, "serial");
makeUI(fetchParallel, "parallel");

// This code copied from
// https://developer.chrome.com/docs/ai/cache-models#bonus_download_a_large_file_in_chunks

async function fetchInChunks(
  url,
  chunkSize = 500 * 1024 * 1024,
  maxParallelRequests = 6,
  progressCallback = null,
  signal = null
) {
  // Helper function to get the size of the remote file using a HEAD request
  async function getFileSize(url, signal) {
    const response = await fetch(url, { method: 'HEAD', signal });
    if (!response.ok) {
      throw new Error('Failed to fetch the file size');
    }
    const contentLength = response.headers.get('content-length');
    if (!contentLength) {
      throw new Error('Content-Length header is missing');
    }
    return parseInt(contentLength, 10);
  }

  // Helper function to fetch a chunk of the file
  async function fetchChunk(url, start, end, signal) {
    const response = await fetch(url, {
      headers: { Range: `bytes=${start}-${end}` },
      signal,
    });
    if (!response.ok && response.status !== 206) {
      throw new Error('Failed to fetch chunk');
    }
    return await response.arrayBuffer();
  }

  // Helper function to download chunks with parallelism
  async function downloadChunks(
    url,
    fileSize,
    chunkSize,
    maxParallelRequests,
    progressCallback,
    signal
  ) {
    let chunks = [];
    let queue = [];
    let start = 0;
    let downloadedBytes = 0;

    // Function to process the queue
    async function processQueue() {
      while (start < fileSize) {
        if (queue.length < maxParallelRequests) {
          let end = Math.min(start + chunkSize - 1, fileSize - 1);
          let promise = fetchChunk(url, start, end, signal)
            .then((chunk) => {
              chunks.push({ start, chunk });
              downloadedBytes += chunk.byteLength;

              // Update progress if callback is provided
              if (progressCallback) {
                progressCallback(downloadedBytes, fileSize);
              }

              // Remove this promise from the queue when it resolves
              queue = queue.filter((p) => p !== promise);
            })
            .catch((err) => {
              throw err;
            });
          queue.push(promise);
          start += chunkSize;
        }
        // Wait for at least one promise to resolve before continuing
        if (queue.length >= maxParallelRequests) {
          await Promise.race(queue);
        }
      }

      // Wait for all remaining promises to resolve
      await Promise.all(queue);
    }

    await processQueue();

    return chunks.sort((a, b) => a.start - b.start).map((chunk) => chunk.chunk);
  }

  // Get the file size
  const fileSize = await getFileSize(url, signal);

  // Download the file in chunks
  const chunks = await downloadChunks(
    url,
    fileSize,
    chunkSize,
    maxParallelRequests,
    progressCallback,
    signal
  );

  // Stitch the chunks together
  const blob = new Blob(chunks);

  return blob;
}
