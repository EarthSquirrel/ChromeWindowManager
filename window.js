// https://www.codeproject.com/Questions/5253015/How-to-get-all-tabs-details-from-current-browser-i

function listClosedWindow(obj) {
  let tabs = obj.winObject.tabs;
  let win = obj.winObject;
  let div = document.createElement('div');
  div.id = obj.key;
  let h2 = document.createElement('h2');
  h2.innerText = "Window: " + obj.name;
  div.appendChild(h2);
 
  let btnOpen = document.createElement('button');
  btnOpen.className = "giveMargin";
  btnOpen.innerText = "Open Window";
  btnOpen.addEventListener('click', async () => {
    openWindow(obj);  
  });
  div.appendChild(btnOpen);
  let btnRemove = document.createElement('button');
  btnRemove.className = "giveMargin";
  btnRemove.innerText = "Remove saved window";
  btnRemove.addEventListener('click', async () => {
    chrome.storage.local.remove(obj.key, function () {
      console.log('removed window ' + obj.name + ' from storage');
    });
    div.remove();
  });
  div.appendChild(btnRemove);
  // list all the tabs
  let ul = buildTabsUl(tabs);
  div.appendChild(ul);

  return div;
}


function updateSaveDiv(saveDiv, win){
  // remove all content in saveDiv
  while(saveDiv.firstChild) {
    saveDiv.removeChild(saveDiv.firstChild);
  }
  // update the class
  saveDiv.className = "savingWindow";
  var h4 = document.createElement('h4');
  h4.innerText = "Save Window";
  saveDiv.appendChild(h4);

  //name the window
  let nameLabel = document.createElement('label');
  nameLabel.innerText = "Name the window: ";
  let newName = document.createElement("input"); //input element, text
  newName.type = "text";

  let btnSave = document.createElement('button');
  btnSave.innerText = "Save Window";
 
  //create event listener
  btnSave.addEventListener('click', async () => {
    if (newName.value == "") {
      let warning = document.createElement('p');
      warning.innerText = "**WARNING: new name must not be an empty string.**"
      warning.className = "warning";
      saveDiv.appendChild(warning);
      return "";
    }
    
    console.log(win);
    //Can change 7 to 2 for longer results.
    let r = (Math.random() + 1).toString(36).substring(2);
    let data = {};
    data[r] = {
      key: r,
      name: newName.value, 
      type: 'closedWindow',  
      winObject: win
    };
    chrome.storage.local.set(data, function () {
      console.log('added window:' + r);
    });
    // close the window once saved
    chrome.windows.remove(win.id);
    while(saveDiv.firstChild) {
      saveDiv.removeChild(saveDiv.firstChild);
    }
    let p = document.createElement('p');
    p.className = "windowSaved";
    p.innerText = "Window Saved: " + newName.value;
    saveDiv.appendChild(p);

  });

  // add things to saveDiv
  saveDiv.appendChild(nameLabel);
  saveDiv.appendChild(newName);
  saveDiv.appendChild(document.createElement('br'));
  saveDiv.appendChild(btnSave);
  return saveDiv;

  
}

function buildTabsUl(tabs) {
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
  return ul;
}


function processWindow(win, i) {
  console.log(win);

  // create document option
  let div = document.createElement("DIV");
  div.id = "window " + i;
  div.className = "windowDiv";
  let h2 = document.createElement('H2');
  h2.innerText = 'Window: ' + (i+1);
  div.appendChild(h2);
  
  var saveDiv = document.createElement('div');
  var btnSave = document.createElement('button');
  btnSave.innerText = "Save Window";
  btnSave.addEventListener('click', async () => {
    saveDiv = updateSaveDiv(saveDiv, win);

  });
  
  saveDiv.appendChild(btnSave);
  div.appendChild(saveDiv);

  let tabsH3 = document.createElement('H3');
  tabsH3.innerText = "Tabs";
  div.appendChild(tabsH3);
  
  let ul = buildTabsUl(win.tabs);
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

  // load saved windows tabs
  let closedDiv = document.getElementById("closedWindows");
  chrome.storage.local.get(null, function(items) {
    let allKeys = Object.keys(items);
    console.log('allKeys ' + allKeys);
    if (allKeys.length == 0) {
      let noSaved = document.createElement('p');
      noSaved.innerText = "There are currently no saved windows";
      closedDiv.appendChild(noSaved);
    }
    for (let i=0; i<allKeys.length; i++) {
      console.log(allKeys[i]);
      chrome.storage.local.get(allKeys[i], function (obj) {
        let key = allKeys[i];
        let win = obj[key];
        console.log('keys: ' + Object.keys(win));
        console.log('getting: ' + key + ' of type: ' + win.type);
        if (win.type == "closedWindow") {
          let div = listClosedWindow(win);
          closedDiv.appendChild(div);
        }
      });
    }
  });

}
