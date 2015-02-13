var users = require("../users.json");

exports.logout = function(req, res){

	for(i = 0; i < users["users_arr"].length; i++)
	{
		users["users_arr"][i].current = false;
	}
  	res.render('index', users);
};