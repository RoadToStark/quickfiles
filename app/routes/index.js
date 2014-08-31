module.exports = function(router, passport) {

	// Server routes ===========================================================
	require('./auth')(router, passport); // configure our routes for auth
	require('./users')(router, isLoggedIn); // configure our routes for users
	require('./files')(router); // configure our routes for files

	// Client routes ===========================================================
	router.get('*', function(req, res) {
		res.sendfile('./public/views/index.html'); // We load our public/index.html file
	})

};

var isLoggedIn = function isLoggedIn(req, res, next) {
					if (req.isAuthenticated()) {
						return next();
					} else {
						res.send(401);
					}
				}