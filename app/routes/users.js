var User = require('../models/user');

module.exports = function(router) {

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

				if (req.body.email) {
					user.local.email = req.body.email;
				}

				if (req.body.username) {
					user.username = req.body.username;
				}

				user.save(function(err) {
					if (err) {
						res.send(err);
					}

					res.json({success: true, message: 'User successfuly updated', user: user});
				});
			});
		})

		.delete(function(req, res) {
			User.remove({
				_id: req.params.user_id
			}, function(err, user) {
				if (err) {
					res.send(err);
				}

				res.json({ success: true, message: 'User successfully deleted'});
			});
		});

};

