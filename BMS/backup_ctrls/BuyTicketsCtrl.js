angular.module('movieApp')

.controller('BuyTicketsCtrl' , ['$scope', '$http', 'mFactory', function($scope, $http, mFactory) {
	
	$scope.CurrentSelectedMovie = mFactory.getMovieData();
	console.log("csm : ",$scope.CurrentSelectedMovie);
	$scope.selectedDate = "2017-02-13";

	$scope.formatDate = function(d){
          var dateOut = new Date(d);
          return dateOut;
    };

	$http.get('data/showtiming_l.json')
	.then(function(response) {
		
		$scope.ShowData = response.data.shows;
		
		$scope.getSelectedDatesShow = function(x) {
			$scope.selectedDate = x;
			//console.log("clicked!, CurrentSelectedMovie ID : ",$scope.CurrentSelectedMovie.m_id," and selectedDate is : ",$scope.selectedDate);
			$scope.DatesShows();
			$scope.DatesShows2();
			//$scope.isActive = function(temp) {
			$scope.check=true;
			//$scope.val=x;
			//};
		}

		$scope.DatesShows = function() {
			angular.forEach($scope.ShowData, function(obj){
				if(obj.m_id===$scope.CurrentSelectedMovie.m_id && obj.date === $scope.selectedDate) {
				 	$scope.CurrentMovieShows = obj;
				}
			});
		}

		angular.forEach($scope.ShowData, function(obj) {
				if(obj.m_id===$scope.CurrentSelectedMovie.m_id && obj.date === $scope.selectedDate) {
				 		$scope.CurrentMovieShows = obj;
				}
		});

		$scope.DatesShows2 = function() {
			$scope.cinemasAvailable = [];
			angular.forEach($scope.ShowData, function(obj){
				if(obj.m_id===$scope.CurrentSelectedMovie.m_id && obj.date === $scope.selectedDate) {
				 	angular.forEach(obj.show_details, function(obj2){
				 		$scope.cinemasAvailable.push(obj2.c_name);
				 		//console.log("date : ",$scope.selectedDate," m_id : ",$scope.CurrentSelectedMovie.m_id)
				 		//$scope.CurrentMovieShows = obj;
				 		//console.log("obj2.c_name : ", obj2.c_name);
				 	});	
				 	//});
				}
			});
			$scope.getSelectedCinema = function(y) {
				//console.log("getSelectedCinema(y) : ",y.c_name);
				$scope.selectedCinema = y.c_name;
			};
			//console.log("$scope.cinemasAvailable", $scope.cinemasAvailable);
		}

	});

	$scope.showShowPrice = function(x) {

		var a = ["09:00 AM", "09:45 AM", "10:15 AM", "11:45 AM", "11:50 AM", "12:00 PM"];
		var b = ["12:15 PM", "12:45 PM", "02:15 PM", "02:45 PM", "04:45 PM", "09:45 PM"];
		var f = 0;
		$scope.price = 0;
		$scope.rs = "Rs ";
		$scope.rse = " /-";
		$scope.availability = "Available";
		for(var i=0;i<a.length;i++)
		{
			if(x === a[i])
			{
				$scope.price = 225;
				break;
			}	
			else if(x === b[i])
			{
				$scope.price = 275;	
				break;
			}
		}
		$scope.show = true;
	}

	$scope.hideShowPrice = function() {
		$scope.show = false;
		$scope.price = 0;
		$scope.rs = "Rs ";
		$scope.rse = " /-";
		$scope.availability = "Available";
	}

	$scope.selectSeat = function(showTime) {

		var movieTimeData = {};
		movieTimeData.time = showTime;
		movieTimeData.name = $scope.CurrentSelectedMovie.m_name;
		movieTimeData.cinema = $scope.selectedCinema;
		movieTimeData.date = $scope.selectedDate;
		movieTimeData.price = $scope.price;
		mFactory.createMovieObj(movieTimeData);
		//console.log(movieTimeData);
		//console.log("cinemas : ",$scope.CurrentMovieShows.show_details.c_name);
	}

	

}])
