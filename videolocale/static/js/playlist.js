$(document).ready(function() {
  //expand individual song
  $('.playlist-video-header').click(function(){
    var $next = $(this).next('.playlist-video-outside');
    $('.playlist-video-outside').not($next).removeClass('playlist-video-outside-open');
    $($next).toggleClass('playlist-video-outside-open');

    var video = $next.find('iframe');
    //load video (a little slow)
    if (($next).hasClass('playlist-video-outside-open')){
      var link = $(this).attr('id');
      $(video).attr('src','http://www.youtube.com/embed/'+link);
    }
    //delete video
    else{
      $(video).attr("src","");
    }

    //var video = $('#video');
    //var vidURL = $(video).attr("src");
    //$("#video").attr("src","");
    //$("#video").attr("src",vidURL);
  });
});
