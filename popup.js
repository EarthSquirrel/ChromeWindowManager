let button = document.getElementById("openWindow");

button.onclick = function() {
  chrome.tabs.create({url: 'window.html'});
}

let btnClear = document.getElementById("clearStorage");
btnClear.onclick = function() {
  chrome.storage.local.clear();
}

window.onload = function() {
  let closedWindows = document.getElementById('showClosedWindows');
  let maxWidth = 0;
  chrome.storage.local.get(null, function(items) {
    let allKeys = Object.keys(items);
    for (let i=0; i<allKeys.length; i++) {
      console.log(allKeys[i]);
      chrome.storage.local.get(allKeys[i], function (obj) {
        let key = allKeys[i];
        let win = obj[key];
        if (win.type == "closedWindow") {
          let rowDiv = document.createElement('div');
          rowDiv.className = "showClosedWindows";
          let btn = document.createElement('button');
          btn.innerText = "open";
          let lab = document.createElement('label');
          lab.className = "showClosedWindows";
          lab.innerText = win.name;
          rowDiv.appendChild(btn);
          rowDiv.appendChild(lab);
          let compWidth = lab.offsetWidth + btn.offsetWidth;
          if (maxWidth < compWidth) {
            maxWidth = compWidth;
          }
          closedWindows.appendChild(rowDiv);
        }
      });
    }
  });

}
