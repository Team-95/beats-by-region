$(document).ready(function() {
  //expand individual song
  $('.playlist-video-header').click(function(){
    //$(this).hide();
    var $next = $(this).next('.playlist-video-outside');
    $('.playlist-video-outside').not($next).hide();
    $next.toggle();
  });
});
