function onError(error) {
  console.log(`Error: ${error}`);
  alert("Error opening window. No action taken.");
}

function openWindow(obj) {
  let win = obj.winObject;
  let acceptedKeys = ['height', 'incognito', 'left',
                      'setSelfAsOpener', 'state', 'top', 'type', 'width'];
  // giving errors with 'state': 'maximized' and keys 'left', 'height', 'width'
  // 'top' so removing those
  if (win['state'] == 'maximized'){
    acceptedKeys = ['incognito', 'setSelfAsOpener', 'state', 'type'];
  }
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
  console.log(newWin);
  browser.windows.create(newWin).then((windowInfo)=>{
    // Created window successfully! 
    console.log(`Created window: ${windowInfo.id}`);
    
    // remove window from storage
    chrome.storage.local.remove(obj.key, function () {
      console.log('removed ' + obj.key + ' from storage');
    });
    let removeDiv = document.getElementById(obj.key);
    removeDiv.remove();

  }, onError);

}


