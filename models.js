
var Mongoose = require('mongoose');


var UserSchema = new Mongoose.Schema({
	"email": String,
	"registerdate": String,
	"registerdatestring": String,
	"timerpref": String,
	"timeremaining": String,
	"currentlevel": Number,
	"currentxp": Number,
	"breaks": Number,
	"breaks_arr": [{"level": String,
	//"date": Date,
	"enjoyedBreak": Boolean,
	"productive": Boolean,
	"shortdescription": String,
	"date": String,
	"datestring": String}],
});

exports.User = Mongoose.model('User', UserSchema);


