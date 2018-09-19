angular.module('movieApp')
.controller('CinemasCtrl', ['$scope','$http','$location','mFactory', 
	
	function($scope,$http,$location,mFactory) {
		console.log("in CinemaCtrl");
		var me = this;
		$http.get('data/cinemas.json')
		.then(function(response) {
			$scope.CinemasData = response.data.cinemas;
		});

		$scope.getSelectedShows = function(cinema) {	//called on clicking get shows button on cinema.html
			console.log("getSelectedShows");
			mFactory.createMovieObj(cinema); //sending data to ShowsCtrl
			$location.url("/shows");
			console.log("sent");
		};

		// function setCurrentSelectedMovie(m) {
		// 	console.log("in setCurrentSelectedMovie fun() !",m.m_name);
		// 	mFactory.createMovieObj(m);
		// }

		// $scope.setCurrentSelectedMovie = setCurrentSelectedMovie;

	}
])

	