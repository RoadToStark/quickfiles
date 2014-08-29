var LocalStrategy   = require('passport-local').Strategy;
var User       		= require('../app/models/user');

module.exports = function(passport) {

    // LOCAL SIGNUP ============================================================

    passport.use('local-signup', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback
    }, function(req, email, password, done) {
        // asynchronous
        // User.findOne wont fire unless data is sent back
        process.nextTick(function() {

    		// find a user whose email is the same as the forms email
    		// we are checking to see if the user trying to login already exists
            User.findOne({ 'local.email' :  email }, function(err, user) {
                // if there are any errors, return the error
                if (err) {
                    return done(err);
                }

                // check to see if theres already a user with that email
                if (user) {
                    return done(null, false, {message : 'That email is already taken.'});
                } else {

    				// if there is no user with that email
                    // create the user
                    var newUser            = new User();

                    // set the user's local credentials
                    newUser.local.email    = email;
                    newUser.local.password = newUser.generateHash(password);

    				// save the user
                    newUser.save(function(err) {
                        if (err) {
                            throw err;
                        }

                        return done(null, newUser);
                    });
                }
        });    

        });

    }));

    // LOCAL LOGIN ============================================================

    passport.use('local-login', new LocalStrategy({
        // by default, local strategy uses username and password, we will override with email
        usernameField : 'email',
        passwordField : 'password',
        passReqToCallback : true // allows us to pass back the entire request to the callback

    }, function(req, email, password, done) {

        User.findOne({ 'local.email' : email }, function(err, user) {
            //if there are any errors, return the error
            if (err) {
                return done(err);
            }

            if (!user) {
                return done(null, false, {message: 'No user found'});
            }

            if (!user.validPassword(password)) {
                return done(null, false, {message: 'Invalid password'});
            }

            return done(null, user);
        });
    }));

};
