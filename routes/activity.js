var users = require("../users.json");
var models = require('../models.js');
var thresholds = require("../thresholds.json");
var activities = require("../activities.json");
var moment = require('moment');

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
	   		var breaks_arr = JSON.parse(JSON.stringify(users1.breaks_arr));
	   		console.log(breaks_arr[0]);
	   		var days_arr = [0,0,0,0,0];
	   		for(var i = 0; i < breaks_arr.length; i++)
	   		{
		   		if(moment().format("ddd") == moment(breaks_arr[i].date).format("ddd"))
	   			{
	   				days_arr[4] += (parseInt(activities.activities_arr[breaks_arr[i].level].experiencePoints, 10));
	   			}
	   			else if(moment().subtract(1,'days').tz(res.locals.timezone).format("ddd") == moment(breaks_arr[i].date).tz(res.locals.timezone).format("ddd"))
	   			{
	   				days_arr[3] += (parseInt(activities.activities_arr[breaks_arr[i].level].experiencePoints, 10));
	   			}
	   			else if(moment().subtract(2,'days').tz(res.locals.timezone).format("ddd") == moment(breaks_arr[i].date).tz(res.locals.timezone).format("ddd"))
	   			{
	   				days_arr[2] += (parseInt(activities.activities_arr[breaks_arr[i].level].experiencePoints, 10));
	   			}
	   			else if(moment().subtract(3,'days').tz(res.locals.timezone).format("ddd") == moment(breaks_arr[i].date).tz(res.locals.timezone).format("ddd"))
	   			{
	   				days_arr[1] += (parseInt(activities.activities_arr[breaks_arr[i].level].experiencePoints, 10));
	   			}
	   			else if(moment().subtract(4,'days').tz(res.locals.timezone).format("ddd") == moment(breaks_arr[i].date).tz(res.locals.timezone).format("ddd"))
	   			{
	   				days_arr[0] += (parseInt(activities.activities_arr[breaks_arr[i].level].experiencePoints, 10));
	   			}
	   		}
	   		console.log(days_arr);
	    	console.log("users: " + users1.email);
	        res.render('activity', {user1: users1, day1:days_arr[0], day2:days_arr[1], day3:days_arr[2], day4:days_arr[3], day5:days_arr[4] });
	    }
	}
};