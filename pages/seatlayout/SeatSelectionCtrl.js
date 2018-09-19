app
.controller('SeatSelectionCtrl', ['$state','$scope', '$localStorage', '$location', 'rowCalc', 'mFactory', 
	function($state,$scope,$localStorage,$location,rowCalc,mFactory) {

	$scope.showTime = mFactory.getMovieData();
	$scope.TotalPrice = $scope.showTime.price * $scope.selectedVal;
        	var seatProps = {
        		val: 0,
        		letter: 0,
        		check: false,
        		seat: false
        	};

        	function createSeats(rows, cols) {
        		var arr = [[]];
        		var seatIndex = 1;
        		for (var row = 0; row < rows; row++) {
        			arr[row] = [];
        			for(var col=0; col < cols; col++) {
        				var seat = angular.extend({}, seatProps, {
        					val: seatIndex,
        					letter: seatIndex
        				});
        				arr[row][col] = seat;
        				seatIndex++;
        			}
        		}
        		return arr;
        	}

        	$scope.obj = createSeats(12, 15);

		    $scope.quantities =[1,2,3,4,5]; //quantities are num of seats for dropdown on seatlayout page
        	var rowLetter = [];

        	$scope.isDisabled = false;
        	$scope.rows = $scope.obj;
        	$scope.rowLetter = rowCalc.rowStack($scope.obj);
        	$scope.selectedSeatCount = 0;

        	$scope.checkBlocked = function() {

        		console.log("in checkBlocked()");
        		$scope.displayArray = [];
        		$scope.displayObj = {};
				$scope.BH = $localStorage.bookedTickets; //BH : booking history
				$scope.array = [];
				angular.forEach($scope.BH,function(inner) {
					console.log("in inner");
					angular.forEach(inner.seats, function(innerMost) {
						$scope.displayObj = innerMost;
						$scope.displayArray.push($scope.displayObj);
						
					});
				});

				console.log("rows : ",$scope.rows);
				
				var dal = $scope.displayArray.length; //dal : display array length
				angular.forEach($scope.rows,function(r) {
					//console.log("in r");
					angular.forEach(r,function(r2) {
						//console.log("in r2");
						for(var i=0;i<dal;i++)
						{
							if(r2.val == $scope.displayArray[i])
							{
								//console.log($scope.displayArray[i]);
								r2.seat = true;
							}
						}
					});
				});
				
				
			};

			$scope.getNumber = function() {
			    var minNumber = 10000; // The minimum number you want
			    var maxNumber = 99999; // The maximum number you want
			    $scope.ranNum = Math.floor(Math.random() * (maxNumber + 1) + minNumber); // Generates random number
			    $scope.ranAlpha = "BMS";
			}
			
			// Calls on Seat Clicked
			$scope.clickSeat = function(currentSelectedSeat) {
			    //console.log("seleccted val : ",selectedVal);
			    
			    if (!currentSelectedSeat.seat && !$scope.isDisabled) 
			    {
			    	if (currentSelectedSeat.check) 
			    	{

			    		currentSelectedSeat.check = false;
			    		$scope.selectedSeatCount--;
			    	} 
			    	else if ($scope.selectedSeatCount < $scope.selectedVal) 
			    	{
			    		currentSelectedSeat.check = true;
			    		$scope.selectedSeatCount++;
			    	}
			    }
			    console.log("$scope.ranNum : ",$scope.ranNum);
			    

			};

			$scope.finalPrice=0;

			//$scope.msg="Coupon Applied Successfully ! Congratulations...";
			$scope.apply = function() {
				$scope.msg="";
				if($scope.Coupon!="" && $scope.Coupon=="SGZ50") {
					$scope.finalPrice = ($scope.showTime.price * $scope.selectedVal)/2;
					$scope.msg="Coupon Applied Successfully ! Congratulations...";
				}
				else if($scope.Coupon!="" && $scope.Coupon!="SGZ50") {
					$scope.finalPrice = $scope.showTime.price * $scope.selectedVal;
					$scope.msg = "Wrong Coupon Code ! Try again..";
					return 0;
				}
				else if($scope.Coupon=="") {
					$scope.finalPrice = $scope.showTime.price * $scope.selectedVal;
				}
				console.log("apply : ",$scope.finalPrice);
			}
			
			
			a = [];
			$scope.pay = function(x) {

				if($scope.Coupon!="" && $scope.Coupon=="SGZ50") {
					$scope.finalPrice = ($scope.showTime.price * $scope.selectedVal)/2;
				}
				else if($scope.Coupon!="" && $scope.Coupon!="SGZ50") {
					$scope.finalPrice = $scope.showTime.price * $scope.selectedVal;
				}
				else if($scope.Coupon=="") {
					$scope.finalPrice = $scope.showTime.price * $scope.selectedVal;
				}


				console.log("pay : ",$scope.finalPrice);
				$scope.getNumber();
				$scope.CurrentDate = new Date();

				console.log("in pay, x is : ",x);
				var t = $scope.rows;
				//console.log(t);
				$scope.arr = [];
				angular.forEach(t,function(u) {
					angular.forEach(u,function(v) {
						if(v.check===true)
						{
							$scope.arr.push(v.val);
						}
					})
				});



				$scope.finalObj = {};
				$scope.finalObj = $scope.showTime;
				$scope.finalObj = {
					"name" : $scope.showTime.name,
					"cinema" : $scope.showTime.cinema,
					"date" : $scope.showTime.date,
					"time" : $scope.showTime.time,
					"seats" : $scope.arr,
					"ppt" : $scope.showTime.price,
					"total" : $scope.finalPrice,
					"bookingDate" : $scope.CurrentDate,
		        		//"couponCode" : $scope.Coupon;
		        		"bookingID" : $scope.ranNum  
		        	};
		        	console.log("final obj :",$scope.finalObj);
		        	console.log("loop ends here !");
		        	console.log("a after click : ",$scope.arr);	

		        	if($localStorage.bookedTickets)
		        	{
					//console.log("already something there : ",$localStorage.bookedTickets);
					a = $localStorage.bookedTickets;
					a.push($scope.finalObj);
					$localStorage.bookedTickets = a;
				}
				else
				{
					//console.log("nothing there ! ");
					a.push($scope.finalObj);
					$localStorage.bookedTickets = a;	
				}
				$state.go('booked');		
			}



		}])

.service('rowCalc', function() {
	var rowLetter = [];

	this.rowStack = function(obj) {
		for (var i = 0, j = 65; i < obj.length; i++, j++) {
			rowLetter.push(j);
		}
		return rowLetter;
	}

});