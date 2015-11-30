
$( document ).ready(function() {
  console.log( 'ready!' );
});

$( "#field" ).on({
    "click": function() { console.log( "clicked!" ); },
    "mouseover": function() { console.log( "hovered!" ); }
});

//
$('#book').click(function(){
  var vis = $('h1#field').css("visibility");
  (vis == "visible") ? $('h1#field').css("visibility", "hidden") : $('h1#field').css("visibility","visible");  // jshint ignore:line

});

