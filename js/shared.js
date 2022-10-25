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
  if (win['state'] == 'maximized' || win['state'] == 'minimized'){
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
    let url = win.tabs[t].url;
    // new tabs give errors, blank urls correspond to new tabs
    // TODO: Is this just a firefox thing?
    console.log('userAgent: ' + checkIsFireFox());
    if (checkIsFireFox() && url === 'about:newtab'){
      // about:newtab is privlidged and therefore cannot be opened here
      url = 'about:blank';
    }
    urls.push(url);
  }
  newWin['url'] = urls;
  newWin['focused'] = true;
  console.log(newWin);
  browser.windows.create(newWin).then((windowInfo)=>{
    // Created window successfully! 
    console.log(`Created window: ${windowInfo.id}`);
    console.log(windowInfo)  
    // remove window from storage
    chrome.storage.local.remove(obj.key, function () {
      console.log('removed ' + obj.key + ' from storage');
    });
    let removeDiv = document.getElementById(obj.key);
    removeDiv.remove();

  }, onError);

}

function checkIsFireFox(){
  // return  true if browser is firefox, false if not
  const userAgent = navigator.userAgent.toLowerCase();
  console.log(userAgent);
  console.log(userAgent.indexOf('firefox'));
  return userAgent.indexOf('firefox') != 1;
}

