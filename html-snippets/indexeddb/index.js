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
function openDb() {

  return new Promise((resolve, reject) => {
    const DBOpenRequest = window.indexedDB.open(kStore, 2);
    DBOpenRequest.onerror = (event) => {
      error(`Error loading database.${event.error}`);
      reject(event.error);
    };


    DBOpenRequest.onupgradeneeded = () => {
      DBOpenRequest.result.createObjectStore(kStore);
    };

    DBOpenRequest.onsuccess = event => {
      info("Database opened");
      resolve(DBOpenRequest.result);
    };
  });
}

function createTransaction(db) {
  const transaction = db.transaction([kStore], 'readwrite');
  return [transaction.objectStore(kStore), transaction];

}

function getAndLog(store, key) {
  const r = store.get(key);
  r.onsuccess = (e) => {
    info(`key ${key} result ${r.result}`);
    if (r.result) {
      info(`value of ${key} is ${r.result['v']}`);
    }
  }
}

const kKey = "key";
function key(i) {
  return `${kKey}_${i}`;
}

function dumpDB(store) {
  const c = store.openCursor();
  c.onsuccess = (event) => {
    const cursor = event.target.result;
    info(`cursor ${cursor}`);
    if (cursor) {
      info(`cursor value ${cursor.value['v']} ${cursor.key}`);
      cursor.continue();
    }
  };
  c.onerror = (event) => {
    error(`cursor: ${event.message}`);
  };
}

openDb().then(async (db) => {
  const [t_store1, txn1] = createTransaction(db);
  const [t_store2, txn2] = createTransaction(db);
  const r1 = t_store1.put({ v: 1 }, key(1));
  const r2 = t_store2.put({ v: -1 }, key(1));
  const p1 = new Promise((r) => {
    let i = 10;
    const iterate = () => {
      info(`t1 success ${key(i)}`);
      getAndLog(t_store1, key(i));
      if (i == 30) {
        r();
        setTimeout(() => dumpDB(t_store1),
          2 * 1000);
        return;
      }
      i++;
      const r1_next = t_store1.put({ v: i }, key(i));
      r1_next.onsuccess = iterate;
    }
    r1.onsuccess = iterate;
  });
  const p2 = new Promise((r) => {
    r2.onsuccess = () => {
      info("t2 success");
      getAndLog(t_store2, key(1));
      r();
    };
  });
  await p1;
  await p2;
  {
    const [t_store3, txn3] = createTransaction(db);
    getAndLog(t_store3, key(1));
  }
  const [t_store3, txn3] = createTransaction(db);
});
