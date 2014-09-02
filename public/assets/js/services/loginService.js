loginService = angular.module('loginService', [])

	loginService.factory('Login', function($http) {

		return {
			signin : function(loginForm) {
				return $http({
					method: 'POST',
					url: '/api/login',
					headers: {'Content-Type' : 'application/json'},
					data: loginForm
				});

			},
			logout : function() {

				return $http.get('/logout');
			},
			resetMail : function(mailPassReset) {
				return $http({
					method : 'POST',
					url : '/password/reset/mail',
					headers : {'Content-Type' : 'application/json'},
					data : mailPassReset
				});
			},
			resetPassword : function(resetForm) {
				return $http({
					method : 'POST',
					url : '/password/reset/new',
					headers : {'Content-Type' : 'application/json'},
					data : resetForm
				})
			}

		}

	});
	loginService.factory('Signup', function($http) {

		return {
			request : function(signupForm) {
				return $http({
					method: 'POST',
					url: '/api/signup',
					headers: {'Content-Type' : 'application/json'},
					data: signupForm
				});
			}
		}

	});
	