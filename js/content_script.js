$(document).ready(main)


function main() {
  refreshGesture()
  doubleTap()
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
        		iconURL = chrome.extension.getURL("../images/loadingGif.gif");
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


function topLeft(clickX, clickY) {
	var width = window.innerWidth;
	var height = window.innerHeight;
	console.log("Width: " + width);
	console.log("Height: " + height);
	if((clickX < (0.25 * width)) && (clickY < (0.40 * height))) {
		console.log("User clicked in top left");
		return true;
	}
	return false;
}


function bottomLeft(clickX, clickY) {
	var width = window.innerWidth;
	var height = window.innerHeight;
	console.log("Width: " + width);
	console.log("Height: " + height);
	if((clickX < (0.25 * width)) && (clickY > (0.60 * height))) {
		console.log("User clicked in bottom left");
		return true;
	}
	return false;
}


function topRight(clickX, clickY) {
	var width = window.innerWidth;
	var height = window.innerHeight;
	console.log("Width: " + width);
	console.log("Height: " + height);
	if((clickX > (0.55 * width)) && (clickY < (0.40 * height))) {
		console.log("User clicked in top right");
		return true;
	}
	return false;
}


function bottomRight(clickX, clickY) {
	var width = window.innerWidth;
	var height = window.innerHeight;
	console.log("Width: " + width);
	console.log("Height: " + height);
	if((clickX > (0.55 * width)) && (clickY > (0.60 * height))) {
		console.log("User clicked in bottom right");
		return true;
	}
	return false;
}


function doubleTap() {
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
				else if (eventList[0][2] == 2) {
				  	console.log("Bottom Left");
				}
				else if (eventList[0][2] == 3) {
				  	console.log("Bottom Right");
				}
				else {
					console.log("Double tap for no action");
				}
			}
			eventList = []
	    }
	    else {
	    	var p = -1;
	    	console.log("Users click event");
	    	console.log(e);
	    	if(topLeft(e.screenX, e.screenY)) {
	    		p = 0;
	    	}
	    	else if(topRight(e.screenX, e.screenY)) {
	    		p = 1;
	    	}
	      	else if(bottomLeft(e.screenX, e.screenY)) {
	        	p = 2;
	      	}
	      else if(bottomRight(e.screenX, e.screenY)) {
	        	p = 3;
	      }
	      console.log(p)
	      var eventInfo = [e.screenX, window.performance.now(), p]
	      eventList.push(eventInfo)
	    }
	})
}