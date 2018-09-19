app
.controller('bookingHistoryCtrl',['$scope', '$localStorage', function($scope,$localStorage) {
	console.log("in bookingHistoryCtrl");
	$scope.BH = $localStorage.bookedTickets;
	var objx=[];
	var dt1;
	var dt2;
	$scope.flag=0;
	$scope.searchBy = "Search by :";
	$scope.changeFunc1=function(x) {
		$scope.searchBy = x;
		$scope.selectedValue=x;
	    console.log("changefunc",x);
	    $scope.allfl=0;
		if($scope.selectedValue=="Today")
		{
			$scope.sdt=new Date();
			$scope.edt=new Date();
			$scope.sdt.setDate($scope.sdt.getDate() - 1);
			console.log("Start:",$scope.sdt,"end:",$scope.edt);
		}
		else if($scope.selectedValue=="Yesterday")
		{
			$scope.sdt=new Date(); 
			$scope.edt=new Date(); 
			$scope.sdt.setDate($scope.sdt.getDate() - 2);
			$scope.edt.setDate($scope.edt.getDate() - 1);
			console.log("Start:",$scope.sdt,"end:",$scope.edt);
		}
		else if($scope.selectedValue=="Last Week")
		{
			$scope.sdt=new Date();
			$scope.edt=new Date();
			$scope.sdt.setDate($scope.sdt.getDate() - 7);
			console.log("Start:",$scope.sdt,"end:",$scope.edt);
		}		
		else if($scope.selectedValue=="all")
		{
			console.log("INALL");
			$scope.allfl=1;
		}
	}

	$scope.hasdate=function(BH) {
		var filtered = [];
		if($scope.allfl==0)
		{
		    angular.forEach(BH, function(el){
		    	$scope.checkdate=new Date(el.date);
		    	console.log("$scope.checkdate:",$scope.checkdate,"$scope.sdt:",$scope.sdt,"$scope.edt:",$scope.edt)
		          if($scope.checkdate > $scope.sdt && $scope.checkdate <=$scope.edt) {
			        filtered.push(el);
			      }
		    });
		}
		else
		{
			filtered=BH;
		}
	    return filtered;
	}

	$scope.sendobj=function(obj)
	{
		$scope.flag=0;	
		objx=obj;
        dt1 = new Date(obj.date);
        dt2 = new Date();
      
      	if(dt2>dt1)
      	{
           	console.log("greater");
	      	$scope.errormsg="Cannot Cancel this Ticket ! Cancellation can be done only 24 hours before the show !";
	      	$scope.confirm="OK";
	      	$scope.flag=1;
	    }
      	else
      	{
      		console.log("not greater");
    		$scope.errormsg="Are you sure you want to cancel this booking? Remember: The ticket payment will not be refunded.";
			$scope.confirm="Confirm cancellation";
		}
	}

	console.log("on scope: ",$scope.cinedate);
	
	$scope.cancelbook=function() {
		console.log("HIIIII...BH : ",$scope.BH);
		angular.forEach($scope.BH,function(obj) {
			console.log(objx.bookingID);
			if(obj.bookingID===objx.bookingID&&$scope.flag==0)
			{
				$scope.BH.splice( $scope.BH.indexOf(obj), 1 );
				objx=[];
			}
		});
	};

	$scope.getBookingHistoryOnView = function() {
		console.log("in getBookingHistoryOnView()")
		$scope.displayArray = [];
		$scope.displayObj = {};
	};
}])