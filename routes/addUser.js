var users = require("../users.json");

exports.addUser = function(req, res){
	var newUser = 
	{
		'email': req.body.emailfield,
		'password': req.body.passwordfield,
	};
	users["users"].push[newUser];
	console.log(newUser);
  	res.render('home', users);
};