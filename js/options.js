let btnClear = document.getElementById("clearStorage");
let storageCleared = document.getElementById("storageCleared");
btnClear.onclick = function() {
  chrome.storage.local.clear();
  storageCleared.innerText = "storage.local was cleared";
}

