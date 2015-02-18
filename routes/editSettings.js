var users = require("../users.json");

exports.editPreferences = function(req, res){
	for(i = 0; i < users["users_arr"].length; i++)
	{
		if(users["users_arr"][i].current)
			users["users_arr"][i].timerpref = req.body.timerinterval;
	}

  	res.render('home', users);
};