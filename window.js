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
  div.className = "windowDiv";
  let h2 = document.createElement('H2');
  h2.innerText = 'Window: ' + win.name;
  div.appendChild(h2);
  
  let renameForm = document.createElement("FORM");
  renameForm.method = "POST";
  let formName = 'renameForm' + i;
  renameForm.name = formName;
  let newlabel = document.createElement("Label");
  let labelId = 'changeName' + i;
  newlabel.setAttribute("for",labelId);
  newlabel.innerHTML = "Change window name: ";
  renameForm.appendChild(newlabel);

  var inp = document.createElement("input"); //input element, text
  inp.setAttribute('type',"text");
  inp.setAttribute('name',"windowName");
  inp.setAttribute('placeholder', name);
  inp.setAttribute('id', labelId)
  var btn = document.createElement('button');
  var btnId = 'btnNameChange' + i;
  btn.id = btnId;
  btn.innerText = "Click me";
  
  var s = document.createElement("input"); //input element, Submit button
  s.setAttribute('type',"submit");
  s.setAttribute('value',"Submit");
  var submitLabel = 'submitNameChange' + i;
  s.id = submitLabel;


  renameForm.appendChild(inp);
  renameForm.appendChild(s)
  //renameForm.appendChild(btn);
  for (let k=0; k<renameForm.childNodes.length; k++){
    console.log(renameForm.childNodes[k].id);
  }
  div.appendChild(btn);
  btn.addEventListener('click', async () => {
    console.log('eventListener: ');
  });


  div.appendChild(renameForm);

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
