window.addEventListener("message", m => {
  console.log("message", m);
  let url = bf.contentWindow.url;
  console.log("url", url);

  removeButton.disabled = false;
  removeButton.onclick = () => {
    document.body.removeChild(bf);
    document.body.removeChild(button);
  };

  setInterval(() => {
    fetch(url).then(r => r.text()).then(t => {
      console.log(t);
      logPre.textContent += t + "\n";
    }).catch(() => logPre.textContent += "fail\n");
  }, 1000);
});
