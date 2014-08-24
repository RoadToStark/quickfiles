
module.exports = function(app, passport) {

	// server routes ===========================================================

	// Authentication
	app.post('/login', function(req, res, next) {
		passport.authenticate('local-login', function(err, user, info) {
			if (err) {
				return next(err);
			}

			if (!user) {
				return res.send({ success: false, message: info.message});
			}

			return res.send({success: true, user: user});
		})(req, res, next);
	});

	app.post('/signup', function(req, res, next) {
        passport.authenticate('local-signup', function(err, user, info) {

            if (err) {
                return next(err);
            }

            if (!user) {
                return res.send({success: false, message: info.message});
            }

            return res.send({success: true, user: user});
        })(req, res, next);
    });

	app.get('/logout', function(req, res) {
		req.logout();
	});


	// Users
	app.get('/users', function(req, res) {
		User.find(function(err, users) {
			if (err) {
				res.send(err);
			}
			res.json(users);
		});
	});

	// Other api routes here

	// Client routes ===========================================================
	app.get('*', function(req, res) {
		res.sendfile('./public/views/index.html'); // We load our public/index.html file
	})

};

