// when document is ready being execution
$(document).ready(main)

var reload = function(){location.reload()}
var newTab = function(){chrome.runtime.sendMessage({action: 'newtab'},null)}
var newUrl = function(){chrome.runtime.sendMessage({action:'newtab', url:'https://google.ie'}, null)}



var leftTapConstraints = function(e){
    var xPos = e.originalEvent.targetTouches[0].screenX;
    var endX = $(window).width() * 0.2 // 20% of screen width
    endX = endX<100?100:endX;                   //minimum size of 100px
    return xPos < endX
}
var rightTapConstraints = function(e){
  var xPos = e.originalEvent.targetTouches[0].screenX;
  var width = $(window).width()
  var endX = width * 0.2 // 20% of screen width
  endX = endX<100?width-100:width-endX;                   //minimum size of 100px
  return xPos > endX
}

function main(){
  var singleTap = function(){alert("singleTap")}
  var doubleTap = function(){alert("doubleTap")}

  var gestures = [new Refresh(reload),
                  new TapGesture(newUrl, newTab, leftTapConstraints),
                  new TapGesture(newUrl, newTab, rightTapConstraints)
                 ]
  $(window).on('touchstart touchmove touchend', function(e){
    for(var i=0; i<gestures.length; i++){
      gestures[i].event_handler(e)
    }
  })
}