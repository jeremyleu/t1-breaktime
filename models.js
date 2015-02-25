
var Mongoose = require('mongoose');


var UserSchema = new Mongoose.Schema({
	"email": String,
	"timerpref": String,
	"timeremaining": String,
	"currentlevel": Number,
	"currentxp": Number,
	"breaks": Number,
	"breaks_arr": [{"level": String,
	"enjoyedBreak": Boolean,
	"productive": Boolean}],
});

exports.User = Mongoose.model('User', UserSchema);


