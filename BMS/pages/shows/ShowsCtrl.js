app
.controller('ShowsCtrl', ['$scope','$http' ,'mFactory',function($scope,$http,mFactory) {
	$http.get('data/showtiming_l.json').then(function(response) 
	{
		$scope.showsData = response.data.shows;
		$scope.cinemaselectedname=$scope.cinemaselected[0].c_name;
	});
 	$scope.showsDatadisp=function(show)
	{	
		console.log("in showsDatadisp");
		var filtered=[];
		var moviearr=[];
		angular.forEach($scope.MoviesData,function(md){
			moviearr[md.m_id]=md.m_name;
		});
		angular.forEach(show,function(showobj){
			angular.forEach(showobj.show_details,function(obj)
			 {
				 if($scope.parentvar.Selectedcinemaname===obj.c_name)
		 		 {	
		 		 	console.log("matched");
		 		 	$scope.cmname=[];
		 		 	$scope.cmname.push(showobj.m_id);
	 		 		obj.dcheck=showobj.date;
	 		 		var date1=new Date(showobj.date)
	 		 		obj.date=date1.getDate()+"/"+(date1.getMonth()+1)+"/"+date1.getFullYear();
	 		 		obj.mid=showobj.m_id;
	 		 		obj.moviename=moviearr[obj.mid];
	 		 		var checkid=obj.mid;
	 		 		filtered.push(obj);
		 		 }
			 });
		});
		return filtered;	
	}
	$scope.callshow=function(show)
	{	console.log("in callshow");
		var filtered=$scope.showsDatadisp(show);
		var filtered2=[];
		$scope.coshows=[0,0,0,0,0,0,0,0,0,0,0];

	    	angular.forEach(filtered, function(f2) {
	    		angular.forEach($scope.MoviesData, function(md) {
			 		if(md.m_name === f2.moviename)	
			 		{
			 			if($scope.coshows[f2.mid]==0)
			 				filtered2.push(md);
			 			$scope.coshows[f2.mid]++;
			 		}	
		 		});
	 		});
	    return filtered2;
	}

	$scope.setCurrentSelectedMovie = function(m) 
	{
		mFactory.createMovieObj(m);
	}
}])