function handleBlobCreation(file) {
  const size = 1 * 1024 * 1024 * 1024; // 1GB
  const arrayBuffer = new Uint8Array(size);
  file = new Blob([arrayBuffer], { type: "video/mp4" });

  addBlobUrl(file);
}

function addBlobUrl(blob) {
  const newBlobDiv = document.createElement("div");
  blobDiv.appendChild(newBlobDiv);
  // Create a Blob URL
  let blobUrl = URL.createObjectURL(blob)
  console.log("Blob URL created:", blobUrl)

  const fetchButton = document.createElement("button");
  newBlobDiv.appendChild(fetchButton);
  fetchButton.textContent = "Fetch";
  fetchButton.onclick = () => {
    console.log("Attempting to fetch the Blob...", blobUrl)
    fetch(blobUrl)
      .then(async response => {
        if (response.ok) {
          console.log("Blob fetched successfully:", await response.blob());
        } else {
          console.log("Failed to fetch Blob:", response.status);
        }
      })
      .catch((error) => {
        console.error("Error fetching Blob:", error)
      })
  };
  const blobSpan = document.createElement("span");
  newBlobDiv.appendChild(blobSpan);
  blobSpan.textContent = `File selected: ${blob.name || "Default Blob"}, size: ${blob.size / (1024 * 1024)} MB`;
}

document.getElementById("zerosBlobButton").addEventListener("click", () => {
  handleBlobCreation();
})

function getFile(onFile) {
  const fileInput = document.createElement("input");
  document.body.appendChild(fileInput);
  fileInput.type = "file";
  fileInput.style = "display:none";
  fileInput.click()
  // Handle file selection
  fileInput.onchange = () => {
    document.body.removeChild(fileInput);
    const file = fileInput.files[0]
    if (file) {
      onFile(file);
    }
  };
}

document.getElementById("fileBlobButton").addEventListener("click", () => {
  console.log("Button clicked. Waiting for file selection...")
  getFile(addBlobUrl);
});

document.getElementById("convertFileBlobButton").addEventListener("click", () => {
  console.log("Button clicked. Waiting for file selection...")

  getFile(file => {
    const size = Math.min(1024*1024*1024, file.size);
    const arrayBuffer = new Uint8Array(size);
    // arrayBuffer.set(file.arrayBuffer);
    const ib = file.arrayBuffer
    console.log("copying", size);
    // For big blobs, this loop is slow. This structure makes the inner loop as
    // tight as possible, while still giving progress updates.
    for(let i=0;i < size;) {
      // xor each chunk with a random number so that blob compression doesn't work.
      const xor = Math.floor(Math.random()*256);
      const lim = Math.min(size, i+1000000);
      for (let j=i; j<lim; j++) {
        arrayBuffer[j] = ib[j] ^ xor;
      }
      i = lim;
      console.log(`${Math.round(i/size*100)}%`, i);
    }
    const blob = new Blob([arrayBuffer], { type: "video/mp4" });

    addBlobUrl(blob);
  });
});
