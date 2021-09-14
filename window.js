// https://www.codeproject.com/Questions/5253015/How-to-get-all-tabs-details-from-current-browser-i

function handleWindows(windows) {
  
}

window.onload = function() {
  let btnName = document.getElementById("btnName");
  console.log('btn clicked');
  let nameDiv = document.getElementById("showWindows");
  let windowNameP = document.createElement("P");
  console.log(window.name);
  windowNameP.innerText = "window name: " + window.name;
  nameDiv.appendChild(windowNameP);
  //console.log('len win tabs: ' + windowTabs.length);
  //var winTabs = getWindowTabs();
  var windowTabs = [];
  chrome.windows.getAll({"populate": true}, function (windows) {
    console.log('windows.length: ' + windows.length);
    for (var i=0; i < windows.length; i++) {
      let win = windows[i];
      console.log('window name: ' + win.name);
      var tabs = [];
      console.log(i + ' : ' + win.tabs.length);
      for (var j=0; j<win.tabs.length; j++) {
        var t = win.tabs[j];
        tabs.push(t);
        console.log(t.url);
      }
      windowTabs.push(tabs);
      console.log('for loog len: ' + windowTabs.length);
    }
    console.log('after for len: ' + windowTabs.length);
    return windowTabs;
  });
  console.log('meth length: ' + windowTabs.length);
  console.log('winTabs length: ' + windowTabs.length);
}
