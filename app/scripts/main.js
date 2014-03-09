/* global document, window, io */
$(document).foundation();
$(document).ready(initialize);

function initialize(){
  set_width();
  var s = skrollr.init({
  render: function(data) {
        //Log the current scroll position.
        console.log(data.curTop);
    },
    forceHeight:false,
    smoothScroll:true
  });
}

function set_width(){
  $("row").css({"max-width":window.innerWidth});
}
