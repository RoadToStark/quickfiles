var File = require('../models/files');
var formidable = require('formidable');

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

		.get(function(req, res) {
			// Handle file download here
		})

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
		var final_file;
		var file_id;
		// Form handling ===========================================

		// Get the corresponding file in the database
	    form.on('file', function(name, file) {
			final_file = file;
	    });

	    form.on('field', function(name, value) {
	    	if (name == '_id') {
	    		file_id = value;
	    	}
	    });

	    form.on('end', function() {
	    	return res.send({success: true, file: final_file, id: file_id})
	    });

		form.parse(req, function(err, fields, files) {

			if (!fields._id) {
				return res.send({success: false, message: 'No file ID provided, please contact dev team'});
			}

	    });

	}); 

};
