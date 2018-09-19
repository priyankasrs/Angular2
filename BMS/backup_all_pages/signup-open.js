var myApp = angular.module("myApp", []);
 
myApp.controller ("myCtrl", ['$scope', function($scope){
  $scope.toggle = true;

  $scope.toggleFilter = function() {
                $scope.toggle = $scope.toggle === false ? true : false;
            }
}]);