app
.controller('BuyTicketsCtrl' , ['$scope', '$http', 'mFactory', function($scope, $http, mFactory) {
	$scope.toggleObject = {item: -1};
	$scope.CurrentSelectedMovie = mFactory.getMovieData();
	$scope.selectedDate = "2017-02-19";
	$scope.dateOutnew="";

	$scope.formatDate = function(d) {
		var dateOut = new Date(d);
		$scope.dateOutnew="";
		var today=new Date();
		var dd=dateOut.getDate();
		var dm=dateOut.getMonth();
		var dy=dateOut.getFullYear();
		var td=today.getDate();
		var tm=today.getMonth();
		var ty=today.getFullYear();
		if(dd==td&& dm==tm &&dy==ty)
		{
			$scope.dateOutnew="Today";
			console.log("in check",$scope.dateOutnew);
			return $scope.dateOutnew;
		}
		else
		{
			return dateOut;
		}
	};
	
	$http.get('data/showtiming_l.json')
	.then(function(response) {
		
		$scope.ShowData = response.data.shows;
		$scope.getSelectedDatesShow = function(x) {
			console.log("clicked!");
			$scope.selectedDate = x;
			$scope.DatesShows();
			$scope.DatesShows2();
			$scope.check=true;
			$scope.selectcity();
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
				 	});	
				 }
				});
			$scope.getSelectedCinema = function(y) {
				$scope.selectedCinema = y.c_name;
			};
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
	}

	$scope.dispdate=function(dates)
	{
		$scope.fdate=false;
		var filtered=[];
		$scope.dateOutnew="";
		var today=new Date();
		var td=today.getDate();
		var tm=today.getMonth();
		var ty=today.getFullYear();
		angular.forEach(dates,function(d){
			var dateOut = new Date(d);
			var dd=dateOut.getDate();
			var dm=dateOut.getMonth();
			var dy=dateOut.getFullYear();
			if(dd>=td&&dm>=tm&&dy>=ty)
			{
				filtered.push(d);
			}
		})
		return filtered;
	}

	$scope.selectcity=function(){

		$http.get('data/cinemas.json')
		.then(function(response) {
			$scope.citycinemas=[];
			$scope.STATUS="";
			$scope.cinemasdata = response.data.cinemas;
			angular.forEach($scope.cinemasdata,function(M)
			{
				if(M.c_city===$scope.city)
				{
					angular.forEach($scope.CurrentMovieShows.show_details,function(cm)
					{
						if(cm.c_name===M.c_name)
						{
							$scope.citycinemas.push(cm);
						}
					})
				}
			})
			if($scope.citycinemas.length==0)
			{
				$scope.STATUS="No shows available";
			}
		});
	}
}])