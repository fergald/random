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
    const startMs = Date.now();
    const output = await detector.detect(input);
    const endMs = Date.now();
    const durationMs = endMs - startMs;
    const durationPerMs = durationMs / input.length * 100;
    console.log(output);
    response.textContent = `${output.detectedLanguage}: ${Math.floor(output.confidence * 100)}%.
     ${input.length} characters. Took ${durationMs}ms, ${durationPerMs}ms per 100 characters`;
  } finally {
    able(goButton, true);
  }
};

let hamletText;
hamletButton.onclick = async () => {
  if (!hamletText) {
    hamletText = await fetch("hamlet.txt").then(r => r.text());
  }
  promptArea.value = hamletText.substr(0, charsInput.value);
}
