let button = document.getElementById("openWindow");

button.onclick = function() {
  chrome.tabs.create({url: 'window.html'});
}
