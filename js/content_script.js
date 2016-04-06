// when document is ready being execution
$(document).ready(main)

function main(){
  var refreshAction = function(){ console.log('refreshing')}
  var gestures = [new Refresh(refreshAction)]
  $(window).on('touchstart touchmove touchend', function(e){
    for(var i=0; i<gestures.length; i++){
      gestures[i].event_handler(e)
    }
  })
}