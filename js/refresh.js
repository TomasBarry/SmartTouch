var Refresh = function(action){
  //** initial setup **//
  setupAnimation()
  //** action to be taken on a successful gesture **//
  var action = action;
  // ** set of events the gesture is composed of ** //
  var events = {touchstart:touchstart, touchmove:touchmove, touchend:touchend}
  //** Handler specific variables ** //
  var swipeDelta = 150;
  var startingPosition = -1;
  var touchDown = false;
  var show_icon = false;

  // ** main entry point into the class ** //
  this.event_handler = function(e){
    if(e.type in events && constraints(e)){
      events[e.type](e)
    }
  };
  //** Event Handler Functions ** //
  function touchstart(e){
    touchDown = true;
    startingPosition = e.originalEvent.targetTouches[0].screenY;
  };
  function touchmove(e){
    var pos  = e.originalEvent.targetTouches[0].screenY
    //if touchscreen pressed and moving in down direction
    if (touchDown && pos > startingPosition){
      e.preventDefault();
      animateImage(pos - startingPosition - 50)
    }
  };
  function touchend(e){
    var endPos = e.originalEvent.changedTouches[0].screenY;
    if ((endPos - startingPosition) >= swipeDelta){
      action()
    }
    else{
      resetAnimation()
    }
    touchDown = false
  };
  // ** Animations for Gesture ** //
    function animateImage(curY){
      var width = $(window).width()
      var position = Math.round(((width/2) - (160/2)) + $(window).scrollLeft())
      //if the horizontal scroll bar has moved
      if(position != $('.refresh-animation').position().left){
        $('.refresh-animation').css('left', position+'px')
      }
      if(curY < 90){
        $('.refresh-animation').css('height',(curY)+'px')
      }
      else if (!show_icon){
        $('.refresh-image').css('display', 'inline-block')
        show_icon = true
      }
    }
    function resetAnimation(){
      $('.refresh-image').css('display', 'none')
      $('.refresh-animation').animate({height: "0px"});
      show_icon =false;
    }
  // ** Gesture constraints ** //
  function constraints(e){
    return $(window).scrollTop() === 0
  }

  //** Initial DOM setup functions **//
  function setupAnimation(){
    var width = $(window).width()
    var left_pos = Math.round((width/2) - (160/2))
    $(document.body).prepend('<div class="refresh-animation" style="left:'+left_pos+'px;"/>')
    var imgURL = chrome.extension.getURL("/images/refresh-ico.png");
    var img = $('<img class="refresh-image" src="'+imgURL+'">')
    $('.refresh-animation').append(img)
    $('.refresh-image').css('display', 'none')
  }
}