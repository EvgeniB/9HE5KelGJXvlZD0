var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');

var session = require('express-session');

var index = require('./routes/index');
var login = require('./routes/login');
var logout = require('./routes/logout');
var search = require('./routes/search');
var my_itineraries = require('./routes/my_itineraries');
var users = require('./routes/users');

var app = express();

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'pug');

// uncomment after placing your favicon in /public
//app.use(favicon(path.join(__dirname, 'public', 'favicon.ico')));
app.use(logger('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'secret',
    cookie: { secure: false }
}));









//Import the mongoose module
var mongoDB = 'mongodb://127.0.0.1/my_database';

var mongoose = require('mongoose');

//Set up default mongoose connection
var fs = require('fs')
    , filename = 'db.cfg';
fs.readFile(filename, 'utf8', function(err, data) {
    if (err) throw err;

    if (process.env.NODE && ~process.env.NODE.indexOf("heroku"))
        mongoDB = String(data);
    console.log("Before connecting to mongoDB");

    //console.log("The port we are using is " + process.env.PORT);

    mongoose.connect(mongoDB);//, {
    require('./models/User');
    require('./models/Itinerary');
    require('./models/Country');
    require('./models/Location');




    //useMongoClient: true
//});
// Get Mongoose to use the global promise library
    //mongoose.Promise = global.Promise; what is this for?
// Get the default connection
    //var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
    //db.on('error', console.error.bind(console, 'MongoDB connection error:'));
///



});










app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/search', search);
app.use('/my_itineraries', my_itineraries);
app.use('/users', users);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  var err = new Error('Not Found');
  err.status = 404;
  next(err);
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

//app.listen(process.env.PORT || 3000);

///

module.exports = app;
