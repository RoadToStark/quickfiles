var fs = require('fs');

var Uploader = {

	sendResult : function(res, old_file, file, err) {
		if (!old_file) {
			res.statusCode = 422;
			return res.send({
				success: false, 
				error: {
					message: err
				}
			});
		}

		if (err) {

			if (fs.existsSync(old_file.path)) {
				fs.unlink(old_file.path);
			}

			if (file && fs.existsSync(file.path)) {
				fs.unlink(file.path);
			}
			res.statusCode = 500;
			return res.send({
				success: false, 
				error: err
			});
		}

		return res.send(file);
	}
};

module.exports = Uploader;

