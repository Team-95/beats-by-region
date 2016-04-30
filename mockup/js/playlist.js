$(document).ready(function() {
  //expand individual song
  $('.playlist-video-header').click(function(){
    var $next = $(this).next('.playlist-video-outside');
    //var $nextHeader = $(this).closest().next().find('.playlist-video-header');
    //var $nextHeader = $(this).closest('.playlist-video-header');
    var $nextHeader = $($next).next('.playlist-video-header');
    $('.playlist-video-outside').not($next).hide();
    $next.toggle();
    //var video = $next.children(":first").children(":first").children(":first");
    //var video = $next.find('iframe');
    //var video = $('#video');
    //var vidURL = $(video).attr("src");
    //$("#video").attr("src","");
    //$("#video").attr("src",vidURL);
    console.log($nextHeader);
    console.log($next);
    if ($nextHeader.length){
      console.log ('something');

    }
    else{
      console.log('nothing');
      //check if open then
      $($next).toggleClass('playlist-video-header-bottom');
    }
  });
});
