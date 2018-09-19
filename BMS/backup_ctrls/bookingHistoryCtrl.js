angular.module('movieApp')

.controller('bookingHistoryCtrl',['$scope', '$localStorage', function($scope,$localStorage) {
	console.log("in bookingHistoryCtrl");
	$scope.getBookingHistoryOnView = function() {

		console.log("in getBookingHistoryOnView()")
		$scope.displayArray = [];
		$scope.displayObj = {};
		$scope.BH = $localStorage.bookedTickets;
		// angular.forEach($scope.BH,function(inner) {
		// 	console.log("in inner");
		// 	angular.forEach(inner.seats, function(innerMost) {
		// 		$scope.displayObj = innerMost;
		// 		$scope.displayArray.push($scope.displayObj);
		// 		console.log("array : ",$scope.displayArray);
		// 	});
		// });
		console.log("BH : ",$scope.BH);
	};
}])