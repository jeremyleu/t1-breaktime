var users = require("../users.json");
var models = require('../models.js');

exports.view = function(req, res){
  	models.User
        .find({ email : res.locals.user.username})
        .exec(afterQuery);
    function afterQuery(err, users1) {
   		if(err) console.log(err);
    	console.log("users: " + users1[0].email);
        res.render('levels', {user1: users1[0]});
    }
};