// public/js/controllers/mainCtrl.js
angular.module('mainCtrl', [])
	// inject the Comment service into our controller
	.controller('mainController', function($scope, $http, File) {
		// object to hold all the data for the new comment form
		$scope.FileData = {};

		// loading variable to show the spinning loading icon
		$scope.loading = true;

		// get all the comments first and bind it to the $scope.comments object
		// use the function we created in our service
		// GET ALL COMMENTS ====================================================
		File.get()
			.success(function(data) {
				$scope.File = data;
				$scope.loading = false;
			});

		// function to handle submitting the form
		// SAVE A COMMENT ======================================================
		$scope.submitfile = function() {
			$scope.loading = true;

			// save the comment. pass in comment data from the form
			// use the function we created in our service
			File.save($scope.fileData)
				.success(function(data) {

					// if successful, we'll need to refresh the comment list
					File.get()
						.success(function(getData) {
							$scope.file = getData;
							$scope.loading = false;
						});

				})
				.error(function(data) {
					console.log(data);
				});
		};

        //function to edit a File
        $scope.editfile = function(id,short) {
            $scope.loading = true;

            File.edit(id,short)
                .success(function(data) {

                    File.get()
                        .success(function(getData) {
                            $scope.file = getData;
                            $scope.loading = false;
                        });
                });
        };

		// function to handle deleting a comment
		// DELETE A COMMENT ====================================================
		$scope.deleteFile = function(id) {
			$scope.loading = true; 

			// use the function we created in our service
			File.destroy(id)
				.success(function(data) {

					// if successful, we'll need to refresh the comment list
					File.get()
						.success(function(getData) {
							$scope.file = getData;
							$scope.loading = false;
						});

				});
		};});
	
	