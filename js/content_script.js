// distance the user must scroll for it to be considered a swipe
//  TODO change scroll distance to depend on screen resolution
var scrollDelta = 100;
//drag gesture handler
// if the user is at the top of the page
if($(window).scrollTop() === 0){
  var startPos
  var endPos

  $(document).bind('mousedown touchstart', function(e){
      if (e.type == "mousedown"){
        startPos = e.pageY; // starting Y of client
      }
      else{
        startPos = e.originalEvent.targetTouches[0].pageY;
      }
    })

  $(document).bind('mouseup touchend', function(e){
      if (e.type == "mouseup"){
        endPos = e.pageY; // ending Y of client
      }
      else{
        endPos = e.originalEvent.changedTouches[0].pageY;
      }
      if ((endPos - startPos) > scrollDelta){
        location.reload()
      }
  })
}