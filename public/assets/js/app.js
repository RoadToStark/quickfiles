// Part of the app handling the login related actions
//var sp_login = angular.module('sp_login', ['ngRoute','loginCtrl','loginService']);

var quickfiles = angular.module('quickfiles', ['ngRoute','ngCookies','mainCtrl','fileService',
														 'userCtrl','userService','loginCtrl','loginService']);


quickfiles.config(function($routeProvider,$locationProvider) {

	// clean url later
	//$locationProvider.html5Mode(true);

	$routeProvider
		.when('/', {
			templateUrl : 'pages/home.html',
			controller  : 'loginController'
		})
		.otherwise({
			redirectTo	: '/'
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
		.when('/reset-form', {
			templateUrl : 'pages/reset-password-form.html',
			controller  : 'loginController'
		})
		.otherwise({
			redirectTo  : '/'
		});

});
.factory('authHttpResponseInterceptor',['$q','$location',function($q,$location){
    return {
        response: function(response){
            if (response.status === 401) {
                console.log("Response 401");
            }
            return response || $q.when(response);
        },
        responseError: function(rejection) {
            if (rejection.status === 401) {
                console.log("Response Error 401",rejection);
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

