window.addEventListener('pagehide', async () => {
  console.log('pagehide', new Date());
  const [firstVisit, serviceWorkerRunning] = await (async function () {
      console.log('request registration', new Date());
      const serviceWorker = await
          navigator.serviceWorker.getRegistration('/')

      console.log('got registration', new Date());
      return [!serviceWorker?.active, !!serviceWorker];
  })();
});

