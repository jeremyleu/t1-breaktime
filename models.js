
var Mongoose = require('mongoose');


var UserSchema = new Mongoose.Schema({
	"email": String,
	//"registerDate": Date,
	"timerpref": String,
	"timeremaining": String,
	"currentlevel": Number,
	"currentxp": Number,
	"breaks": Number,
	"breaks_arr": [{"level": String,
	//"date": Date,
	"enjoyedBreak": Boolean,
	"productive": Boolean}],
});

exports.User = Mongoose.model('User', UserSchema);


