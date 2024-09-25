localStorage.setItem("key", "value");
window.onload = () => {
  const synth = window.speechSynthesis;
  const ls = window.localStorage;

  document.getElementById("speakButton").onclick = () => {
    synth.speak(new SpeechSynthesisUtterance("hello"));
    console.log("key=", ls.getItem("key"));
  };

  const frame1 = document.getElementById("frame1");
  console.log(frame1.contentWindow.synth1);
  const synth1 = frame1.contentWindow.synth1;
  const ls1 = frame1.contentWindow.localStorage;
  document.getElementById("speakButton1").onclick = () => {
    console.log(synth1);
    synth1.speak(new SpeechSynthesisUtterance("hello"));
    console.log("key=", ls.getItem("key"));
  };

  document.getElementById("removeButton").onclick = () => {
    frame1.remove();
  };
};
