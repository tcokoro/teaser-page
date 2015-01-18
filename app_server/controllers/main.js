var Mailgun = require('mailgun-js');
var api_key = 'key-93363c6d8b608d0bca9a5369084e2f13';
var domain = 'shypmate.com';
var from_who = 'info@shypmate.com';

module.exports.submit = function(req, res){
	var mailgun = new Mailgun({apiKey:api_key, domain:domain});	
	var data  = {
		from:from_who, 
		to:req.params.mail,
		subject: "Hello from Shypmate", 
		html: "Hello, thank you for your interests in shypmate. We promise never to spam you but we" +
			"will definitely let you know when we officially launch"
	};

	mailgun.messages().send(data, function(err, body) {
		//if there is an error, render the error page
		if (err) {
			res.render('error', {error: err});
			console.log('got an error:',err);
		} else {
			res.render('submitted', {email:req.params.mail});
			addToMailingList('awesome@shypmate.com', req.params.mail);
			console.log(body);
		}
	});
};

function addToMailingList(listName, email) {
		var mailgun = new Mailgun({apiKey: api_key, domain: domain});
    var members = [
      {
        address: email 
      }
    ];

    mailgun.lists(listName).members().add({ members: members, subscribed: true }, function (err, body) {
      console.log(body);
      if (err) {
						return "Error - check console.";
      }
      else {
				return "Added to mailing list";
      }
    });
}

/* GET home page */
module.exports.index = function(req, res){
    res.render('index', {title:'Shypmate'});
};


