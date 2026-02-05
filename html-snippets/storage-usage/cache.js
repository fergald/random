async function cacheLargeBlob() {
  const cacheName = 'large-data-cache';
  const resourceUrl = '/my-large-blob';

  // 1. Create a 100MB Blob (using a Uint8Array of zeros)
  const sizeInBytes = 100 * 1024 * 1024; // 100MB
  const buffer = new Uint8Array(sizeInBytes);
  const blob = new Blob([buffer], { type: 'application/octet-stream' });

  try {
    // 2. Open the cache
    const cache = await caches.open(cacheName);

    // 3. Create a Response object for the Blob
    // We set the Content-Length header so the browser knows the size
    const response = new Response(blob, {
      status: 200,
      headers: {
        'Content-Type': 'application/octet-stream',
        'Content-Length': blob.size.toString()
      }
    });

    // 4. Put it in the cache
    await cache.put(resourceUrl, response);

    console.log('Successfully cached 100MB blob!');
  } catch (error) {
    console.error('Caching failed:', error);
  }
}

cacheLargeBlob();
