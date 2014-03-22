/* global document, window, io */
var map;
var marker;

$(document).foundation();
$(document).ready(initialize);
google.maps.event.addDomListener(window, 'load', initializeMap);

function initialize(){
  set_width();
  header_fade();
  headerResize();
  // initializeMap();
  $(window).on("resize", headerResize)
  setInterval(headerFade,15000);
  
  if ($(window).width() > 767){
    var s = skrollr.init({
    render: function(data) {
      //Log the current scroll position.
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

function set_width(){
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
  console.log(height);
  $("#parallax_container").height(height);
  $("#mainWrap").css("top", height + "px");

}

function headerFade(){

  var children = $("#parallax").children();
  setTimeout(function(){
    console.log("timeout 1");
    $(children[1]).fadeOut(800);
    $(children[2]).fadeIn(800);
  }, 5000);
    setTimeout(function(){
    console.log("timeout 2");
    $(children[2]).fadeOut(800);
    $(children[0]).fadeIn(800);
  }, 10000);
    setTimeout(function(){
    console.log("timeout 3");
    $(children[0]).fadeOut(800);
    $(children[1]).fadeIn(800);
  }, 15000);
}