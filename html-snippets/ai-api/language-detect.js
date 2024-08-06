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
  if (!window.translation) {
    setStatus("No window.translation");
    return;
  }

  const can = await translation.canDetect();
  setStatus(`canDetect returned: ${can}`);

  able(goButton, can != "no");
  able(hamletButton, can != "no");
};

init();

function el(name, textContent) {
  const el = document.createElement(name);
  el.textContent = textContent;
  return el;
}

async function detect(input) {
  const detector = await translation.createDetector();
  input = input.trim();
  console.log(`Input: ${input}`);
  const startMs = Date.now();
  const output = await detector.detect(input, false);
  const endMs = Date.now();
  const durationMs = endMs - startMs;
  const charsPerMs = input.length / durationMs;
  console.log(output);
  response.innerHTML = "";
  response.append(el("div"), `${input.length} characters. Took ${durationMs}ms, ${charsPerMs} characters per ms`);
  output.sort((a, b) => b.confidence - a.confidence);
  for (const result of output) {
    const d = el("div", `${result.detectedLanguage}: ${Math.floor(result.confidence * 100)}%.`);
    if (result.confidence < .01) {
      d.style = "color: grey;";
    }
    response.append(d);
  }
}

goButton.onclick = async () => {
  able(goButton, false);
  try {
    detect(promptArea.value);
  } finally {
    able(goButton, true);
  }
};

let hamletText;
async function getHamlet(needChars) {
  if (!hamletText) {
    hamletText = await fetch("hamlet.txt").then(r => r.text());
  }
  let hamletSample = "";
  while (needChars) {
    hamletSample += hamletText.substr(0, needChars);
    needChars = charsInput.value - hamletSample.length;
  }
  return hamletSample;
}

hamletButton.onclick = async () => {
  able(hamletButton, false);
  try {
    detect(await getHamlet(charsInput.value));
  } finally {
    able(hamletButton, true);
  }
}
