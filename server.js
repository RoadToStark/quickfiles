// Main file

// modules =================================================
var express        = require('express');
var app            = express();
var mongoose       = require('mongoose');
var bodyParser     = require('body-parser');
var methodOverride = require('method-override');
var passport	   = require('passport');

// configuration ===========================================
	
// config files
var db = require('./config/db');

// passport ================================================
require('./config/passport')(passport); // pass passport for configuration

var port = process.env.PORT || 8080; 
// mongoose.connect(db.url); // connect to our mongoDB database (uncomment after you enter in your own credentials in config/db.js)

app.use(bodyParser.json()); 
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); 
app.use(bodyParser.urlencoded({ extended: true })); 

app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request. simulate DELETE/PUT
app.use(express.static(__dirname + '/public')); // set the static files location 

// Database connection
mongoose.connect(db.url);

// routes ==================================================
require('./app/routes')(app, passport); // configure our routes


// start app ===============================================
app.listen(port);										
console.log('Magic happens on port ' + port); 			
exports = module.exports = app; 						