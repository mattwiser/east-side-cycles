/* global document, window, io */

//global variables
var s;
var cnt;
var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
$(document).foundation({
  orbit: {
    animation: 'fade',
    timer_speed: 2500,
    slide_number: false,
    animation_speed: 700,
    pause_on_hover: false,
    timer: false,
    timer_progress_class: 'test',
    bullets: false
  }
});
$(document).ready(initialize);

function initialize(){
  skrollrInit();
  skrollrToggle();
  setWidth();
  parallaxFade();
  parallaxResize();
  subContentResizeInitial();
  $(window).on("resize", windowScroll);
  $(window).on("resize", skrollrToggle);
  $(window).on("resize", parallaxResize);
  $(window).on("resize", subContentResize);
  $(window).on("resize", interiorPageOffset);
  $(window).triggerHandler('resize');
  setInterval(parallaxFade,15000);
}


//===========================================================================================================//
//===========================================================================================================//
//===========================================================================================================//

function skrollrInit(){
  if (!isTouch) {
    s = skrollr.init({
      render: function(data) {
        if (data.curTop>=350 ) {
          $("nav").css("background-color", "rgba(0,0,0,1)")
        };
      },
      forceHeight:false,
      smoothScroll:true
    });
    if ($("#navHoist").length) {
      window.onbeforeunload = function(e) {
        window.scrollTo(0, 0);
      };
    };
  };
}

function skrollrToggle(){

  var mediaWidth = $(window).width() / parseFloat($("body").css("font-size"));


  if (mediaWidth<64 && isTouch) {
    $("nav").css("background-color", "black");
  }
  if (mediaWidth>64  && !s && !isTouch){
      window.location.reload();
  }
}


function windowScroll(){
  if ($("#navHoist").length && !isTouch) {
    window.scrollTo(0, 0);
  };
}

function textResize(){
  var text = $(".subContentText");
  var textHeight = $(".subContentText").height();
  $(text).css("font-size", textHeight * .2);
}

function subContentResizeInitial(){

    $(window).load(function(){

      var height = $(".subContentImage").height();
      var width = $(".subContent").width();



      $(".subContent").height(height);

      $(".subContentColor1").height(height);
      $(".subContentColor1").width(width);

      $(".subContentColor2").height(height);
      $(".subContentColor2").width(width);

      $(".subContentColor3").height(height);
      $(".subContentColor3").width(width);

      $(".subContentColor4").height(height);
      $(".subContentColor4").width(width);

      textResize();

  });
};
function subContentResize(){
  var height = $(".subContentImage").height();
  var width = $(".subContent").width();
  var text = $(".subContentText");
  var textHeight = $(".subContentText").height();


  $(".subContent").height(height);


  $(".subContentColor1").height(height);
  $(".subContentColor1").width(width);

  $(".subContentColor2").height(height);
  $(".subContentColor2").width(width);

  $(".subContentColor3").height(height);
  $(".subContentColor3").width(width);

  $(".subContentColor4").height(height);
  $(".subContentColor4").width(width);

  $(text).css("font-size", textHeight * .2);
}

function interiorPageOffset(){
  var height = $("#header").height();
  $("#body").css("top", height);
}


function setWidth(){
  $("row").css({"max-width":window.innerWidth});
}

function parallaxResize(){

  if ($("#headerImage1").height() != 0) {
    var height = $("#headerImage1").height();
  } else if($("#headerImage2").height() != 0){
    var height = $("#headerImage2").height();
  } else if($("#headerImage3").height() != 0){
    var height = $("#headerImage3").height();
  } else if (!height) {
    $("#mainWrap").css("top", "24px");
  }
  // console.log(height);
  $("#parallax_container").height(height);
  if (height) {
    height = height + 45;
    $("#mainWrap").css("top", height + "px");
  };

}

function parallaxFade(){

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