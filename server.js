// Main file

// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var passport	   = require('passport');
var User 		   = require('./app/models/user');

// configuration ===========================================
	
var db = require('./config/db');
require('./config/passport')(passport); // pass passport for configuration

var port = process.env.PORT || 8080; 

app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location 

// Database connection
mongoose.connect(db.url);

// Router config ==================================================

var router = express.Router(); // Create instance of express router

// We get the current user if any and set req.user 
router.use(function(req, res, next) {
	if (req.body.user) {
		User.findOne(req.body.user._id, function(err, user) {
			if (err) {
				return res.send(err);
			}

			if (user) {
				req.user = user;
				next();
			}
		});
	} else {
		next();
	}
});

app.use('/api', router); // Add api prefix

require('./app/routes/index')(router, passport); // configure our routes for users

// start app ===============================================
app.listen(port);										
console.log('Magic happens on port ' + port); 			
exports = module.exports = app; 						