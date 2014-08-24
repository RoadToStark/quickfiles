angular.module('fileService', [])

	.factory('File', function($http) {

		return {
			// get the files e.g. for history display
			get : function() {
				return $http.get('/files');
			},
			// Uploads a new file to the db
			upload : function(file) {
				return $http({
					method: 'POST',
					url: '/files',
					headers: { 'Content-Type' : 'application/json' },
					data: file
				});
			},

            /*edit a file
            edit : function(id) {

                return $http({
                    method:'PUT',
                    url: '/files'+id,
                    headers:{ 'Content-Type' : 'application/json' },
                    data: 
                });

            },
            */
			// destroy a file
			destroy : function(id) {
				return $http.delete('/files' + id);
			}
		}

	});
	