var express = require('express');
var path = require('path');
var favicon = require('serve-favicon');
var logger = require('morgan');
var cookieParser = require('cookie-parser');
var bodyParser = require('body-parser');
var fs = require('fs');
var multer = require('multer');

//var session = require('express-session');
//var MemoryStore = require('memorystore')(session)
var cookieSession = require('cookie-session');

var index = require('./routes/index');
var login = require('./routes/login');
var logout = require('./routes/logout');
var register = require('./routes/register');
var itinerary_details = require('./routes/itinerary/itinerary_details');
var country = require('./routes/country');
var search = require('./routes/search');
var my_itineraries = require('./routes/my_itineraries');
var edit_users = require('./routes/edit_users');
var add_user = require('./routes/add_user');
var edit_user = require('./routes/edit_user');
var add_itinerary = require('./routes/add_itinerary');
var edit_itinerary = require('./routes/edit_itinerary');
var view_itinerary = require('./routes/view_itinerary');
var add_country = require('./routes/add_country');
var edit_country = require('./routes/edit_country');
var edit_countries = require('./routes/edit_countries');
var add_location = require('./routes/add_location');
var edit_location = require('./routes/edit_location');
var edit_locations = require('./routes/edit_locations');
var add_tag = require('./routes/add_tag');
var edit_tag = require('./routes/edit_tag');
var edit_tags = require('./routes/edit_tags');
var users = require('./routes/users');

var test = require('./routes/test');
var edit_test = require('./routes/edit_test');

var app = express();

// setting port
app.set('port', process.env.PORT || 3001);

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
/*app.use(multer({ dest: './uploads/',
rename: function (fieldname, filename) {
    return filename;
},
}));*/

/*
app.use(session({
    resave: false,
    saveUninitialized: true,
    secret: 'secret', store: new MemoryStore(), expires: new Date(Date.now() + (30 * 86400 * 1000)), //store: new MemoryStore(),
    cookie: { secure: false }
}));
*/
app.use(cookieSession({
    name: 'session',
    keys: ['secret'],

    // Cookie Options
    maxAge: 24 * 60 * 60 * 1000 // 24 hours
}))








//Import the mongoose module
var mongoDB = 'mongodb://127.0.0.1/my_database1s';

var mongoose = require('mongoose');
//mongoose.connect(mongoDB);


//Set up default mongoose connection
//var fs = require('fs')
//    , filename = 'db.cfg';
//fs.readFile(filename, 'utf8', function(err, data) {
//    if (err) throw err;

    if (process.env.NODE && ~process.env.NODE.indexOf("heroku"))
        mongoDB = String(data);
    console.log("Before connecting to mongoDB");

    //console.log("The port we are using is " + process.env.PORT);

    mongoose.connect(mongoDB);//, {
    require('./models/User');
    require('./models/Itinerary');
    require('./models/Country');
    require('./models/Location');
    require('./models/Tag');




    //useMongoClient: true
//});
// Get Mongoose to use the global promise library
    //mongoose.Promise = global.Promise; what is this for?
// Get the default connection
    //var db = mongoose.connection;

//Bind connection to error event (to get notification of connection errors)
    //db.on('error', console.error.bind(console, 'MongoDB connection error:'));
///



//});










app.use('/', index);
app.use('/login', login);
app.use('/logout', logout);
app.use('/register', register);
app.use('/search', search);
app.use('/country', country);
app.use('/itinerary_details', itinerary_details);
app.use('/my_itineraries', my_itineraries);
app.use('/edit_users', edit_users);
app.use('/add_user', add_user);
app.use('/edit_user/', edit_user);
app.use('/add_itinerary', add_itinerary);
app.use('/edit_itinerary', edit_itinerary);
app.use('/view_itinerary/', view_itinerary);
app.use('/add_country', add_country);
app.use('/edit_country', edit_country);
app.use('/edit_countries', edit_countries);
app.use('/add_location', add_location);
app.use('/edit_location', edit_location);
app.use('/edit_locations', edit_locations);
app.use('/add_tag', add_tag);
app.use('/edit_tag', edit_tag);
app.use('/edit_tags', edit_tags);
app.use('/users', users);

app.use('/test', test);
app.use('/edit_test', edit_test);

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

// make app listen on port
app.listen(app.get('port'));

///

module.exports = app;
