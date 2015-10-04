SC.initialize({
  client_id: '09df16312bea467f9d866bbae94c9c54',
  redirect_uri: 'http://localhost/lab/_misc/soundcloud-chorome-extension/hash/callback.html'
});

SC.connect().then(function() {
  return SC.get('/me');
}).then(function(me) {
  alert('Hello, ' + me.username);
});

/*
function connect2sc() {
  SC.connect(function() {
    log('sc connected'); //<-- this logs out to my console in all browsers
    
    // get user info
    SC.get('/me', function(response) {
      log('callback successful'); //<-- this does not log out in Internet Explorer
      log(response); 
    });
  });
}

SC.connect().then(function() {
  return SC.get('/me');
}).then(function(me) {
  alert('Hello, ' + me.username);
});

SC.get('/user/4920625/tracks').then(function(tracks){
  alert('Latest track: ' + tracks[0].title);
});
*/