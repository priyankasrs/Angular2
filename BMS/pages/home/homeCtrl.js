app
.controller('homeCtrl',['$scope','$http', function($scope,$http) {

	console.log("in homeCtrl");
	$scope.city=" Select Location ";
    $scope.cinemaselected=[];
    $scope.cnames=[];
    $scope.parentvar={};
    $scope.parentvar.Selectedcinemaname="";
	$scope.changecity = function(f){

		var setW = document.getElementById("cityDivID").offsetWidth;
		console.log(setW);
		document.getElementById("dropdownDivID").setAttribute("style",setW);

		$scope.city=f;
		$http.get('data/movies_l.json')
			.then(function(response) {
				//$scope.changecity($scope.city);
				$scope.temp=[];
				console.log($scope.city);
				$scope.MoviesData = response.data.Movies;
				angular.forEach($scope.MoviesData,function(M)
				{
					angular.forEach(M.m_loc,function(l){
						if(l===$scope.city)
						{
								$scope.temp.push(M);
						}

					})
				})
				console.log("temp : ",$scope.temp);
		});
	}

	$scope.cityhover = function() {
		var setW = document.getElementById("cityDivID").offsetWidth;
		console.log(setW);
		document.getElementById("dropdownDivID").setAttribute("style",setW);	
	}
	
	
}])

.controller('homeCtrl2',['$scope','$http', function($scope,$http) {
	$scope.ttemp=[];
	console.log("in home2");
	// this fun() will be called On page Load
	$scope.homeMov = function() {
		console.log("ttemp befor get : ",$scope.ttemp);
		$http.get('data/movies_l.json')
			.then(function(response) {
				$scope.MD = response.data.Movies;
				angular.forEach($scope.MD,function(M)
				{
					$scope.ttemp.push(M);
				});
				console.log("ttemp in : ",$scope.ttemp);
		});
	};

	console.log("tT out : ",$scope.ttemp);
}]);