/* global document, window, io */
$(document).foundation();
$(document).ready(initialize);

function initialize(){
  set_width();
  header_fade();
  setInterval(header_fade,15000);
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


function header_fade(){

  var children = $("#parallax").children();
  setTimeout(function(){
    console.log("timeout 1")
    $(children[1]).fadeOut(800);
    $(children[2]).fadeIn(800);
  }, 5000)
    setTimeout(function(){
    console.log("timeout 2")
    $(children[2]).fadeOut(800);
    $(children[0]).fadeIn(800);
  }, 10000)
    setTimeout(function(){
    console.log("timeout 3")
    $(children[0]).fadeOut(800);
    $(children[1]).fadeIn(800);
  }, 15000)
}