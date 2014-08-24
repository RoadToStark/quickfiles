var mongoose = require('mongoose');
var bcrypt = require('bcrypt-nodejs');

// Schema ======================
var userSchema = mongoose.Schema({

	username: String,
	
	local: {
		email: String,
		password: String
	}
});

// methods ======================

// Generating hash
userSchema.methods.generateHash = function(password) {
	return bcrypt.hashSync(password, bcrypt.genSaltSync(8), null);
};

// Checking if password is valid
userSchema.methods.validPassword = function(password) {
	return bcrypt.compareSync(password, this.local.password);
};

// Create and export the model
module.exports = mongoose.model('User', userSchema);
