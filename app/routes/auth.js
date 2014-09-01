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
	router.post('/signup', function (req, res, next) {
		passport.authenticate('local-signup', function(err, user, info) {
			if (err) {
				return res.send(err);
			}

			if (!user) {
				return res.status(422).send({ error : info.message });
			}

			// We set the user in the request here
			req.logIn(user, function(err) {
			    if (err) { 
			    	return res.send(err); 
			    }

			    mailer.sendRegistrationConfirmation(req.user, res);
			});
	
		})(req, res, next);

	});
	
	router.get('/logout', function(req, res) {
		req.logout();
		return res.send({success: true});
	});

};
