$(document).ready(main)


function main() {
  var screen_X = $(window).width()
  var screen_Y = $(window).height()
  refreshGesture()
  doubleTap(screen_X, screen_Y)
}

// distance the user must scroll for it to be considered a swipe
//  TODO change scroll distance to depend on screen resolution
var scrollDelta = 100;
//drag gesture handler
// if the user is at the top of the page
function refreshGesture() {
	var startPos
	var endPos

	$(document).bind('mousedown touchstart', function(e) {
		if (e.type == "mousedown") {
    		startPos = e.screenY; // starting Y of client
  	  	}
  	    else {
    		startPos = e.originalEvent.targetTouches[0].screenY;
  	  	}
	})

	$(document).bind('mouseup touchend', function(e) {
    	if($(window).scrollTop() === 0) {
    		if (e.type == "mouseup") {
      			endPos = e.screenY; // ending Y of client
    		}
    		else {
        		endPos = e.originalEvent.changedTouches[0].screenY;
    		}
    		if ((endPos - startPos) > scrollDelta) {
        		var img = document.createElement("img")
        		iconURL = chrome.extension.getURL("/loadingGif.gif");
      			img.src = iconURL;
      			img.style =  "align:center; height:200px; width:200px; display: block; margin-left:auto; margin-right:auto; z-index: 2147483647;"
      			var div = document.createElement("div")
      			div.style ="position:absolute; width:100%; height:200px"
      			$(div).append(img)
      			$('body').prepend(div);
      			location.reload()
    		}
  		}
	})
}


function doubleTap(screen_X, screen_Y) {
  var eventList = new Array()
  $(document).bind('click', function(e) {
    if (eventList.length > 0) {
      if (window.performance.now() - eventList[0][1] < 1500 && Math.abs(e.screenX - eventList[0][0]) < 30) {
        if(eventList[0][2] == 0) {
          chrome.runtime.sendMessage({action: "doubletap-left"}, null);
        }
        else if (eventList[0][2] == 1) {
          chrome.runtime.sendMessage({action: "doubletap-right"}, null);
        }
        else {
        	console.log("Double tap for no action");
        }
      }
      eventList = []
    }
    else {
    	var p = -1;
    	if((e.screenX < (screen_X / 20)) && (e.screenY < (screen_Y / 3))) {
    		p = 0;
    	}
    	else if((e.screenX > (13 * (screen_X / 20))) && (e.screenY < (screen_Y / 3))) {
    		p = 1;
    	}
    	console.log(p)
      	var eventInfo = [e.screenX, window.performance.now(), p]
      	eventList.push(eventInfo)
    }
  })
}