
module.exports = function(app) {

	// server routes ===========================================================

	// Example route 
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