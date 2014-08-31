var User = require('../models/user');
var mailer = require('../lib/mailer');

module.exports = function(router, passport) {

	// server routes ===========================================================

	// Authentication
	router.post('/login', 
				passport.authenticate('local-login'), function(req, res) {
					return res.send(req.user);
				});

	// Registration
	router.post('/signup', 
				passport.authenticate('local-login'), function(req, res) {
					mailer.sendRegistrationConfirmation(req.user, res);
					return res.send(req.user);
				});

	router.get('/logout', function(req, res) {
		req.logout();
		return res.send({success: true});
	});

};
