var users = require("../users.json");
var models = require('../models.js');

exports.editPreferences = function(req, res){
	if(!res.locals.user)
	{
		var message = "You must be logged in to do that!";
      	res.render('index', { message: message });
	}
	else
	{
		var query = {email : res.locals.user.username};
		var update = {timerpref : req.body.timerinterval};

		models.User
	        .findOne(query)
	        .exec(afterQuery);
	    function afterQuery(err, users1) {
	    	users1.timerpref = req.body.timerinterval;
	    	users1.timeremaining = req.body.timerinterval;
	    	users1.save();
	        console.log(users1);
			if(err) console.log(err);
			console.log("user updated: " + users1.email);
			res.render('home', {user1: users1}), function(err, html) {
			    res.send();
			}
		}
	}
};
	/*var updatedUser;

	for(i = 0; i < users["users_arr"].length; i++)
	{
		if(users["users_arr"][i].current)
		{
			updatedUser = users["users_arr"][i];
			updatedUser.timerpref = req.body.timerinterval;
			updatedUser.timeremaining = req.body.timerinterval;
		}
	}

	var upsertData = updatedUser.toObject();
	delete upsertData._id;
	
	models.User
		.find({ "email" : res.locals.user.username})
		.update({_id: updatedUser.id}, upsertData, {upsert: true}, afterChange);

	function changeTimerPref(err, users)
	{
		if(err) console.log(err);
    	res.send();
	}

  	res.render('home', users);*/
