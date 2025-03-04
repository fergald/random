window.addEventListener("message", m => {
  console.log("message", m);
  let url = bf.contentWindow.url;
  console.log("url", url);
  const button = document.createElement("button");
  document.body.appendChild(button);
  button.textContent = "Remove iframe";
  button.onclick = () => {
    document.body.removeChild(bf);
    document.body.removeChild(button);
  };

  setInterval(() => {
    fetch(url).then(r => r.text()).then(console.log)
  }, 1000);
});
