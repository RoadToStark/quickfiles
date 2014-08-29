var nodemailer = require('nodemailer');

var transporter = nodemailer.createTransport({
				    service: 'Gmail',
				    auth: {
				        user: 'quickfilestark@gmail.com',
				        pass: 'azerty31'
				    }
				});

var Mailer = {

	// create reusable transporter object using SMTP transport
	transporter : function() {
		nodemailer.createTransport({
		    service: 'Gmail',
		    auth: {
		        user: 'quickfilestark@gmail.com',
		        pass: 'azerty31'
		    }
		});
	},

	sendRegistrationConfirmation : function(user, res) {

		// setup e-mail data with unicode symbols
		var mailOptions = {
		    from: 'Quickfiles <no-answer@quickfiles.io>', // sender address
		    to: user.local.email, // list of receivers
		    subject: 'Registration confirmation ✔', // Subject line
		    text: 'Thank you for registering on quickfiles, you can start upload content right now !', // plaintext body
		    html: 'Thank you for registering on <b>quickfiles</b>, you can start upload content <b>right now</b> !' // html body
		};

		// send mail with defined transport object
		transporter.sendMail(mailOptions, function(err, info){
		    if (err){
		        return res.send(err);
		    } else{
		        return res.send({success: true, user: user});
		    }
		});
	}
};

module.exports = Mailer;

