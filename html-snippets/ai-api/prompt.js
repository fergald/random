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

  const can = await ai.canCreateTextSession();
  setStatus(`canCreateTextSession returned: ${can}`);

  able(goButton, can != "no");
};

init();

goButton.onclick = async () => {
  able(goButton, false);
  try {
    const session = await ai.createTextSession();
    let prompt = promptArea.textContent;
    prompt = prompt.trim();
    console.log(`Prompt: ${prompt}`);
    const output = await session.promptStreaming(promptArea.textContent);
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
