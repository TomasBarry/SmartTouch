// when document is ready being execution
$(document).ready(main)

var Refresh = function(action){
  //** initial setup **//
  setupLoadingImage()
  //** action to be taken on a successful gesture **//
  var action = action;

  //** Handler specific variables ** //
  var swipeDelta = 100;
  var startingPosition = -1;
  var touchDown = false;

  //** Event Handler Functions ** //
  var touchstart =function(e){
    touchDown = true;
    startingPosition = e.originalEvent.targetTouches[0].screenY;
  };
  var touchmove =function(e){
    if (touchDown){
      var pos  = e.originalEvent.targetTouches[0].screenY
      animateImage(pos - startingPosition - 50)
    }
  };
  function touchend(e){
    var endPos = e.originalEvent.changedTouches[0].screenY;
    if ((endPos - startingPosition) >= swipeDelta){
      action()
    }
    else{
      console.log("resetting animation")
      resetAnimation()
    }
    touchDown = false
  };

  // ** Animations for Gesture ** //
    function animateImage(curY){
      if(curY < 50){
        $('.loading-animation').css('top',(curY)+'px')
      }
    }
    function resetAnimation(){
      var w = $('.loading-animation').offset().top
      while( w != -100){
        $('.loading-animation').css('top', (w--)+'px')
      }
    }
  // ** Gesture constraints ** //
  var constraints = function(e){
    return $(window).scrollTop() === 0
  }

  //** Initial DOM setup functions **//
  function setupLoadingImage(){
    var img = document.createElement("img")
    var iconURL = chrome.extension.getURL("images/loadingGif.gif");
    img.src = iconURL;
    var cX = Math.floor($(window).width() /2)- 50
    img.style =  "position:absolute; top:-100px;left:"+cX+"px;z-index:1000; width:100px;height100px;"
    img.className = "loading-animation"
    $(document.body).prepend(img)
  }

  //define a set of events that this gesture is concerned with and the action that should be taken when
  // that event is encountered
  var events = {touchstart:touchstart, touchmove:touchmove, touchend:touchend}
  //main entry point into the class (should be the only non private method)
  //handler exection of gesture
  this.event_handler = function(e){
    if(e.type in events && constraints(e)){
      events[e.type](e)
    }
  };
}



function main(){
  var refreshAction = function(){ location.reload()}
  var gestures = [new Refresh(refreshAction)]
  $(window).on('touchstart touchmove touchend', function(e){
    for(var i=0; i<gestures.length; i++){
      gestures[i].event_handler(e)
    }
  })
}

// function topLeft(clickX, clickY) {
// 	var width = window.innerWidth;
// 	var height = window.innerHeight;
// 	console.log("Width: " + width);
// 	console.log("Height: " + height);
// 	if((clickX < (0.25 * width)) && (clickY < (0.40 * height))) {
// 		console.log("User clicked in top left");
// 		return true;
// 	}
// 	return false;
// }


// function bottomLeft(clickX, clickY) {
// 	var width = window.innerWidth;
// 	var height = window.innerHeight;
// 	console.log("Width: " + width);
// 	console.log("Height: " + height);
// 	if((clickX < (0.25 * width)) && (clickY > (0.60 * height))) {
// 		console.log("User clicked in bottom left");
// 		return true;
// 	}
// 	return false;
// }


// function topRight(clickX, clickY) {
// 	var width = window.innerWidth;
// 	var height = window.innerHeight;
// 	console.log("Width: " + width);
// 	console.log("Height: " + height);
// 	if((clickX > (0.55 * width)) && (clickY < (0.40 * height))) {
// 		console.log("User clicked in top right");
// 		return true;
// 	}
// 	return false;
// }


// function bottomRight(clickX, clickY) {
// 	var width = window.innerWidth;
// 	var height = window.innerHeight;
// 	console.log("Width: " + width);
// 	console.log("Height: " + height);
// 	if((clickX > (0.55 * width)) && (clickY > (0.60 * height))) {
// 		console.log("User clicked in bottom right");
// 		return true;
// 	}
// 	return false;
// }


// function doubleTap() {
//   	var eventList = new Array()
//   	$(document).bind('click', function(e) {
// 	    if (eventList.length > 0) {
// 			if (window.performance.now() - eventList[0][1] < 1500 && Math.abs(e.screenX - eventList[0][0]) < 30) {
// 				if(eventList[0][2] == 0) {
// 				  	chrome.runtime.sendMessage({action: "doubletap-left"}, null);
// 				}
// 				else if (eventList[0][2] == 1) {
// 				  	chrome.runtime.sendMessage({action: "doubletap-right"}, null);
// 				}
// 				else if (eventList[0][2] == 2) {
// 				  	console.log("Bottom Left");
// 				}
// 				else if (eventList[0][2] == 3) {
// 				  	console.log("Bottom Right");
// 				}
// 				else {
// 					console.log("Double tap for no action");
// 				}
// 			}
// 			eventList = []
// 	    }
// 	    else {
// 	    	var p = -1;
// 	    	console.log("Users click event");
// 	    	console.log(e);
// 	    	if(topLeft(e.screenX, e.screenY)) {
// 	    		p = 0;
// 	    	}
// 	    	else if(topRight(e.screenX, e.screenY)) {
// 	    		p = 1;
// 	    	}
// 	      	else if(bottomLeft(e.screenX, e.screenY)) {
// 	        	p = 2;
// 	      	}
// 	      else if(bottomRight(e.screenX, e.screenY)) {
// 	        	p = 3;
// 	      }
// 	      console.log(p)
// 	      var eventInfo = [e.screenX, window.performance.now(), p]
// 	      eventList.push(eventInfo)
// 	    }
// 	})
// }