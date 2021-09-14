// https://www.codeproject.com/Questions/5253015/How-to-get-all-tabs-details-from-current-browser-i
window.onload = function() {
  let btnName = document.getElementById("btnName");
  console.log('btn clicked');
  let nameDiv = document.getElementById("showWindows");
  let windowNameP = document.createElement("P");
  console.log(window.name);
  windowNameP.innerText = "window name: " + window.name;
  nameDiv.appendChild(windowNameP);
  var tabs = [];
  var allWin = chrome.windows.getAll({"populate": true}, function (windows) {
    console.log(windows.length);
    for (var i=0; i < windows.length; i++) {
      let win = windows[i];
      console.log(i + ' : ' + win.tabs.length);
      for (var j=0; j<win.tabs.length; j++) {
        var t = win.tabs[j];
        //if (isValidTab(t)) {
          tabs.push(t);
        //}
      }
    }
    //sendResponse({ tabs: tabs });
  });
  for (let tab of tabs) {
    console.log(tab);
  }
}
