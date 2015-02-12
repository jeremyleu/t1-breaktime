var users = require("../users.json");

exports.addUser = function(req, res){
	var newUser = 
	{
		"email": req.body.email,
		"password": req.body.password,
		"timerpref": req.body.timerinterval,
		"timeremaining": req.body.timerinterval,
		"currentlevel": 1,
		"current": true
	};
	console.log(newUser);
	console.log(users["users_arr"]);
	for(i = 0; i < users["users_arr"].length; i++)
	{
		users["users_arr"][i].current = false;
	}
	users["users_arr"].push(newUser);

  	res.render('home', users);
};