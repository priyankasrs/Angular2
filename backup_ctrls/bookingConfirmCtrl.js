angular.module('movieApp')

.controller('bookingConfirmCtrl',function($scope,$localStorage) {
	//console.log("in bookingConfirmCtrl");
	$scope.getBookingHistory = function() {
		$scope.BH = $localStorage.bookedTickets;
		console.log($scope.BH);
	};
	//$scope.getBookingHistory();
})