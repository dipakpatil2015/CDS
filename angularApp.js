 
var app = angular.module('app', ['ngRoute','ngTable']);

app.config(['$routeProvider', function ($routeProvider) {
		$routeProvider.when('/', {
 // route for the home page
			templateUrl : 'Views/home.html',
			controller  : 'mainController'
		})
            .when('/about', {
 // route for the about page
			templateUrl : 'Views/about.html',
			controller  : 'aboutController'
		})
           
            .when('/requestlist', {
 // route for the about page
			templateUrl : 'Views/requestlist.html',
			controller  : 'requestlistController'
		})
			
			.when('/requestview', {
 // route for the about page
			templateUrl : 'Views/requestview.html',
			controller  : 'requestviewController'
		})

            
            .when('/contact', {
// route for the contact page
			templateUrl : 'pages/contact.html',
			controller  : 'contactController'
		});
		
			

	}]);
    

