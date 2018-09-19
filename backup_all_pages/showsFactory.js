angular.module("movieApp")
.factory("showsFactory" , function () {
	var myobj = {}
	return {
		createShowsObj : function(obj) {
			myobj = obj;
		},

		getShowsData : function() {
			return myobj;
		}
	}
})