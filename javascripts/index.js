// 初期情報をインプット
SC.initialize({
  client_id: client_id,
  redirect_uri: redirect_uri
});

SC.connect().then(function() {
  // Streamデータを認証後に取得
  return SC.get('/me/activities');
}).then(function(activities) {
  // Streamデータを展開
  console.log(activities);
  for (var i=0; i<activities.collection.length; i++) {
    var item = activities.collection[i];
    if (item.type == "track" && item.origin.streamable == true) {
      var html = '<div class="track">' + 
                 '<img class="artwork" src="'+ item.origin.artwork_url.replace("large\.jpg", "t500x500.jpg") +'">' +
                 '<img class="controls play" src="./images/play.png">' + 
                 '<div class="information">' + 
                 '<p class="title">'+ item.origin.title +'</p>' +
                 '<p class="username">'+ item.origin.user.username +'</p>' + 
                 '</div>' +
                 '<p class="seekbar"></p>' + 
                 '<audio src="'+ item.origin.stream_url +'?client_id=' + client_id + '" preload="auto"></audio>' +
                 '</div>';
      $("#player").append(html);
    }
  }

  $(".controls.play").on('click', function(){
    var audio = $(this).parent().children('audio')[0];
    var seekbar = $(this).parent().children('.seekbar');

    if (audio.paused == true){
      audio.play();
      $(this).attr("src", "./images/stop.png");
      played = setInterval(function(){
        var position = Math.round(audio.currentTime / audio.duration * 100);
        seekbar.css("backgroundSize", position + "%");
      }, 1000/60);
    } else {
      audio.pause();
      $(this).attr("src", "./images/play.png");
      clearInterval(played);
    }
  });
});