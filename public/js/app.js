/* global document, window, io */
$(document).foundation();
$(document).ready(initialize);

function initialize(){
  testing();
  var s = skrollr.init({
    render: function(data) {
      //Debugging - Log the current scroll position.
      console.log(data.curTop);
    }
  });
};

function testing(){
  console.log('Hello World');
};
