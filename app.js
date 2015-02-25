
/**
 * Module dependencies.
 */

var express = require('express');
var bodyParser = require('body-parser');
var http = require('http');
var path = require('path');
var handlebars = require('express3-handlebars')
var mongoose = require('mongoose');
var passport = require('passport');
var routes = require('./routes');
var flash = require('connect-flash');
var LocalStrategy = require('passport-local').Strategy;


var local_database_name = 'breaktime';
var local_database_uri  = 'mongodb://localhost/' + local_database_name
var database_uri = process.env.MONGOLAB_URI || local_database_uri
mongoose.connect('mongodb://localhost/passport_local_mongoose');

var index = require('./routes/index');
var home = require('./routes/home');
var activity = require('./routes/activity');
var breaktime = require('./routes/breaktime');
var help = require('./routes/help');
var levels = require('./routes/levels');
//var register = require('./routes/register');
var settings = require('./routes/settings');
var editSettings = require('./routes/editSettings');
var activityComplete = require('./routes/activityComplete');
var registerHandler = require('./routes/registerHandler');
//var logout = require('./routes/logout');
var congratulations = require('./routes/congratulations');

// Example route
// var user = require('./routes/user');

var app = express();
app.use(bodyParser.urlencoded({ extended: false }));



// all environments
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.engine('handlebars', handlebars());
app.set('view engine', 'handlebars');
app.use(express.favicon());
app.use(express.logger('dev'));
app.use(express.json());
app.use(express.urlencoded());
app.use(express.bodyParser());
app.use(express.methodOverride());
app.use(express.cookieParser('Intro HCI secret key'));
app.use(express.session());
app.use(passport.initialize());
app.use(passport.session());
app.configure(function(){
	app.use(express.cookieParser('keyboard cat'));
    app.use(express.session({ cookie: { maxAge: 60000 }}));
    app.use(flash());
})
app.use(function(req, res, next) {
	res.locals.user = req.user;
	next();
});

app.use(express.static(path.join(__dirname, 'public')));

// development only
if ('development' == app.get('env')) {
  app.use(express.errorHandler());
}

app.configure('development', function(){
    app.use(express.errorHandler({ dumpExceptions: true, showStack: true }));
});

app.configure('production', function(){
    app.use(express.errorHandler());
});
app.use(app.router);


// Add routes here
//app.get('/', index.view);
app.get('/home', home.view);
app.get('/activity', activity.view);
app.get('/breaktime', breaktime.view);
app.get('/help', help.view);
app.get('/levels', levels.view);
//app.get('/register', register.view);
app.get('/settings', settings.view);
app.post('/editSettings', editSettings.editPreferences);
app.post('/activityComplete', activityComplete.completeActivity);
app.post('/registerHandler', registerHandler.addUser);
//app.get('/logout', logout.logout);
app.get('/congratulations', congratulations.view);
//app.get('/project/:id', project.projectInfo);
//app.get('/palette', palette.randomPalette);
// Example route
// app.get('/users', user.list);

var Account = require('./models/account');
passport.use(new LocalStrategy(Account.authenticate()));
passport.serializeUser(Account.serializeUser());
passport.deserializeUser(Account.deserializeUser());

require('./routes')(app);

http.createServer(app).listen(app.get('port'), function(){
  console.log('Express server listening on port ' + app.get('port'));
});
