
angular.module('loginCtrl', [])

	.controller('loginController', function($scope, $http, Login, Signup, $rootScope, $location) {

		$scope.loginForm = {};

		$scope.Log = function() {

			Login.log($scope.loginForm)
				.success(function(data) {
					$rootScope.alert = {
                        type: 'success',
                        message: 'Login successful !'
                    }

                    window.user = data;

					$location.url = '/';
				})
				.error(function(data) {
					$scope.errormsg = 'Mauvais Identifiant/Mot de passe';
				});
		};

        $scope.Logout = function() {
            $scope.loading = true;

            Login.Logout();

        };

        $scope.Reset = function() {

        	Login.resetMail($scope.mailPassReset)
        		.success(function() {
        			$scope.message = 'Votre mot de passe à été envoyé par email';
        		})
        		.error(function(data) {
        			$scope.errormsg = 'Le mail fourni ne correspond à aucune adresse présente dans la base de données';
        		});
        };

        $scope.ResetPassword = function() {

        	$scope.resetForm.token = $scope.token;
        	
        	Login.resetPassword($scope.resetForm)
        		.success(function() {
        			$scope.message = 'Votre mot de passe à été réinitialisé, vous pouvez maintenant vous connecter';
        		})
        		.error(function(data) {
        			$scope.errormsg = 'il y a eu une erreur, veuillez recommencer';
        		});
        };

        //function to get the token from the reset link depends on the way we'll reset passwords
        $scope.GetToken = function() {
        	$scope.location = $location;
    		$scope.$watch('location.search()', function() {
       	 		$scope.token = ($location.search()).token;
    		}, true);

		    $scope.changeTarget = function(name) {
		        $location.search('target', name);
		    }
		    console.log($scope.token);
        };
        //$scope.GetToken();

        $scope.Signup = function()
         {
            Signup.request($scope.signupForm)
                .success(function(data) {

                    $rootScope.alert = {
                        type: 'success',
                        message: 'We are proud to announce that we just successfully signed you up !'
                    }

                    window.user = data.user;

                    $location.url('/');
                })
                .error(function(data) {
                    $scope.error = data.error;
                });

        };

	});
	
	