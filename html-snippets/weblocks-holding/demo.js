const params = new URLSearchParams(window.location.search);
const isPage2 = params.has('page2');
const lockName = 'same-tab-race-lock';

if (!isPage2) {
    // --- PAGE 1 LOGIC ---
    document.getElementById('title').innerText = "Page 1: Holding Lock";

    // Hold's the promise's `resolve`. Calling this will release the lock.
    let resolve;
    const p = new Promise(r => { resolve = r});

    navigator.locks.request(lockName, async (lock) => {
        document.getElementById('status').innerText = "Lock acquired. Click the button to navigate.";
        document.getElementById('nav-btn').style.display = "block";

        return p;
    });

    // The TRAP: When we leave, we block the thread.
    // This prevents the browser from fully terminating the context
    // before Page 2 starts requesting the lock.
    window.addEventListener('pagehide', () => {
        const start = Date.now();
        while (Date.now() - start < 1500) { /* Sync Block 1.5s */ }
        resolve();
    });

    function navigate() {
        window.location.search = "?page2=true";
    }

} else {
    // --- PAGE 2 LOGIC ---
    document.getElementById('title').innerText = "Page 2: Attempting Lock";

    // Try to get the lock immediately on load
    navigator.locks.request(lockName, { ifAvailable: true }, (lock) => {
        if (lock === null) {
            document.getElementById('status').innerText = "FAILURE: Lock still held by Page 1 (Race Condition!)";
            document.getElementById('status').style.color = "red";
        } else {
            document.getElementById('status').innerText = "SUCCESS: Lock acquired (No race detected)";
            document.getElementById('status').style.color = "green";
        }
    });
}
