function log(level, message, colour) {
  let e = document.createElement("pre");
  e.style = `color: ${colour}`;
  e.textContent = `${level}: ${message}`;
  document.getElementById("logElement").appendChild(e);
}

function error(message) {
  log("error", message, "red");
}

function info(message) {
  log("info", message, "black");
}

const kStore = "store";

const DBOpenRequest = window.indexedDB.open(kStore, 2);
DBOpenRequest.onerror = (event) => {
  error(`Error loading database.${event.error}`);
};


DBOpenRequest.onupgradeneeded = () => {
  DBOpenRequest.result.createObjectStore(kStore);
};

function createTransaction(db) {
  const transaction = db.transaction([kStore], 'readwrite');
  return transaction.objectStore(kStore);

}

function getAndLog(store, key) {
  const r = store.get(key);
  r.onsuccess = (e) => {
    info(`value of ${key} is ${r.result}`);
  }

}
DBOpenRequest.onsuccess = async (event) => {
  info("Database opened");
  const db = DBOpenRequest.result;
  const t_store1 = createTransaction(db);
  const t_store2 = createTransaction(db);
  const kKey = "key";
  let i = 1;
  const r1 = t_store1.put(i, kKey);
  const r2 = t_store2.put(-1, kKey);
  const p1 = new Promise((r) => {
    const iterate = () => {
      info("t1 success");
      getAndLog(t_store1, kKey);
      if (i == 100) {
        r();
        return;
      }
      i++;
      const r1_next = t_store1.put(i, kKey);
      r1_next.onsuccess = iterate;
    }
    r1.onsuccess = iterate;
  });
  const p2 = new Promise((r) => {
    r2.onsuccess = () => {
      info("t2 success");
      getAndLog(t_store2, kKey);
      r();
    };
  });
  await p1;
  await p2;
  const t_store3 = createTransaction(db);
  getAndLog(t_store3, kKey);
}
