window.onload = () => {
  const synth = window.speechSynthesis;
  document.getElementById("speakButton").onclick = () => {
    synth.speak(new SpeechSynthesisUtterance("hello"));
  };

  const frame1 = document.getElementById("frame1");
  console.log(frame1.contentWindow.synth1);
  const synth1 = frame1.contentWindow.synth1;
  document.getElementById("speakButton1").onclick = () => {
    console.log(synth1);
    synth1.speak(new SpeechSynthesisUtterance("hello"));
  };

  document.getElementById("removeButton").onclick = () => {
    frame1.remove();
  };
};
