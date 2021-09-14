// https://www.codeproject.com/Questions/5253015/How-to-get-all-tabs-details-from-current-browser-i

function processWindow(win, i) {
  var name = win.name;
  var tabs = [];
  console.log('processing : ' + win.tabs.length);
  for (var j=0; j<win.tabs.length; j++) {
    var t = win.tabs[j];
    tabs.push(t);
  }

  // create document option
  var div = document.createElement("DIV");
  div.id = "window " + i;
  var h1 = document.createElement('H1');
  h1.innerText = 'Window: ' + win.name;
  div.appendChild(h1);
  //var renameForm = document.createElement("FORM");

  return div;
}

window.onload = function() {
  let btnName = document.getElementById("btnName");
  console.log('btn clicked');
  let nameDiv = document.getElementById("showWindows");
  let windowNameP = document.createElement("P");
  console.log(window.name);
  windowNameP.innerText = "window name: " + window.name;
  nameDiv.appendChild(windowNameP);
  
  chrome.windows.getAll({"populate": true}, function (windows) {
    var windowDiv = document.getElementById("windowInfo");
    console.log('windows.length: ' + windows.length);
    for (var i=0; i < windows.length; i++) {
      let win = windows[i];
      windowDiv.appendChild(processWindow(win, i));
    }
  });
}
