$(document).ready(function() {
  //expand individual song
  $('.playlist-video-header').click(function(){
    var $next = $(this).next('.playlist-video-outside');
    $('.playlist-video-outside').not($next).hide();
    $next.toggle();
    //var video = $next.children(":first").children(":first").children(":first");
    //var video = $next.find('iframe');
    //var video = $('#video');
    //var vidURL = $(video).attr("src");
    //$("#video").attr("src","");
    //$("#video").attr("src",vidURL);
  });
});
