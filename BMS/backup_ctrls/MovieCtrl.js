app
.controller('MoviesCtrl', ["$scope","$http","$location","mFactory" , 
	function($scope,$http,$location,mFactory) {
	console.log("in MoviesCtrl");
	var radionew=$scope.radioval;
	var radionew1=$scope.radioval1;
	console.log(radionew);
	console.log(radionew1);
	$scope.item="default";
	$scope.status="Tickets not available in your city";

$scope.set=function()
{
	if(l===city)
	$scope.status="Tickets available in your city";
console.log("in set");
}
	if($scope.item==="Romance"||$scope.item==="Action"||$scope.item==="Crime Thriller"||$scope.item==="Drama")
		{radioval=$scope.item;
		}
	if($scope.item==="Hindi"||$scope.item==="English"||$scope.item==="Tamil")
		{
			console.log("in lang");
			radioval1=$scope.item;

		}
		console.log("hi",$scope.city);

	var me = this;
	 $scope.$on('someEvent', function(e) {  
        $scope.$parent.msg = $scope.get();            
    });

    $scope.get = function(){
        return "LOL";    
    }
	// $http.get('data/movies_l.json')
	// 	.then(function(response) {
	// 		//$scope.changecity($scope.city);
	// 		$scope.temp=[];
	// 		console.log($scope.city);
	// 		$scope.MoviesData = response.data.Movies;
	// 		angular.forEach($scope.MoviesData,function(M)
	// 		{
	// 			angular.forEach(M.m_loc,function(l){
	// 				if(l===$scope.city)
	// 				{
	// 						$scope.temp.push(M);
	// 				}

	// 			})
	// 		})
	// 		console.log($scope.temp);

	// 	});

		function setCurrentSelectedMovie(m) {
			console.log("in setCurrentSelectedMovie fun() !",m.m_name);
			mFactory.createMovieObj(m);
		}

	
    $scope.showModal = function(movie){
    	$scope.selectedMovie = movie;

    }
	$scope.setCurrentSelectedMovie = setCurrentSelectedMovie;
	
	console.log($scope.selected);
}])

	