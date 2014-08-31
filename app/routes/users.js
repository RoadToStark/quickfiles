var User = require('../models/user');
var File = require('../models/files');
var rmdir = require('rimraf');

module.exports = function(router, isLoggedIn) {

	router.route('/users')

		// Route to get all users
		.get(function(req, res) {
			User.find(function(err, users) {
				if (err) {
					return res.send(err);
				}

				res.json(users);
			});
		});

	// Routes for actions on a specific user
	router.route('/users/:user_id')

		.get(isLoggedIn, function(req, res) {
			User.findById(req.params.user_id, function(err, user) {
				if (err) {
					return res.send(err);
				}

				res.json(user);
			});
		})

		.put(isLoggedIn, function(req, res) {
			if (req.user._id != req.params.user_id) {
				return res.status(401).send("You can't change another user informations !");
			}

			User.findById(req.params.user_id, function(err, user) {
				if (err) {
					return res.send(err);
				}

				if (req.body.email) {
					user.local.email = req.body.email;
				}

				if (req.body.username) {
					user.username = req.body.username;
				}

				user.save(function(err) {
					if (err) {
						return res.send(err);
					}

					res.json({success: true, message: 'User successfuly updated', user: user});
				});
			});
		})

		// We delete our user and his files if any
		.delete(function(req, res) {
			User.remove({
				_id: req.params.user_id
			}, function(err, user) {
				if (err) {
					return res.send(err);
				}

				if (!user) {
					return res.json({ success: false, message: 'User not found'});
				}

				File.find({owner: req.params.user_id}, function(err, files) {
					if (err) {
						return res.send(err);
					}

					if (!files) {
						return res.json({ success: true, message: 'User successfully deleted'});
					}

					rmdir('media/' + req.params.user_id + '/' , function(err){
						if (err) {
							return res.send(err);
						}
					});

					for (var file in files) {
						File.remove({ _id : file._id }, function(err, file) {
							if (err) {
								return res.send(err);
							}
						});
					}

					res.json({ success: true, message: 'User successfully deleted'});
				});

			});
		});

	// Retrieve a user's files
	router.route('/users/:user_id/files')

		.get(isLoggedIn, function(req, res) {
			if (req.user._id != req.params.user_id) {
				return res.status(401).send('These files do not belong to you !');
			}

			File.find({
				owner: req.params.user_id
			}, function(err, files) {
				if (err) {
					return res.send(err);
				}

				return res.json(files);
			});
		});
};





