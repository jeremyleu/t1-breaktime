var users = require("../users.json");
var models = require('../models.js');

exports.view = function(req, res){
	if(!res.locals.user)
	{
		var message = "You must be logged in to access that page.";
      	res.render('index', { message: message });
	}
	else
	{
	  	models.User
	        .findOne({ email : res.locals.user.username})
	        .exec(afterQuery);
	    function afterQuery(err, users1) {
	   		if(err) console.log(err);
	    	console.log("users: " + users1.email);
	        res.render('levels-locks', {user1: users1});
	    }
	}
};