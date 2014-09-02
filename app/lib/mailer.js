var nodemailer = require('nodemailer');

// create reusable transporter object using SMTP transport
var transporter = nodemailer.createTransport({
				    service: 'Gmail',
				    auth: {
				        user: 'quickfilestark@gmail.com',
				        pass: 'azerty31'
				    }
				});

var Mailer = {

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
		transporter.sendMail(mailOptions);
	}
};

module.exports = Mailer;

