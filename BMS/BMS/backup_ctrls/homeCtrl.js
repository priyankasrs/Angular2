angular.module('movieApp')
.controller('homeCtrl',['$scope','$http', function($scope,$http) {
	console.log("in homeCtrl");
	$scope.city=" Select Location ";
	$scope.changecity = function(f){
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
			console.log($scope.temp);

		});
	}
	
}])

