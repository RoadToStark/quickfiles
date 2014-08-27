var File = require('../models/files');
var formidable = require('formidable');
var util = require('util');

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

			return res.send({success: true, file: new_file});
		});

	/* Route to handle files upload
	router.post('/upload', function(req, res) {
		// Instantiate new formidable form handler
		var form = new formidable.IncomingForm();

		// Form config ===========================================
		if (req.body.user) {
			form.uploadDir = 'media/' + req.body.user._name + '/';
		} else {
			form.uploadDir = 'media/anonymous/';
		}

		form.keepExtensions = true;

		// Form handling ===========================================

		form.parse(req, function(err, fields, files) {
		    res.end(util.inspect({fields: fields, files: files}));
		    //We save a new file asynchronously in the database
		    form.on('fileBegin', function(name, file) {
	
		    });

		    form.on('progress', function(bytesReceived, bytesExpected) {
		    	console.log('Upload in progress : ' + bytesReceived * 100 / bytesExpected);
			});

			form.on('end', function() {
				console.log('Successfully uploaded !');
			});			
			
	    });

	}); */

};
