angular.module('movieApp')
.controller('ShowsCtrl', ['$scope','$http','mFactory', 
	
	function($scope,$http,mFactory) {
		$scope.arr = []; //containg matching cinema names m_ids
		$scope.tarr = [];
		//console.log("in ShowsCtrl");
		$scope.cinema = mFactory.getMovieData(); //getting data sent from CinemaCtrl
		//console.log("cinema selected : ",$scope.cinema.c_name);
		//console.log($scope.ShowsData);

		//getting data from JSON file
		$http.get('data/showtiming_l.json') 
				.then(function(response) {
					$scope.ShowsData = response.data.shows;
					$scope.sl = $scope.ShowsData.length;
					//console.log("sl : ",$scope.sl);
					angular.forEach($scope.ShowsData, function(a) {
						//console.log("a.m_id ; ",a.m_id);
						 angular.forEach(a.show_details, function(b) {
						 	if($scope.cinema.c_name === b.c_name) {
						 		//$scope.tarr.push(a.m_id);
						 		$scope.tarr = [];
						 		console.log("a.m_id : ",a.m_id," b.timing : ",
						 			angular.forEach(b.timing,function(dat) 
						 								{ $scope.tarr.push(dat);  } 
						 			) 
						 		);
						 	}	//console.log("$scope.ShowsData.m_id : ", $scope.ShowsData.m_id)
						 	$scope.arr.push($scope.tarr);
						 })

					})
					console.log("$scope.arr : ",$scope.arr);

					$scope.myarr = []; //this will contain uniques m_ids
					var len=0;
					$scope.myarr.push($scope.arr[0])
					for(var i=0;i<$scope.sl;i++) {
						len = $scope.myarr.length;
						if($scope.myarr[len-1]!=$scope.arr[i]) {
							$scope.myarr.push($scope.arr[i]);
						}
					}
					console.log("myarr : ",$scope.myarr);

					$scope.temp2 = [];
					angular.forEach($scope.ShowsData, function(a) {
						//console.log("a : ",a.m_id);
						angular.forEach($scope.fa, function(b) {
							//console.log("b.m_id : ",b.m_id);
							if(a.m_id === b.m_id) {
								angular.forEach(a.show_details, function(c) {
									//console.log("c : ",c.timing);
									$scope.temp2.push(c.timing);
								})
							}
						})
					})

					//console.log("objects having these movies data only , $scope.fa : ",$scope.fa);
					//console.log("temp 2 : ",$scope.temp2);
					//console.log("muvIdArr : ",$scope.muvIdArr);
					//console.log("muvDateArr : ",$scope.muvDateArr);
				});

		$scope.muvIdArr = [];
		$scope.muvDateArr = [];
		$http.get('data/movies_l.json') 
			.then(function(response) {
				$scope.temp = [];
				$scope.fa = [];	//final array containg details of movies for selected cinema
				$scope.MoviesData = response.data.Movies;
				//console.log("All movie data: ",$scope.MoviesData);
				//console.log("selected cinema have m_id's : ",$scope.myarr);
				angular.forEach($scope.MoviesData, function(a) {
					angular.forEach($scope.myarr, function(b) {
						//console.log(b);
						 if(a.m_id === b) {
						 	$scope.fa.push(a);
						 }
					})
				})
				//console.log("fa : ");
				//console.log("fa 1 : ",$scope.fa);	
				angular.forEach($scope.fa,function(a) {
					$scope.muvDateArr.push(a.m_date);
					$scope.muvIdArr.push(a.m_id);

				})	


		});




		$scope.getShows = function() {
				var myarr = [];
				console.log("in getShows");
		}	
	
	}
])

	