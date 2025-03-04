let blob = new Blob(["Blob's data"], { "type" : "text/plain" });
var url = URL.createObjectURL(blob);
blob = null;
window.parent.postMessage("ok", "*");
