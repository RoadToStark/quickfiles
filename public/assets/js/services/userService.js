angular.module('userService',[])

	.factory('User', function($http) {

		return {


			modify : function(passwordForm) {
				return $http({
					method: 'POST',
					url: '/modify-password',
					headers: {'Content-Type' : 'application/json'},
					data: passwordForm
				});

			},
			get : function() {

				return $http.get('/user');
			}
		}

	});