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
      if(curY < 100){
        $('.refresh-animation').css('height',(curY)+'px')
      }
    }
    function resetAnimation(){
      var w = $('.refresh-animation').offset().top
      while( w > -100){
        $('.refresh-animation').css('height', (w--)+'px')
        console.log("resetting")
      }
    }
  // ** Gesture constraints ** //
  var constraints = function(e){
    return $(window).scrollTop() === 0
  }

  //** Initial DOM setup functions **//
  function setupLoadingImage(){
    var div = $('<div class="refresh-animation"><')
    $(document.body).prepend(div)
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