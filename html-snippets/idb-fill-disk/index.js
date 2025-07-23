let isRunning = false;

function stop() {
    isRunning = false;
}

/**
 * IndexedDB Continuous Write Test
 *
 * This script opens an IndexedDB database and continuously writes 100KB blocks
 * to an object store, using a new transaction with an explicit commit for each write.
 */
function useAllSpace() {
  isRunning = true;
  // --- Configuration ---
  const DB_NAME = 'writeTestDB';
  const DB_VERSION = 1;
  const STORE_NAME = 'dataStore';
  const BLOCK_SIZE = 100 * 1024; // 100 KB

  // A reusable 100KB data block
  const dataBlock = new Blob([new Uint8Array(BLOCK_SIZE)]);
  let db;
  let writeCount = 0;

  console.log(`🚀 Starting IndexedDB write test...`);
  console.log(`Database: ${DB_NAME}, Store: ${STORE_NAME}, Block Size: ${BLOCK_SIZE} bytes`);

  // --- 1. Open Database ---
  const request = indexedDB.open(DB_NAME, DB_VERSION);

  request.onerror = (event) => {
    console.error("Database error:", event.target.error);
  };

  request.onblocked = () => {
    console.warn("Database open request is blocked. Please close other tabs connected to this database.");
  };

  // --- 2. Create Object Store (if needed) ---
  request.onupgradeneeded = (event) => {
    console.log("Database upgrade needed. Creating object store...");
    const dbInstance = event.target.result;
    if (!dbInstance.objectStoreNames.contains(STORE_NAME)) {
      dbInstance.createObjectStore(STORE_NAME, {
        autoIncrement: true
      });
      console.log(`Object store "${STORE_NAME}" created successfully.`);
    }
  };

  // --- 3. Start Writing on Success ---
  request.onsuccess = (event) => {
    db = event.target.result;
    console.log(`✅ Database "${DB_NAME}" opened successfully. Starting writes...`);
    // Kick off the continuous write loop
    performWrite();
  };

  // --- 4. The Write Function ---
  function performWrite() {
    if (!isRunning) {
      console.log("Stopping at user request");
      return;
    }

    if (!db) {
      console.error("Database connection is not available.");
      return;
    }

    // Create a new transaction for every single write operation
    const transaction = db.transaction(STORE_NAME, "readwrite");
    const store = transaction.objectStore(STORE_NAME);
    const putRequest = store.put(dataBlock);

    transaction.onerror = (event) => {
      // Errors on the transaction will be caught here
      console.error("Transaction Error:", event.target.error);
    };

    putRequest.onerror = (event) => {
      // Errors on the put request itself will be caught here
      console.error("Put Request Error:", event.target.error);
    };

    putRequest.onsuccess = () => {
      writeCount++;
      // Log progress without spamming the console too much
      if (writeCount % 100 === 0) {
        console.log(`Write #${writeCount} successful.`);
      }
      setTimeout(performWrite, 0);
    };

    // Explicitly commit the transaction (non-standard, but supported in Chrome)
    try {
      transaction.commit();
    } catch (e) {
      // This will fail in browsers that don't support explicit commit
      console.warn("transaction.commit() is not supported or failed.", e);
    }
  }

  console.log("To stop the script, reload the page or close this tab.");
  console.log("To clean up the database, run: indexedDB.deleteDatabase('writeTestDB')");
}

document.addEventListener('DOMContentLoaded', () => {
  const button = document.getElementById('goButton');
  button.addEventListener('click', () => {
    useAllSpace();
  });
  const stopBtton = document.getElementById('stopButton');
    stopButton.addEventListener('click', () => {
    stop();
  });
});
