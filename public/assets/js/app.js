
var quickfiles = angular.module('quickfiles', ['ngRoute','ngCookies','mainCtrl','fileService',
														 'userCtrl','userService','loginCtrl','loginService']);


quickfiles.config(function($routeProvider, $locationProvider) {

	// clean url later
	//$locationProvider.html5Mode(true);

	$routeProvider

		.when('/', {
			templateUrl : 'pages/home.html',
			mainController : 'mainController'	
		})

		.when('/tables', {
			templateUrl : 'pages/tables.html',
			controller  : 'mainController'
		})
		.when('/change-password', {
			templateUrl : 'pages/change-password.html',
			controller  : 'userController'
		})
		.when('/reset', {
			templateUrl : 'pages/reset-password.html',
			controller  : 'loginController'
		})
		.when('/signup', {
			templateUrl : 'pages/signup.html',
			controller  : 'loginController'
		})
		.when('/login', {
			templateUrl : 'pages/login.html',
			controller  : 'loginController'
		})
		.when('/reset-form', {
			templateUrl : 'pages/reset-password-form.html',
			controller  : 'loginController'
		})
		.otherwise({
			redirectTo  : '/'
		});

});

quickfiles.factory('authHttpResponseInterceptor',['$q','$location',function($q,$location){
    return {
        response: function(response){
            return response || $q.when(response);
        },
        responseError: function(rejection) {
            if (rejection.status === 401) {
                $location.path('/login').search('returnTo', $location.path());
            }
            return $q.reject(rejection);
        }
    }
}])

.config(['$httpProvider',function($httpProvider) {
    //Http Intercpetor to check failures for xhr requests
    $httpProvider.interceptors.push('authHttpResponseInterceptor');
}]);



