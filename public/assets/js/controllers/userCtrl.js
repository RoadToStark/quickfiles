
angular.module('userCtrl', [])

	.controller('userController', function($scope, $http, User) {

		$scope.passwordForm = {};
		
		$scope.ChangePassword = function() {
			$scope.loading = true;

			User.modify($scope.passwordForm)
				.success(function(data) {
					$scope.loading = false;
					console.log('success');
					$scope.message = 'your password have been modified successfully';
				})
				.error(function(data) {
					console.log(data);
					$scope.errormsg = 'An error has occured';
				});
		};
		
        $scope.GetUser = function() {
            User.get()
            	.success(function(data) {
            		$scope.user = data;
            	});
        };

        $scope.GetUser();
	});