/* global document, window, io */

//global variables
// document.addEventListener("visibilitychange", visibilityChange);
var isTouch = (('ontouchstart' in window) || (navigator.msMaxTouchPoints > 0));
var parallaxCheck = $("#parallaxContainer").length;
window.hasfocus = true;

window.onfocus = function(){
   this.hasfocus = true;
   console.log("window focus true")
}

window.onblur = function(){
   this.hasfocus = false;
   console.log("window focus false")
}
//end global variables

//initalize document and foundation
$(document).ready(initialize);
$(document).foundation({
  orbit: {
    animation: 'fade',
    timer_speed: 7000,
    slide_number: false,
    animation_speed: 700,
    pause_on_hover: false,
    timer: true,
    timer_progress_class: 'test',
    bullets: false
  }
});

//waits for all content(i.e. images) to load
$(window).load(function(){
  subContentResize();

});

function initialize(){
  setWidth();
  navOffset();
  parallaxResize();
  parallaxFade();
  goodsImage();

  $(window).on("resize", setWidth);
  $(window).on("resize", navOffset);
  $(window).on("resize", subContentResize);
  $(window).on("resize", parallaxResize);
  $(window).on("resize", parallaxAffix);
  $(window).on("scroll", parallaxAffix);
    $('.goodsImage').on("click", function(e){
    goodsImage(e);
  });
  window.setInterval(parallaxFade, 15000);
}
//end initalize document and foundation

//===========================================================================================================//
//===========================================================================================================//
//===========================================================================================================//
function goodsImage(e){
  if (e) {
    var target = $(e.target);
    var isActive = target.hasClass("goodsImageActive");
    var allImages = $(".goodsImage");

    if (!isActive) {
      allImages.removeClass("goodsImageActive")
      target.addClass("goodsImageActive");
    } else if (isActive) {
      target.removeClass("goodsImageActive");
    }
  }
}

function setWidth(){
  $("row").css({"max-width":window.innerWidth});
}

function navOffset(imageHeight){
  if (!parallaxCheck) {
  var offsetHeight = $("#nav").height();
  var header = $("#header");
  var body = $("#body");

  $(header).css("top", offsetHeight + "px");
  $(body).css("top", offsetHeight + "px");
  };
}

function subContentResize(){
  var imageHeight = $(".subContentImage").height();
  var imageWidth = $(".subContentImage").width();

  $(".subContentColor").height(imageHeight);
  $(".subContentColor").width(imageWidth);

  subContentTextResize();
}

function subContentTextResize(){
  var text = $(".subContentText");
  var textHeight = $(".subContentText").height();
  $(text).css("font-size", textHeight * .9);
}

function parallaxResize(){

  if (parallaxCheck) {
    var imageHeight = $(".parallaxImage").height();
    var imageWidth = $(".parallaxImage").width();
    var navHeight = $("#nav").height();
    var text1 = $(".parallaxCaption1");
    var text2 = $(".parallaxCaption2");
    var text3 = $(".parallaxCaption3");

    $("#parallaxContainer").height(imageHeight);

    $(text1).css("font-size", imageHeight * 0.07);
    $(text2).css("font-size", imageHeight * 0.05);
    $(text3).css("font-size", imageHeight * 0.1);

    $("#parallaxGradient").height(imageHeight);
    $("#parallaxGradient").width(imageWidth);

    $("#header").css("top", navHeight);
    $("#body").css("top", ((imageHeight*.9) + navHeight));
  }
}

function parallaxFade(){
  if (!isTouch && parallaxCheck && window.hasfocus) {
    var images = $(".parallaxImage");
    setTimeout(function(){
      $(images[1]).fadeOut(800);
      $(images[2]).fadeIn(800);
    }, 0);
      setTimeout(function(){
      $(images[2]).fadeOut(800);
      $(images[0]).fadeIn(800);
    }, 5000);
      setTimeout(function(){
      $(images[0]).fadeOut(800);
      $(images[1]).fadeIn(800);
    }, 10000);
  }
}

function parallaxAffix(){
  if (parallaxCheck) {
    var scrollPosition = $(window).scrollTop();
    var parallaxOffset = $(".parallaxImage").height();
    var navHeight = $("#nav").height();
    var isFixed = $("#parallaxContainer").css("position") === "fixed";


    parallaxOffset = (parallaxOffset*.615);
    parallaxOffset = (parallaxOffset - navHeight);
    if (scrollPosition >= (parallaxOffset-350)) {logoMover()}
    if (scrollPosition > parallaxOffset && !isFixed && !isTouch) {

      $("#parallaxContainer").css("position", "fixed");
      $("#parallaxContainer").css("transform", "translateY(-" + (scrollPosition-50) + "px)");

    } else if (scrollPosition < parallaxOffset && isFixed && !isTouch){
      $("#parallaxContainer").css("transform", "translateY(0px)");
      $("#parallaxContainer").css("position", "absolute");
    } else if (isTouch){
      // maybe set it to relative? you have to change #body's top positioning if you do that
      // $("#parallaxContainer").css("position", "relative");
    }
  }
}

var logoMover = function(){
  var logos = $(".logo");
  var time = 00;
  for (var i = logos.length - 1; i >= 0; i--) {
  time = time + 250;
  logoMoves(logos[i], time);
  };
}

function logoMoves(logo, time){
  setTimeout(function(){$(logo).addClass("translateX")}, time);
}






