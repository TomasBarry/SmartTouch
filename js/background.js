chrome.runtime.onMessage.addListener(function(message, sender, sendResponse) {
  	if (message.action == 'newtab') {
        if('url' in message){
          chrome.tabs.create({url:message.url}, null)
        }
        else{
          console.log("asdfasd")
      		chrome.tabs.create({}, null);
      }
  	}
});