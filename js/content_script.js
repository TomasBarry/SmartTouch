// distance the user must scroll for it to be considered a swipe
//  TODO change scroll distance to depend on screen resolution
var scrollDistance = 40;

$(document).on('mousedown', function(e){
  // if the user is at the top of the page
  if($(window).scrollTop() == 0){
    console.log("Page X:"+ e.pageX + "Page Y" + e.pageY)
    console.log("Client X:"+ e.clientX + "Client Y" + e.clientY)
  }
})