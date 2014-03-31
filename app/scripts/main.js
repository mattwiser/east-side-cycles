/* global document, window, io */
var map;
var marker;

$(document).foundation();
$(document).ready(initialize);
// if ($("#map-canvas")){
//   google.maps.event.addDomListener(window, 'load', initializeMap);
// }


function initialize(){
  setWidth();
  headerFade();
  headerResize();
  mapResize();
  detectTouch();
  $(window).on("resize", headerResize);
  $(window).triggerHandler('resize');
  setInterval(headerFade,15000);
}


function detectTouch(){
  var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
  // console.log(isTouch);
    if (!isTouch){
    var s = skrollr.init({
    render: function(data) {
      // Log the current scroll position.
      // console.log(data.curTop);
    },
    forceHeight:false,
    smoothScroll:true
    });
  }
}


function initializeMap() {
  marker = new google.maps.LatLng(36.177263, -86.749660)
  if ($("#map-canvas")) {
    var mapOptions = {
      zoom: 16,
      center: marker
    };
    map = new google.maps.Map(document.getElementById('map-canvas'), mapOptions);
    new google.maps.Marker({
      position: marker,
      map: map,
    });
  };
}

function mapResize(){
  if ($(window).load()) {
    var height = $("#contactContentAnchor").height();
    var padding = $("#contactContent").css("padding-bottom");
    var margin = $("#contactContent").css("margin-bottom");
    padding = parseInt(padding, 10);
    margin = parseInt(margin, 10);
    height = height - padding;
    $("iframe").height(height);

    // height = (height/3);
    // $("iframe").height((height*2));

    // var biosHeight = height;
    // biosHeight = biosHeight - margin;
    // biosHeight = biosHeight - padding;
    // $("#bios").height(biosHeight);
  };
}

function setWidth(){
  $("row").css({"max-width":window.innerWidth});
}

function headerResize(){

  if ($("#headerImage1").height() != 0) {
    var height = $("#headerImage1").height();
  } else if($("#headerImage2").height() != 0){
    var height = $("#headerImage2").height();
  } else if($("#headerImage3").height() != 0){
    var height = $("#headerImage3").height();
  } else {
    $("#mainWrap").css("top", "45px");
  }
  // console.log(height);
  $("#parallax_container").height(height);
  $("#mainWrap").css("top", height + "px");

}

function headerFade(){

  var children = $("#parallax").children();
  setTimeout(function(){
    // console.log("timeout 1");
    $(children[1]).fadeOut(800);
    $(children[2]).fadeIn(800);
  }, 5000);
    setTimeout(function(){
    // console.log("timeout 2");
    $(children[2]).fadeOut(800);
    $(children[0]).fadeIn(800);
  }, 10000);
    setTimeout(function(){
    // console.log("timeout 3");
    $(children[0]).fadeOut(800);
    $(children[1]).fadeIn(800);
  }, 15000);
}