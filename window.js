// https://www.codeproject.com/Questions/5253015/How-to-get-all-tabs-details-from-current-browser-i

function processWindow(win, i) {
  let name = win.name;
  let tabs = [];
  console.log('processing : ' + win.tabs.length);
  for (let j=0; j<win.tabs.length; j++) {
    let t = win.tabs[j];
    tabs.push(t);
  }

  // create document option
  let div = document.createElement("DIV");
  div.id = "window " + i;
  let h2 = document.createElement('H2');
  h2.innerText = 'Window: ' + win.name;
  div.appendChild(h2);
  
  //var renameForm = document.createElement("FORM");
  let tabsH3 = document.createElement('H3');
  tabsH3.innerText = "Tabs";
  div.appendChild(tabsH3);
  
  //make list of all tabs
  let ul = document.createElement('UL');
  for (let t=0; t<tabs.length; t++) {
    let tab = tabs[t];
    let li = document.createElement('LI');
    let a = document.createElement('A');
    let linkText = document.createTextNode(tab.title);
    a.appendChild(linkText);
    a.title = tab.title;
    a.href = tab.url;
    li.appendChild(a);
    ul.appendChild(li);
  }
  div.appendChild(ul);


  return div;
}

var wins = [];
window.onload = function() {
  
  chrome.windows.getAll({"populate": true}, function (windows) {
    let windowDiv = document.getElementById("windowInfo");
    console.log('windows.length: ' + windows.length);
    for (let i=0; i < windows.length; i++) {
      let win = windows[i];
      wins.push(win);
      windowDiv.appendChild(processWindow(win, i));
    }
  });
}
