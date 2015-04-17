var fs = require('fs');
var path = require('path');

module.exports.get_teaser_html =  function() {
	return readTeaserEmailContent();
}

function readTeaserEmailContent () {
	var teaser_path = path.join(__dirname, '../mail_templates', 'teaser.html');
	return  fs.readFileSync(teaser_path, 'utf8');
}

module.exports.api_key = process.env.API_KEY;
module.exports.domain = process.env.DOMAIN;
module.exports.from_who = 'Shypmate Welcomes <info@shypmate.com>';
module.exports.list_name = process.env.LIST_NAME;
module.exports.teaser_text = 'Thanks for signing up for Shypmate. We will be sure to keep you updated about our coming launch!';
module.exports.teaser_subject = 'Bargain shipping through a mate';


