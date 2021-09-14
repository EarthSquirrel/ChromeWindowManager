// https://www.codeproject.com/Questions/5253015/How-to-get-all-tabs-details-from-current-browser-i

function processWindow(win, i) {
  if (win.name == null) {
    win.name = "window " + (i+1);
  } 
  let tabs = [];
  console.log('processing : ' + win.tabs.length);
  for (let j=0; j<win.tabs.length; j++) {
    let t = win.tabs[j];
    tabs.push(t);
  }

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
  
  var btn = document.createElement('button');
  var btnId = 'btnNameChange' + i;
  btn.id = btnId;
  btn.innerText = "Update Name";
  
  nameDiv.appendChild(label);
  nameDiv.appendChild(inp);
  nameDiv.appendChild(btn);

  // add action listener to button
  btn.addEventListener('click', async () => {
    if (inp.value != "") {
      win.name = inp.value;
      inp.value = "";
      h2.innerText = "Window name: " + win.name;
      inp.setAttribute('placeholder', win.name);
    } else {
      let warning = document.createElement('p');
      warning.innerText = "**WARNING: new name must not be an empty string.**"
      warning.className = "warning";
      nameDiv.appendChild(warning);
    }
  });

  div.appendChild(nameDiv);


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

function updateName(event) {
  console.log('update name called ' + event);
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
