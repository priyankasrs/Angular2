angular.module('movieApp')

.controller('BuyTicketsCtrl' , ["$scope","mFactory",function($scope, mFactory) {
	
	$scope.CurrentSelectedMovie = mFactory.getMovieData();
	
	console.log($scope.CurrentSelectedMovie.m_name);

	
	$scope.getSelectedDatesShow = function(x) {
		console.log("id and date, c_id : ",$scope.CurrentSelectedMovie.m_id,x);
		// for(var i=0;i<$scope.ShowsData.length;i++) {
		// 	if($scope.CurrentSelectedMovie.m_id)
		// }
	}

}])

	