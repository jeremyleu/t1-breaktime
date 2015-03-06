var users = require("../users.json");
var models = require('../models.js');
var thresholds = require("../thresholds.json");
var activities = require("../activities.json");
var moment = require('moment');
var momenttimezone = require('moment-timezone');


exports.completeActivity = function(req, res){
	if(!res.locals.user)
	{
		var message = "You must be logged in to do that!";
      	res.render('index', { message: message });
	}
	else
	{
		var query = {email : res.locals.user.username};

		models.User
	        .findOne(query)
	        .exec(afterQuery);
	    function afterQuery(err, users1) {
	    	if(err) console.log(err);
	    	users1.breaks++;
	    	users1.currentxp += parseInt(req.body.experienceGained, 10);
	    	console.log(new Date().getTimezoneOffset());
	    	var finishedBreak = 
	    	{
	    		"level": req.body.levelDone,
				"enjoyedBreak": req.body.satisfaction === "true",
				"productive": req.body.productivity === "true",
				"shortdescription": activities["activities_arr"][req.body.levelDone-1].log,
				"date": moment().tz(req.body.timezone).format(),
				"datestring": moment().tz(req.body.timezone).format("dddd, MMMM Do YYYY [at] h:mm a")
	    	}
	    	users1.breaks_arr.unshift(finishedBreak);
	    	

	        console.log(users1);
			if(thresholds["thresholds_arr"].length > users1.currentlevel && thresholds["thresholds_arr"][users1.currentlevel].threshold <= users1.currentxp)
			{
				users1.currentlevel++;
				users1.save();
				console.log("user leveled up: " + users1.email);
				res.render('congratulations', {user1: users1}), function(err, html) {
				    res.send();
				}
			}
			else
			{	
				users1.save();
				console.log("user did not level up: " + users1.email);
				res.render('home', {user1: users1}), function(err, html) {
				    res.send();
				}
			}
		
		
		}
	}
};
	/*for(i = 0; i < users["users_arr"].length; i++)
	{
		if(users["users_arr"][i].current)
		{
			users["users_arr"][i].breaks++;
			users["users_arr"][i].currentxp += parseInt(req.body.experienceGained, 10);
			var finishedBreak = 
			{
				"level": req.body.levelDone,
				"enjoyedBreak": req.body.satisfaction === "true",
				"productive": req.body.productivity === "true"
			}
			users["users_arr"][i].breaks_arr.push(finishedBreak);
			console.log(users["users_arr"][i]);
			if(thresholds["thresholds_arr"][users["users_arr"][i].currentlevel].threshold <= users["users_arr"][i].currentxp)
			{
				users["users_arr"][i].currentlevel++;
				res.render('congratulations', users);
			}
			else
				res.render('home', users);
		}
	}*/
