$(document).ready(function() {
  //find and style first header
  $('.playlist-video-header').first().addClass('playlist-video-header-top');

  //find and style last header and video
  $('.playlist-video-header').last().addClass('playlist-video-header-bottom');
  $('.playlist-video-outside').last().addClass('playlist-video-header-bottom');

  //expand individual song
  $('.playlist-video-header').click(function(){
    var $next = $(this).next('.playlist-video-outside');
    $('.playlist-video-outside').not($next).removeClass('playlist-video-outside-open');
    $($next).toggleClass('playlist-video-outside-open');

    //makes the last video header rounded if video window is closed
    var bottom = ""
    if($($next).hasClass('playlist-video-header-bottom')){
        bottom = 'playlist-video-header-bottom'
    }
    $(this).toggleClass(bottom);

    //delete all videos
    $('iframe').attr("src","");

    //Open video - load video (a little slow)
    var video = $next.find('iframe');
    if (($next).hasClass('playlist-video-outside-open')){
      var link = $(video).attr('id');
      $(video).attr('src','https://www.youtube.com/embed/'+link);
    }
  });
});
