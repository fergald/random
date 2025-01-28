const modelFileNameRemote = 'https://storage.googleapis.com/jmstore/WebAIDemos/models/Gemma2/gemma2-2b-it-gpu-int8.bin';

async function fetchAndCacheFile(url) {
  console.log('Fetch and caching: ', url);
  const MODEL_CACHE = await caches.open('models');
  response = await MODEL_CACHE.match(url);
  console.log("cached response", response);
  if (response) {
  console.log("using cached response");
    return response;
  }
  console.log("adding to cache");
  await MODEL_CACHE.add(url);
  console.log("now using that");
  return await MODEL_CACHE.match(url);
3};

async function initLLM() {
  let data = await fetchAndCacheFile(modelFileNameRemote);
  console.log("data", data);
}

initLLM();
