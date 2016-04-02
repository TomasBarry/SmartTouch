chrome.runtime.onMessage.addListener(function(message,sender,sendResponse){
  sendResponse({farewell:"goodbye"});
  if (message.action == 'doubletap-left'){
  chrome.tabs.create({'url': "https://www.google.ie/?gws_rd=ssl"}, function(tab) {
    console.log("Tab opened")
  });
  }
  else if (message.action == 'doubletap-right'){
   chrome.tabs.create(null, function(tab) {
    console.log("Tab opened")
  });
  }
});