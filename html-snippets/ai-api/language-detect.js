function able(button, enabled) {
  if (enabled) {
    button.removeAttribute("disabled")

  } else {
    button.setAttribute("disabled", true);
  }
}

function setStatus(status) {
  return document.getElementById("status").textContent = status;
}

async function init() {
  if (!window.ai) {
    setStatus("No window.ai");
    return;
  }

  const can = await translation.canDetect();
  setStatus(`canDetect returned: ${can}`);

  able(goButton, can != "no");
};

init();

goButton.onclick = async () => {
  able(goButton, false);
  try {
    const detector = await translation.createDetector();
    let input = promptArea.value;
    input = input.trim();
    console.log(`Input: ${input}`);
    const output = await detector.detect(input);
    console.log(output);
    response.textContent = `${output.detectedLanguage}: ${Math.floor(output.confidence * 100)}%`;
  } finally {
    able(goButton, true);
  }
};
