chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  	if (message.action == 'doubletap-left') {
  		chrome.tabs.create({'url': "https://www.google.com"}, function(tab) {
    		console.log("Tab opened")
  		});
  	}
  	else if (message.action == 'doubletap-right') {
   		chrome.windows.create({'url': 'https://www.google.com'}, function(window) {
   			console.log("window opened")
   		});
  	}
});