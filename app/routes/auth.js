var User = require('../models/user');
var mailer = require('../lib/mailer');

module.exports = function(router, passport) {

		// server routes ===========================================================

	// Authentication
	router.post('/login', function(req, res, next) {
		passport.authenticate('local-login', function(err, user, info) {
			if (err) {
				return next(err);
			}

			if (!user) {
				res.statusCode = 401;
				return res.send({ success: false, message: info.message});
			}

			return res.send({success: true, user: user});
		})(req, res, next);
	});

	router.post('/signup', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info) {

            if (err) {
                return next(err);
            }

            if (!user) {
            	res.statusCode = 401;
                return res.send({success: false, message: info.message});
            }

            mailer.sendRegistrationConfirmation(user, res);
          
        })(req, res, next);
    });

	router.get('/logout', function(req, res) {
		req.logout();
	});

};
