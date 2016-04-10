var controllers = require('./controllers'); 
var mid = require('./middleware');
var path = require("path");

var router = function(app){
	app.get("/login", mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
	app.post("/login", mid.requiresSecure, mid.requiresLogout, controllers.Account.login);
	app.get("/signup", mid.requiresSecure, mid.requiresLogout, controllers.Account.signupPage);
	app.post("/signup", mid.requiresSecure, mid.requiresLogout, controllers.Account.signup);
	app.get("/logout", mid.requiresLogin, controllers.Account.logout);
	app.get("/maker", mid.requiresLogin, controllers.Domo.makerPage);
	app.post("/maker", mid.requiresLogin, controllers.Domo.make);
	app.get("/", mid.requiresSecure, mid.requiresLogout, controllers.Account.loginPage);
	app.get("/domoPage", mid.requiresLogin, controllers.Domo.domoPage);
	app.get("/game", function(req,res){res.sendFile(path.join(__dirname + '/../client/index.html'));});
};

module.exports = router;