var TapGesture = function(double, triple, constr){
  var events = {touchstart:tap}
  var tapped = null
  var tapCount = 0
  var doubleTap = double
  var tripleTap = triple
  var constraints = constr

  // ** main entry point into the class ** //
  this.event_handler = function(e){
    if(e.type in events && constraints(e)){
      events[e.type](e)
    }
  };

  function tap(e){
    if(!tapped){
      tapCount++;
      tapped=setTimeout(function(){
          tapped=null;
          tapCount = 0;
      },180);
    }
    else{
      if(tapCount == 2){
        clearTimeout(tapped);
        console.log("doubleTap")
        tapCount = 0;
        tripleTap()
      }
      else{
        clearTimeout(tapped);
        tapCount++;
        tapped=setTimeout(function(){
          doubleTap()
          tapCount = 0;
        }, 180)
      }
    }
    e.preventDefault()
  }
}