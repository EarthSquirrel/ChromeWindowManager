function openWindow(obj) {
  let win = obj.winObject;
  let acceptedKeys = ['height', 'incognito', 'left', 
                      'setSelfAsOpener', 'state', 'top', 'type', 'width'];
  let newWin = {};
  for (let k=0; k<acceptedKeys.length; k++) {
    let key = acceptedKeys[k];
    if (key in win) {
      newWin[key] = win[key];
    }
  }
  let urls = [];
  for (let t=0; t<win.tabs.length; t++){
    urls.push(win.tabs[t].url);
  }
  newWin['url'] = urls;
  newWin['focused'] = true;
  chrome.windows.create(newWin); 
  
  // remove window from storage
  chrome.storage.local.remove(obj.key, function () {
    console.log('removed ' + obj.key + ' from storage');
  });
  let removeDiv = document.getElementById(obj.key);
  removeDiv.remove();
}


