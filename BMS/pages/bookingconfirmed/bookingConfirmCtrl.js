app
.controller('bookingConfirmCtrl',function($scope,$localStorage) {
	$scope.getBookingHistory = function() {
		$scope.BH = $localStorage.bookedTickets;
	};
})