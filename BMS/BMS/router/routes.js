var app = angular.module("bysApp", ['ui.router','ngStorage']);
app.config(function($stateProvider,$urlMatcherFactoryProvider,$urlRouterProvider) {
		$urlRouterProvider.otherwise('/home');
		$urlMatcherFactoryProvider.caseInsensitive(true);
		$stateProvider
	    .state('home', {
			url : '/home',
	        templateUrl : 'pages/home/home.html',
	        controller : 'homeCtrl2'
	    })
	    .state('movies', {
	    	url : '/movies',
	        templateUrl : 'pages/movies/movies.html',
	        controller : 'MoviesCtrl'
	    })
	    .state('shows', {
	    	url : '/shows',
	        templateUrl : 'pages/shows/shows.html',
	        controller : 'ShowsCtrl'
	    })
	    .state('seatselection', {
	    	url : '/seatlayout',
	        templateUrl : 'pages/seatlayout/seatlayout.html',
	        controller : 'SeatSelectionCtrl'
	    })
	    .state('booked', {
	    	url : '/bookingconfirmed',
	        templateUrl : 'pages/bookingconfirmed/bookingConfirmed.html',
	        controller : 'bookingConfirmCtrl'     
	    })
	    .state('bookinghistory', {
	    	url : '/bookinghistory',
	        templateUrl : 'pages/bookinghistory/bookingHistory.html',
	        controller : 'bookingHistoryCtrl'
	    })
	    .state('cinemas', {
	    	url : '/cinemas',
	        templateUrl : 'pages/cinema/cinemas.html',
	        controller : 'CinemasCtrl'
	    })
	    .state('buyTickets', {
	    	url : '/buyticket',
	    	templateUrl : 'pages/buyticket/buytickets.html',
	    	controller : 'BuyTicketsCtrl'
	    });
	    //$locationProvider.html5Mode(true);
	});