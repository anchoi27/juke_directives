'use strict';

juke.factory('AlbumFactory', function ($http, SongFactory, PlayerFactory) {

  var AlbumFactory = {};


  AlbumFactory.shuffle = function (songs) {

      var array = songs;
       console.log('before', array)
      var currentIndex = array.length, temporaryValue, randomIndex;

      // While there remain elements to shuffle...
      while (0 !== currentIndex) {

        // Pick a remaining element...
        randomIndex = Math.floor(Math.random() * currentIndex);
        currentIndex -= 1;

        // And swap it with the current element.
        temporaryValue = array[currentIndex];
        array[currentIndex] = array[randomIndex];
        array[randomIndex] = temporaryValue;
      }
      console.log('after', array)
      PlayerFactory.start(array[0], array);
  };

  AlbumFactory.fetchAll = function () {
    return $http.get('/api/albums')
    .then(function (response) { return response.data; })
    .then(function (albums) { return albums.map(AlbumFactory.convert); });
  };

  AlbumFactory.fetchById = function (id) {
    return $http.get('/api/albums/' + id)
    .then(function (response) { return response.data; })
    .then(AlbumFactory.convert)
    .then(function (album) {
      album.songs = album.songs.map(SongFactory.convert);
      return album;
    });
  };

  AlbumFactory.convert = function (album) {
    album.imageUrl = '/api/albums/' + album.id + '/image';
    return album;
  };

  return AlbumFactory;

});
