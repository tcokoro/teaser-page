var teaser = require('../no-commit/teaser_info');
var Mailgun = require('mailgun-js');
var api_key = teaser.api_key;
var domain = teaser.domain;
var from_who = teaser.from_who;
var list_name = teaser.list_name;
var email_html = teaser.get_teaser_html();
var email_text = teaser.teaser_text;
var teaser_subject = teaser.teaser_subject;

function sendWelcomeMessage(email){
	var mailgun = new Mailgun({apiKey:api_key, domain:domain});	
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
			addToMailingList(email,list_name);
		}
	});
};

function addToMailingList(email, list_name) {
		var mailgun = new Mailgun({apiKey: api_key, domain: domain});
    var members = [
      {
        address: email 
      }
    ];

    mailgun.lists(list_name).members().add({ members: members, subscribed: true }, function (err, body) {
      if (err) {
				console.log("Error - check console.");
				console.log(err);
      }
      else {
				console.log(email, "Added to mailing list");
      }
    });
}

/* GET home page */
module.exports.index = function(req, res){
	res.render('index', {title:'Shypmate'});
};

/* send teaser email */
module.exports.submit = function(req, res){
	email = req.params.mail;
	sendWelcomeMessage(email);	
	sendJsonResponse(res, 200, {});
}

function sendJsonResponse(res, status, content) {
  res.status(200);
  res.json(content);
}
