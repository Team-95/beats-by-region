$(document).ready(function() {
  //expand individual song
  $('.playlist-video-header').click(function(){
    var $next = $(this).next('.playlist-video-outside');
    $('.playlist-video-outside').not($next).removeClass('.playlist-video-outside-open');
    $($next).toggleClass('playlist-video-outside-open');
    //if (($next).hasClass('playlist-video-outside-open')){
    //  var link = $(this).attr('id');
    //  ($next).html(link);
    //}

    //var video = $next.children(":first").children(":first").children(":first");
    //var video = $next.find('iframe');
    //var video = $('#video');
    //var vidURL = $(video).attr("src");
    //$("#video").attr("src","");
    //$("#video").attr("src",vidURL);
  });
});
