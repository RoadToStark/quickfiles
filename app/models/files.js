
var mongoose = require('mongoose');

// Schema ======================
var fileSchema = mongoose.Schema({

	name: String,
	type: String,
	size: Number,
	path: String,
	lastModified: Date,
	owner: String,
	link: String

});

// methods ======================

// Create and export the model
module.exports = mongoose.model('File', fileSchema);
