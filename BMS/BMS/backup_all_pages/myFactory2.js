angular.module("movieApp")
.factory("mFactory2" , function () {
	var myobj2 = {}
	return {
		createMovieObj2 : function(obj) {
			myobj2 = obj;
		},

		getMovieData2 : function() {
			return myobj;
		}
	}
})