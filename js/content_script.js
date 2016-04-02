// distance the user must scroll for it to be considered a swipe
//  TODO change scroll distance to depend on screen resolution
var scrollDelta = 100;
//drag gesture handler
// if the user is at the top of the page
if($(window).scrollTop() === 0){
  var startPos
  var endPos

  $(document).bind('mousedown touchstart', function(e){
    // alert('touched')
    console.log(e)
    startPos = e.clientY; //starting Y of client
    })

  // $(document).bind('mouseup touchend', function(e){
  //   alert('released')
  //     endPos = e.clientY; //stopping Y of client
  //     if ((endPos - startPos) > scrollDelta){
  //       console.log("startPos"+ startPos + "endPos" + endPos + "Delta" + (endPos-startPos))
  //     }
  // })
}