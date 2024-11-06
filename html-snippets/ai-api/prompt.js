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

function llm() {
  return window.ai.assistant;
}

async function init() {
  if (!window.ai) {
    setStatus("No window.ai");
    return;
  }
  setStatus("Has window.ai");

  const cap = await llm().capabilities();
  setStatus(`capability: ${cap.available}`);
  if (cap.available == "no") {
    return;
  }

  able(goButton, cap.available != "no");
};

init();

goButton.onclick = async () => {
  able(goButton, false);
  try {
    const session = await llm().create();
    let input = promptArea.value;
    input = input.trim();
    console.log(`Input: ${input}`);
    const output = await session.promptStreaming(input);
    const reader = output.getReader();
    while (true) {
      const next = await reader.read();
      if (next.done) {
        break;
      }
      console.log(next.value);
      response.textContent = next.value;
    }
  } finally {
    able(goButton, true);
  }
};
