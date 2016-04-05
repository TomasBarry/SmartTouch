$(document).ready(main)

var Refresh = function(action){
  //action to be taken on a successful gesture
  var action = action;
  //touchstart handler
  var touchstart =function(e){
    console.log('touchstart')
  };
  //touchmove handler
  var touchmove =function(e){
    console.log('touchmove')
  };
  //touch end handler
  var touchend =function (e){
    console.log('touchsend')
    action()
  };
  //define a set of events that this gesture is concerned with and the action that should be taken when
  // that event is encountered
  var events = {touchstart:touchstart, touchmove:touchmove, touchend:touchend}
  //main entry point into the class (should be the only non private method)
  this.event_handler = function(e){
    if(e.type in events){
      events[e.type](e)
    }
  };
}

function main(){
  var refreshAction = function(){ console.log("REFRESHING")}
  var gestures = [new Refresh(refreshAction)]
  $(window).on('touchstart touchmove touchend', function(e){
    for(var i=0; i<gestures.length; i++){
      gestures[i].event_handler(e)
    }
  })
}


// distance the user must scroll for it to be considered a swipe
//drag gesture handler
// if the user is at the top of the page
// function refreshGesture() {
//   var startPos
//   var endPos
//   var scrollDelta = 100;
//   setupLoadingImage()
//   $(document).on('mousedown touchstart', function(e) {
//     startPos = e.type == "mousedown"? e.screenY:e.originalEvent.targetTouches[0].screenY;
//       $(this).on('mousemove touchmove', function(e){
//         var curY = e.type == "mousemove"? e.screenY:e.originalEvent.targetTouches[0].screenY;
//         animateImage(curY - startPos - 50)
//       })
//   }).on('mouseup touchend', function(e){
//     if($(window).scrollTop() === 0){
//       endPos = e.type == 'mouseup'?e.screenY:e.originalEvent.changedTouches[0].screenY;
//       if ((endPos - startPos) > scrollDelta) {
//         location.reload()
//       }
//       else{
//         resetAnimation()
//       }
//       $(this).unbind('mousemove touchmove');
//   })
//   function setupLoadingImage(){
//     var img = document.createElement("img")
//     var iconURL = chrome.extension.getURL("images/loadingGif.gif");
//     img.src = iconURL;
//     var cX = Math.floor($(window).width() /2)- 50
//     img.style =  "position:absolute; top:-100px;left:"+cX+"px;z-index:1000; width:100px;height100px;"
//     img.className = "loading-animation"
//     $(document.body).prepend(img)
//   }
//   function animateImage(curY){
//     if(curY < 50){
//     $('.loading-animation').css('top',(curY)+'px')
//     }
//   }
//   function resetAnimation(){
//     var w = $('.loading-animation').offset().top
//     while( w != -100){
//       $('.loading-animation').css('top', (w--)+'px')
//     }
//   }
// }


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