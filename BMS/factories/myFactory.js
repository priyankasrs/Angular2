angular.module('bysApp')
.factory("mFactory" , function () {
	var myobj = {}
	return {
		createMovieObj : function(obj) {
			myobj = obj;
		},

		getMovieData : function() {
			return myobj;
		}
	}
})