var teaser = require('../no-commit/teaser_info');
var Mailgun = require('mailgun-js');
var api_key = teaser.api_key;
var domain = teaser.domain;
var from_who = teaser.from_who;
var list_name = teaser.list_name;
var email_html = teaser.get_teaser_html();
var email_text = teaser.teaser_text;
var teaser_subject = teaser.teaser_subject;

function sendWelcomeMessage(email, mailgun) {
	var data  = {
		from:from_who, 
		to:email,
		subject: teaser_subject, 
		html: email_html,
		text: email_text
	};

	mailgun.messages().send(data, function(err, body) {
		if (err) {
			console.log('got an error:',err);
		} else {
			addToMailingList(email,list_name, mailgun);
		}
	});
};

function addToMailingList(email, list_name, mailgun) {
	var members = [
		{
			address: email 
		}
	];

	mailgun.lists(list_name).members().add({ members: members, subscribed: true }, function(err, body) {
		if (err) {
			console.log("Error - check console.");
			console.log(err);
		}
		else {
			console.log(email, "Added to mailing list");
		}
	});
}

function isNewUser(email, res) {
	var mailgun = new Mailgun({ apiKey:api_key, domain:domain });	

	mailgun.lists(list_name).members(email).info(function(err, body) {
		try {
			if (body['member']['subscribed']) {
				//let user know email is already added
				sendJsonResponse(res, 200, { 'msg':"Thanks Mate. You've already signed up." });
			}
		} catch (error) {
			//add new email
			sendWelcomeMessage(email, mailgun);
			sendJsonResponse(res, 200, { 'msg':'Thanks for signing up mate!' });
		}
	});
}


/* GET home page */
module.exports.index = function(req, res) {
	res.render('index', { title:'Shypmate' });
};

/* send teaser email */
module.exports.submit = function(req, res) {
	email = req.params.mail;
	isNewUser(email, res);
}

/* GET FAQ page */
module.exports.faq = function(req, res) {
	res.render('faq');
}

function sendJsonResponse(res, status, content) {
  res.status(200);
  res.json(content);
}
