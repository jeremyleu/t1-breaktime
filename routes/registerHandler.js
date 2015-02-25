var users = require("../users.json");
var models = require('../models');

exports.addUser = function(req, res){
	var newUser = 
	{
		"email": req.body.email,
		"timerpref": req.body.timerinterval,
		"timeremaining": req.body.timerinterval,
		"currentlevel": 1,
		"currentxp": 0,
		"breaks": 0,
		"breaks_arr": [

		],
		"current": true
	};
	console.log(newUser);
	console.log(users["users_arr"]);
  	/*var newProject = new models.Project({
    "title": form_data.project_title,
    "date": form_data.date,
    "summary": form_data.summary,
    "image": form_data.image_url});*/
	//var newUser1 = new models.User(newUser);
  	//newUser1.save(afterSave);
	function afterSave(err, projects) {
		if(err) console.log(err);
		console.log("stjkdsflkjdsf");
		//res.send();
	}
	for(i = 0; i < users["users_arr"].length; i++)
	{
		users["users_arr"][i].current = false;
	}
	users["users_arr"].push(newUser);

  	res.render('home', users);
};