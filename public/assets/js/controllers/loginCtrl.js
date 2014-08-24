
angular.module('loginCtrl', [])

	.controller('loginController', function($scope, $http, Login, Signup, $location) {

		$scope.loginForm = {};

		// loading variable to show the spinning loading icon
		$scope.loading = true;


		$scope.Log = function() {
			$scope.loading = true;

			Login.log($scope.loginForm)
				.success(function(data) {
					$scope.loading = false;
					document.location.href = '/';
				})
				.error(function(data) {
					console.log(data);
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

        $scope.Signup = function() {
            $scope.loading = true;

            Signup.request($scope.signupForm)
                .success(function(data) {
                    $scope.loading = false;
                    document.location.href = '/';
                })
                .error(function(data) {
                    console.log(data);
                    $scope.errormsg = 'Mauvais Identifiant/Mot de passe';
                });

        };

	});
	
	