app
.controller('CinemasCtrl', ['$scope','$http','$location','mFactory', 
	function($scope,$http,$location,mFactory) {
		var me = this;
		$http.get('data/cinemas.json')
		.then(function(response) {
			$scope.CinemasData = response.data.cinemas;
		});

		$scope.getSelectedShows = function(cinema) {	//called on clicking get shows button on cinema.html
			$scope.parentvar.Selectedcinemaname=cinema.c_name;
			console.log("in cinema $scope.parentvar.Selectedcinemaname:",$scope.parentvar.Selectedcinemaname);
			$scope.cinemaselected.push(cinema);
			$location.url("/shows");
		};
	}
])