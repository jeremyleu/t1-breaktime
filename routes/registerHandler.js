var users = require("../users.json");

exports.addUser = function(req, res){
	var newUser = 
	{
		"email": req.body.email,
		"password": req.body.password,
		"timerpref": req.body.timerinterval,
		"current": true
	};
	console.log(newUser);
	users["users_arr"].push(newUser);
	console.log(users["users_arr"]);
  	res.render('home', users);
};