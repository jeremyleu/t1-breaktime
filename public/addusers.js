var username = require("username.json");


exports.addUser = function(req, res) {    
	 var newUser= 
 {
 'email': req.query.email,
 'password': req.query.password,
 'work hours begin': ,
 'work hours end': ,
 'break length': ,
 'Alarm Type': 
 };
	data["users"].push(newUser);
	res.render('settings', users);	
 };