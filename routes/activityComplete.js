var users = require("../users.json");
var thresholds = require("../thresholds.json");


exports.completeActivity = function(req, res){
	for(i = 0; i < users["users_arr"].length; i++)
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
	}

};