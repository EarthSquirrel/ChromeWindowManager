let button = document.getElementById("openWindow");

button.onclick = function() {
  chrome.tabs.create({url: 'window.html'});
}

let btnClear = document.getElementById("clearStorage");
btnClear.onclick = function() {
  chrome.storage.local.clear();
}
