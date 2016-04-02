chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  sendResponse({farewell:"goodbye"});
  chrome.tabs.create({'url': "https://www.google.ie/?gws_rd=ssl"}, function(tab) {
    console.log("Tab opened")
});
});