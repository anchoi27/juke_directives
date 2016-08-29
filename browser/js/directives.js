juke.directive('sidebar', function() {
	return {
		restrict: 'E',
		templateUrl: '/js/sidebar/sidebarTemplate.html'
	};
});

juke.directive('audioplayer', function(PlayerFactory) {
	return {
		restrict: 'E',
		templateUrl: '/js/player/playerTemplate.html',
		link: function(scope, elem, attrs) {
		  angular.extend(scope, PlayerFactory); // copy props from param2 to param1

		  scope.toggle = function () {
		    if ( PlayerFactory.isPlaying() ) PlayerFactory.pause();
		    else PlayerFactory.resume();
		  };

		  scope.getPercent = function () {
		    return PlayerFactory.getProgress() * 100;
		  };

		  scope.handleProgressClick = function (evt) {
		    PlayerFactory.seek(evt.offsetX / evt.currentTarget.scrollWidth);
		  };
		}
	}
})

juke.directive('albumlist', function() {
	return {
		restrict: 'E',
		templateUrl: '/js/album/templates/albums.html'
	}
})

juke.directive('songlist', function(PlayerFactory) {
	return {
		restrict: 'E',
		templateUrl: '/js/song/songlistTemplate.html',
		scope: {
			songs:'='
		},
		link: function(scope, elem, attrs) {
		console.log(scope.songs);
		  scope.toggle = function (song) {
		    if (song !== PlayerFactory.getCurrentSong()) {
		      PlayerFactory.start(song, scope.songs);
		    } else if ( PlayerFactory.isPlaying() ) {
		      PlayerFactory.pause();
		    } else {
		      PlayerFactory.resume();
		    }
		  };

		  scope.getCurrentSong = function () {
		    return PlayerFactory.getCurrentSong();
		  };

		  scope.isPlaying = function (song) {
		    return PlayerFactory.isPlaying() && PlayerFactory.getCurrentSong() === song;
		  };
		}

	};
});

juke.directive('doubleClick', function(PlayerFactory) {
	return {
		restrict: 'A',
		scope: {
			doubleClick: '&'
		},
		link: function(scope, elem, attrs) {
		  elem.on('dblclick', function() {
		  	scope.doubleClick();
		  })

		}
	};
});