var passport = require('passport');
var Account = require('./models/account');
var users = require("./users.json");
var models = require('./models');

var index = require('./routes/index');
var home = require('./routes/home');
var activity = require('./routes/activity');
var breaktime = require('./routes/breaktime');
var help = require('./routes/help');
var levels = require('./routes/levels');
var levelsalt = require('./routes/levelsalt');
//var register = require('./routes/register');
var settings = require('./routes/settings');
var editSettings = require('./routes/editSettings');
var activityComplete = require('./routes/activityComplete');
var registerHandler = require('./routes/registerHandler');
//var logout = require('./routes/logout');
var congratulations = require('./routes/congratulations');
var moment = require('moment');
var momenttimezone = require('moment-timezone');

module.exports = function (app) {

  app.get('/', function (req, res) {
    if(!res.locals.user)
    {
      var message = req.flash('error');
      res.render('index', { message: message });
    }
    else
    { 
      console.log(res.locals.user.username + " already logged in");
      models.User
        .find({"email" : res.locals.user.username})
        .exec(afterQuery);
      function afterQuery(err, users) {
        if(err) console.log(err);
        console.log("users: " + users);
        res.render('home', {user1: users[0]});
      }
    }
  });

  app.get('/register', function(req, res) {
      res.render('register', { });
  });

  app.post('/register', function(req, res) {
    Account.register(new Account({ username : req.body.username }), req.body.password, function(err, account) {
        if (err) {
            console.log(err);
            return res.render("register", {info: err.message});
        }

        passport.authenticate('local')(req, res, function () {
          var newUser = 
          {
            "email": req.body.username,
            "registerdate": moment().tz(req.body.timezone).format(),
            "registerdatestring": moment().tz(req.body.timezone).format("dddd, MMMM Do YYYY [at] h:mm a"),
            "timerpref": req.body.timerinterval,
            "timeremaining": req.body.timerinterval,
            "currentlevel": 1,
            "currentxp": 0,
            "breaks": 0,
            "breaks_arr": [
            ],
          };
          var newUser1 = new models.User(newUser);
          newUser1.save(afterSave);
          function afterSave(err, projects) {
            if(err) console.log(err);
            console.log("new user " + newUser1 + "saved");
            res.send();
          }
          res.redirect('home');
        });
    });
  });

  app.get('/login', function(req, res) {
      res.render('login', { user : req.user });
  });

  app.post('/login', passport.authenticate('local', {
      successRedirect: 'home',
      failureRedirect: '/',
      failureFlash: 'Invalid username or password.'})
  );

  app.get('/logout', function(req, res) {
      req.logout();
      res.redirect('/');
  });

  app.get('/ping', function(req, res){
      res.send("pong!", 200);
  });

  app.get('/flash', function(req, res){
    // Set a flash message by passing the key, followed by the value, to req.flash(). 
    req.flash('info', 'Flash is back!')
    res.redirect('/');
  });
  app.get('/home', home.view);
  app.get('/activity', activity.view);
  app.get('/breaktime', breaktime.view);
  app.get('/help', help.view);
  app.get('/levels', levels.view);
  app.get('/levelsalt', levelsalt.view);
  //app.get('/register', register.view);
  app.get('/settings', settings.view);
  app.post('/editSettings', editSettings.editPreferences);
  app.post('/activityComplete', activityComplete.completeActivity);
  app.post('/registerHandler', registerHandler.addUser);
  //app.get('/logout', logout.logout);
  app.get('/congratulations', congratulations.view);

};