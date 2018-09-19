app.controller('popup', ['$scope','$modalInstance',function ($scope, $modalInstance) {
	$scope.close = function () {
		$modalInstance.dismiss('cancel');
	};
}]);
