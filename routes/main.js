var ctrl = require('../app_server/controllers/main');

module.exports = function(app){
  app.get('/', ctrl.index);
}

/*
module.expores.mail = function(app){
	app.get('/mail/:mail', ctrl.mail);
}
*/
