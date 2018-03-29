chrome.runtime.onInstalled.addListener(function() {
  chrome.storage.sync.set({color: '#3aa757'}, function() {
    console.log("The color is green.");
  })

  chrome.declarativeContent.onPageChanged.removeRules(undefined, function() {
    chrome.declarativeContent.onPageChanged.addRules([{
      conditions: [new chrome.declarativeContent.PageStateMatcher({
        pageUrl: { urlMatches: 'chrome://'},
      })],

      actions: [new chrome.declarativeContent.ShowPageAction()]
    }])
  })
})

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
  console.log(changeInfo.status)

  if (changeInfo.status == 'complete' && tab.active) {
    chrome.tabs.executeScript(
      {code: "(" + setupColors.toString() + ")()"});
  }
})

function setupColors(){
  let body = document.querySelector("body")

  body.style.filter = "invert(100%)"
  body.style.background = "black"

  let containers = document.querySelectorAll("* /deep/ #container")

  for(var i=0; i<containers.length; i++) {
    var container = containers[i]
    container.style.backgroundColor = "#f1f1f1"
  }

  let images = document.querySelectorAll("* /deep/ img")

  console.log('images found', images.length)

  for(var i=0; i<images.length; i++) {
    var image = images[i]
    image.style.filter = "invert(100%)"
  }

  document.onclick = function() {
    let dialogs = document.querySelectorAll("* /deep/ dialog")

    for(var i=0; i<dialogs.length; i++) {
      var dialog = dialogs[i]
      dialog.style.filter = "invert(100%)"
    }

    setTimeout(function() {
      for(var i=0; i<dialogs.length; i++) {
        var dialog = dialogs[i]
        dialog.style.filter = "invert(100%)"
      }
    }, 1000)
  }
}
