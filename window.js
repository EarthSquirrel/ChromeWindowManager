window.onload = function() {
  let btnName = document.getElementById("btnName");
  console.log('btn clicked');
  let nameDiv = document.getElementById("showWindows");
  let windowNameP = document.createElement("P");
  console.log(window.name);
  windowNameP.innerText = "window name: " + window.name;
  nameDiv.appendChild(windowNameP);
}
