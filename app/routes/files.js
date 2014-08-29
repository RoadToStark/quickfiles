var File = require('../models/files');
var formidable = require('formidable');
var fs = require('fs');
var uploader = require('../lib/uploader');

module.exports = function(router) {

	router.route('/files')

		// First route for file upload, create a new file with owner field and return it to the client
		.post(function(req, res) {

			var new_file = new File();

			if (req.body.user) {
				new_file.owner = req.body.user._id;
			} else {
				new_file.owner = req.body.user._id;
			}

			new_file.save(function(err) {
                        if (err)
                            res.send(err);
                    });

			return res.send({success: true, file: new_file});
		})

		.get(function(req, res) {

			File.find(function(err, files) {
				if (err) {
					res.send(err);
				}

				res.json(files);
			})
		});

	router.route('/files/:file_id')

		.put(function(req, res) {
			// Handle file update here
		})

		.delete(function(req, res) {
			File.remove({
				_id: req.params.file_id
			}, function(err, file) {
				if (err) {
					res.send(err);
				}

				if (fs.existsSync(file.path)) {
					fs.unlink(file.path);
				}

				res.json({ success: true, message: 'File successfully deleted'});
			});
		});


	// Route to handle files upload
	router.post('/upload', function(req, res) {

		// Instantiate new formidable form handler
		var form = new formidable.IncomingForm();

		// Form config ===========================================

		form.uploadDir = 'media/';
		form.keepExtensions = true;

		// Form handling ===========================================

		var final_file;
		var file_id;

		// Get the corresponding file in the database
	    form.on('file', function(name, file) {
			final_file = file;
	    });

	    form.on('field', function(name, value) {
	    	if (name == '_id') {
	    		file_id = value;
	    	}
	    });

	    // Here we move the files and set the new database object, then return file object to the client
	    form.on('end', function() {

	    	if (typeof file_id === 'undefined' || file_id == null) {
				return uploader.sendResult(res, null, null, 'ID not provided, please contact dev team :(');
			}

	    	if (typeof final_file === 'undefined' || final_file == null) {
	    		return uploader.sendResult(res, null, null, 'Please provide a file to upload :(');
	    	}

    		File.findById(file_id, function(err, file) {

    			if (err) {
    				return uploader.sendResult(res, final_file, file, err);
    			}

    			// We set attributes for the new file object
    			file.name = final_file.name;
    			file.type = final_file.type;
    			file.lastModified = final_file.lastModifiedDate;
    			file.size = final_file.size;
    			file.link = 'http://localhost:8080/api/' + file_id;

    			// If the file belongs to a registred user, we change the dir
    			var final_path;
    			var file_extension = file.name.split('.').pop();

	    		if (file.owner != 0) {
	    			final_path = form.uploadDir + file.owner + '/' + file._id + '.' + file_extension;

	    			// Create a new folder for the user if it does not exist
	    			if (!fs.existsSync(form.uploadDir + file.owner + '/')) {
					    fs.mkdirSync(form.uploadDir + file.owner + '/', 0755);
					}

	    		} else {
	    			final_path = form.uploadDir + '/anonymous/' + file._id + '.' + file_extension
	    		}

	    		// We adjust the rights on the uploaded file
	    		fs.chmod(final_file.path, 0755, function(err) {
	    			if (err) 
	    				return uploader.sendResult(res, final_file, file, err);

	    			// We move it to the new folder 
	    			fs.rename(final_file.path, final_path, function(err) {
		    			if (err) {
		    				return uploader.sendResult(res, final_file, file, err);
		    			}

		    			file.path = final_path;

		    			file.save(function(err) {
		    				if (err) {
		    					return uploader.sendResult(res, final_file, file, err);
		    				}

		    				return uploader.sendResult(res, final_file, file, null);
		    			});
		    		});	    			
	    		});
    		});
	    });
		
		// Here we go, we can process :D
		form.parse(req);

	}); 

	router.route('/:file_id')

		.get(function(req, res) {
			File.findById(req.params.file_id, function(err, file) {
				if (err) {
					return res.send(err);
				}

				res.download(file.path);
			})
		});


};
