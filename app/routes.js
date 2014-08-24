var User = require('../app/models/user');

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

            return res.send({success: true, user: user});
        })(req, res, next);
    });

	router.get('/logout', function(req, res) {
		req.logout();
	});


	// Users
	router.route('/users')

		// Routes to get all users
		.get(function(req, res) {
			User.find(function(err, users) {
				if (err) {
					res.send(err);
				}

				res.json(users);
			});
		});

	router.route('/users/:user_id')

		// Routes for actions on a specific user
		.get(function(req, res) {
			User.findById(req.params.user_id, function(err, user) {
				if (err) {
					res.send(err);
				}

				res.json(user);
			});
		})

		.put(function(req, res) {
			User.findById(req.params.user_id, function(err, user) {
				if (err) {
					res.send(err);
				}

				user.local.email = req.body.email;
				user.username = req.body.username;

				user.save(function(err) {
					if (err) {
						res.send(err);
					}

					res.json({success: true, message: 'User successfuly updated', user: user});
				});
			});
		});

	// Other api routes here

	// Client routes ===========================================================
	router.get('*', function(req, res) {
		res.sendfile('./public/views/index.html'); // We load our public/index.html file
	})

};

