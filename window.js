// https://www.codeproject.com/Questions/5253015/How-to-get-all-tabs-details-from-current-browser-i

function listClosedWindow(obj) {
  let div = document.createElement('div');
  let h2 = document.createElement('h2');
  h2.innerText = "Window name: " + obj.name;
  div.appendChild(h2);
  
  let ul = buildTabsUl(obj.winObject.tabs);
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
    console.log(win);
    //Can change 7 to 2 for longer results.
    let r = (Math.random() + 1).toString(36).substring(2);
    let data = {};
    data[r] = {
      name: newName.value, 
      type: 'closedWindow',  
      winObject: win
    };
    chrome.storage.local.set(data, function () {
      console.log('added window:' + r);
    });
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
  h2.innerText = 'Window name: ' + win.name;
  div.appendChild(h2);
  
  let nameDiv = document.createElement('div');
  let label = document.createElement("Label");
  let labelId = 'changeName' + i;
  label.setAttribute("for",labelId);
  label.innerHTML = "Change window name: ";

  var inp = document.createElement("input"); //input element, text
  inp.setAttribute('type',"text");
  inp.setAttribute('name',"windowName");
  inp.setAttribute('placeholder', win.name);
  inp.setAttribute('id', labelId)
  
  var btnName = document.createElement('button');
  var btnNameId = 'btnNameChange' + i;
  btnName.id = btnNameId;
  btnName.innerText = "Update Name";
  
  nameDiv.appendChild(label);
  nameDiv.appendChild(inp);
  nameDiv.appendChild(btnName);

  // add action listener to button
  btnName.addEventListener('click', async () => {
    if (inp.value != "") {
      win.name = inp.value;
      inp.value = "";
      h2.innerText = "Window name: " + win.name;
      inp.setAttribute('placeholder', win.name);
      console.log('type before update: ' + typeof(win));
      updateName(win.id, win.name);
      console.log('Back in EventListener');
      console.log(win);
    } else {
      let warning = document.createElement('p');
      warning.innerText = "**WARNING: new name must not be an empty string.**"
      warning.className = "warning";
      nameDiv.appendChild(warning);
    }
  });

  //div.appendChild(nameDiv);

  

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
