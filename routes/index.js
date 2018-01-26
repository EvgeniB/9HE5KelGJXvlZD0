var express = require('express');
var router = express.Router();

var sess;

/* GET home page. */
router.get('/', function(req, res, next) {
    sess=req.session;

    //var reqlib = require('app-root-path').require;
    //var User = reqlib('/models/User.js');
    // get all the users

    var admin = sess.admin;
    var user = sess.user;

    console.log("Index GET: " + admin + " " + user);

    res.render('index', { _user: user});
});

/* POST home page. */
router.post('/', function(req, res, next) {
    sess=req.session;

    var reqlib = require('app-root-path').require;
    var User = reqlib('/models/User.js');


    // check if the credentials match to the user
    var usr = req.body.username;
    var pw = req.body.password;

    //console.log(usr + " " + pw);
    console.log("Sess " + sess);
    //console.log(sess.admin);
    //console.log(sess.user);
    /*
    User.findOne({ username: usr, password: pw }, function (err, user) {
        if (err) throw err;

        // object of all the users
        console.log(user);

        if (user) {
            sess.admin = true;
            sess.user = user.username;
        }
    */
        res.render('index', { _user: sess.user });
    //});

});




router.get('/add', function(req, res, next) {

    var reqlib = require('app-root-path').require;
    var User = reqlib('/models/User.js');
    // get all the users
    User.find({}, function(err, users) {
        if (err) throw err;

        // object of all the users
        console.log(users);

        res.render('modify', { users: users });
    });

});

/*
router.get('/login', function (req, res, next) {
    sess=req.session;

    var fn = require('./login');
    fn.get_login(req, res);
    //return next();
});

router.post('/login', function (req, res, next) {
    sess=req.session;

    var reqlib = require('app-root-path').require;
    var User = reqlib('/models/User.js');

    var usr = req.body.username;
    var pw = req.body.password;

    console.log(usr + " " + pw);
    console.log("Login POST METHOD");

    User.findOne({ username: usr, password: pw }, function (err, user) {
        if (err) throw err;

        // object of all the users
        console.log("User: " + user);

        if (user) {
            sess.admin = true;
            sess.user = user;

            console.log("Admin " + sess.admin);
            console.log("User " + sess.user);
        }

        //res.render('login', {title: 'Express', user: user});
        res.redirect('/');
    });
});


router.get('/logout', function(req, res, next) {
    sess=req.session;

    sess.admin = false;
    sess.user = null;

    res.redirect('/');
});
*/

router.get('/admin', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    var admin = sess.admin;

    var reqlib = require('app-root-path').require;
    var User = reqlib('/models/User.js');
    var Itinerary = reqlib('/models/Itinerary.js');
    // get all the users
    User.find({}, function(err, users) {
        if (err) throw err;

        Itinerary.find({}, function(err, itineraries) {
            if (err) throw err;

            res.render('admin', { users: users, itineraries: itineraries, admin: true, _user: user } );
        });
    });
});

router.get('/register', function(req, res, next) {
    sess=req.session;

    res.render('register');
});

router.post('/register', function(req, res, next) {
    sess=req.session;

    var reqlib = require('app-root-path').require;
    var User = reqlib('/models/User.js');


    // register new user
    var usr = req.body.username;
    var pw = req.body.password;

    console.log(usr + " " + pw + " LOGIN POST");

    var newUser = new User({username: usr, password: pw, admin: true });

    newUser.save(function (err) {
        console.log("error: " + err);
        if (err)
            console.log('Error on save!')
    });

    res.redirect('/');

});

router.get('/search', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    //checkAdmin(user, res);

    console.log("Here");
    var reqlib = require('app-root-path').require;
    //var Itinerary = reqlib('/models/Itinerary.js');
    var mongoose = require('mongoose');
    var Itinerary = mongoose.model('Itinerary');

    /*
    if (req.body.country != 'undefined') {
        console.log("Here2");
        Itinerary.find({ countries: req.body.country }).sort({DayLength: 'desc'}).exec(function(err, itineraries) {
            if (err) throw err;

            res.render('search', { itineraries: itineraries, _user: user } );
        });
    } else if(req.body.theme != 'undefined') {
        console.log("Here3");
        Itinerary.find({ countries: req.body.theme }).sort({DayLength: 'desc'}).exec(function(err, itineraries) {
            if (err) throw err;

            res.render('search', { itineraries: itineraries, _user: user } );
        });
    } else {

*/

//This is how to get schema
    var itinerarySchema = require('mongoose').model('Itinerary').schema;
        //console.log(itinerarySchema);

    //This is how to populate using mongoose models
    Itinerary.find()
        .populate([{path: 'Countries', model: 'Country'}])
        .populate([{path: 'Locations', model: 'Location'}])
        .exec(function (err, itineraries) {
            // callback
            console.log("callback");
            console.log(itineraries);

            res.render('search', { itineraries: itineraries, _user: user } );
        });

        //Itinerary.itinerarySchema.
        //find({}).
        //populate('Countries').
        //exec(function (err, itineraries) {
         //   if (err) return handleError(err);
         //   console.log('The itineraries are %s', user.saved_itineraries);

            //res.render('search', { itineraries: itineraries, _user: user } );

        //});





/*
            Itinerary.find({}, function (err, itineraries) {
            console.log("Here4");
            if (err) throw err;

            console.log(itineraries);
            res.render('search', { itineraries: itineraries, _user: user } );
        });

            */
  //  }
});

router.post('/search', function(req, res, next) {
    var mongoose = require('mongoose');
    mongoose.connect('mongodb://heroku_4mvmv68l:ocg3ckt1oo1hqndkbtee0n322c@ds111895.mlab.com:11895/heroku_4mvmv68l');
    sess = req.session;
    var user = sess.user;
    console.log("!!!!!!!!!!!!!!!" + user._id);

    var type = req.body.type;

    var reqlib = require('app-root-path').require;
    var User = reqlib('/models/User.js');
    var User = mongoose.model('User');

    var id = mongoose.Types.ObjectId('5a477de455534d156c5fa58c');
    User.findById( '5a477de455534d156c5fa58c' ).exec(function(err, user_) {
        console.log("USERUSER: " + user_);
    });


    if(type=='save') {

        var mongoose = require('mongoose');
        var Itinerary = mongoose.model('Itinerary');
        //var User = mongoose.model('User');
        var reqlib = require('app-root-path').require;
        var User = reqlib('/models/User.js');

        var id = req.body.id;

        Itinerary.findById(id).exec(
            function(err, doc) {
                var d1 = doc;
                delete d1._id;
                var d2 = d1.save(function(err) {
                    //if (err) throw err;
                    if (err) {
                        return console.log("error: " + err);
                    }
                    console.log(user + " " + user._id);

                    User.find({}).exec(function(err, users) {
                    //User.findOne({ _id : user._id }).exec(function(err, user_) {//, function(err, user_) {
                        //if (err) throw err;
                        if (err) {
                            return console.log("error: " + err);
                        }
                        console.log(users);

                        var u;
                        for(i=0;i<users.length;i++) {
                            if (users[i]._id == user._id)
                                u = i;
                        }



                        users[u].saved_itineraries.push(d2);

                        User.findByIdAndUpdate(user._id, { saved_itineraries: users[u].saved_itineraries }, function(err, a) {
                            if (err) throw err;

                            // we have the updated user returned to us
                            console.log(a);


                            Itinerary.find({}, function(err, itineraries) {
                                if (err) {
                                    return console.log("error: " + err);
                                }
                                res.render('search', { itineraries: [], _user: user } );
                            });
                        });



                    });


                });
            }
        );
    }

        res.render('search', { itineraries: [], _user: user } );

});

router.get('/details/:title', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    var reqlib = require('app-root-path').require;
    var Itinerary = reqlib('/models/Itinerary.js');
    var title = req.params.title;

    Itinerary.find({ Title: title }, function(err, itineraries) {
        if (err) throw err;

        res.render('details', { itineraries: itineraries } );
    });

    res.render('details', {_user: user });
});

router.get('/my_itineraries', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    var reqlib = require('app-root-path').require;
    var Itinerary = reqlib('/models/Itinerary.js');
    var User = reqlib('/models/User.js');
    var usr;

    //Itinerary.find({ User: usr }, function(err, itineraries) {
        //if (err) throw err;

        //populating itineraries belonging to the user

    User.
    findOne({ _id: user._id }).
    populate('saved_itineraries').
    exec(function (err, itineraries) {
        if (err) return handleError(err);
        console.log('The itineraries are %s', user.saved_itineraries);

        res.render('my_itineraries', { itineraries: itineraries, _user: user } );
    });

    //});
});

router.get('/add_itinerary', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    //checkAdmin(user, res);

    var reqlib = require('app-root-path').require;
    var Country = reqlib('/models/Country.js');

    var reqlib = require('app-root-path').require;
    var Location = reqlib('/models/Location.js');

    Country.find({}, function(err, countries) {
        Location.find({}, function(err, locations) {
            res.render('add_itinerary', { _user: user, countries: countries, locations: locations });
        });
    });
});

router.post('/add_itinerary', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    var reqlib = require('app-root-path').require;
    var Itinerary = reqlib('/models/Itinerary.js');

    var todo = req.body.todo;
    var id = req.body.id;

    var num_days = req.body.days_n;
    var num_events = req.body.events_n;

    var days = [];var events = [];

    for(i=0;i<num_days;i++) {
        for(j=0;j<num_events;j++) {
            var a = 1;
            var name = 'a';

            document.write(eval(name)); // 1

            days.push();
        }
    }



    var title = req.body.title ? req.body.title : "";
    var description = req.body.description ? req.body.description : "";

    var countries = req.body.countries;
    console.log("countries: " + countries);

    var imageurl = req.body.imageurl ? req.body.imageurl : "";

    var new_it = new Itinerary({ Title: title, Description: description, Countries: countries, ImageUrl: imageurl });
    console.log(new_it);

    new_it.save(function (err) {
        if (err)
            console.log('Error on save!')

            res.redirect('/edit_itineraries');
    });
});

router.get('/edit/:id', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    var reqlib = require('app-root-path').require;
    var Itinerary= reqlib('/models/Itinerary.js');

    var id = req.params.id;

    Itinerary.find( { _id: id }, function(err, itinerary) {
        if (err) throw err;

        console.log(itinerary);

        res.render('edit', { itinerary: itinerary, _user: user });
    });
});

router.post('/edit/:id', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    var reqlib = require('app-root-path').require;
    var Itinerary= reqlib('/models/Itinerary.js');

    // save itinerary
    var id = req.params.id;
    var isAdmin = req.body.isadmin;

    Itinerary.findOneAndUpdate(id, { isAdmin: isAdmin }, function(err, itinerary) {
        if (err) throw err;

        // we have the updated itinerary returned to us
        console.log(itinerary);

        res.render('edit', { _user: user });
    });
});

router.get('/edit_itineraries', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    var reqlib = require('app-root-path').require;
    var Itinerary = reqlib('/models/Itinerary.js');

    Itinerary.find({}, function(err, itineraries) {

        console.log(itineraries);
        if (err) throw err;

        res.render('edit_itineraries', { itineraries: itineraries, _user: user } );
    });
});

router.post('/edit_itineraries', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    var reqlib = require('app-root-path').require;
    var Itinerary = reqlib('/models/Itinerary.js');

    var todo = req.body.todo;
    var id = req.body.id;
    var title = req.body.title ? req.body.title : "";
    var description = req.body.description ? req.body.description : "";
    var imageurl = req.body.imageurl ? req.body.imageurl : "";
    console.log(title);

    if (todo == 'delete') {
        Itinerary.findOneAndRemove({ _id: id }, function(err) {
            if (err) throw err;

            console.log('Itinerary deleted!');
            Itinerary.find({}, function (err, itineraries) {
                if (err) throw err;

                res.render('edit_itineraries', {itineraries: itineraries, _user: user });
            });
        });
    } else {
        Itinerary.findOneAndUpdate({ _id: id }, { Title: title, Description: description, ImageUrl: imageurl }, function(err, itinerary) {
            if (err) throw err;

            // we have the updated itinerary returned to us
            console.log(itinerary);

            res.render('edit_itinerary', { itinerary: itinerary, _user: user });
        });
    }
});

router.get('/edit_itinerary/:id', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    var reqlib = require('app-root-path').require;
    var Itinerary= reqlib('/models/Itinerary.js');

    var id = req.params.id;

    Itinerary.findOne({ _id: id }, function(err, itinerary) {
        if (err) throw err;

        console.log(itinerary + '\n');
        console.log(JSON.parse(JSON.stringify(itinerary.Title)));

        res.render('edit_itinerary', { itinerary: itinerary, _user: user });
    });
});

router.post('/edit_itinerary/:id', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    var reqlib = require('app-root-path').require;
    var Itinerary= reqlib('/models/Itinerary.js');

    // save itinerary
    var id = req.params.id;
    //var id = req.body.id;
    var title = req.body.title ? req.body.title : "";
    var description = req.body.description ? req.body.description : "";
    var imageurl = req.body.imageurl ? req.body.imageurl : "";

    console.log("description: " + description);

    Itinerary.findOneAndUpdate({ _id: id }, { Title: title, Description: description, ImageUrl: imageurl }, function(err, itinerary) {
        if (err) throw err;

        // we have the updated itinerary returned to us
        console.log(itinerary);

        res.redirect('/edit_itineraries');
    });
});

router.get('/edit_users', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    var reqlib = require('app-root-path').require;
    var User = reqlib('/models/User.js');
    // get all the users

    User.find({}, function(err, users) {
        if (err) throw err;

        res.render('edit_users', { users: users, _user: user } );
    });
});

router.get('/edit_user/:username', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    var reqlib = require('app-root-path').require;
    var User = reqlib('/models/User.js');

    var usr = req.params.username;

    User.find({ username: usr }, function(err, user) {
        if (err) throw err;

        console.log(user);

        res.render('edit_user', { user: user, _user: user });
    });
});

router.post('/edit_user/:username', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    var reqlib = require('app-root-path').require;
    var User = reqlib('/models/User.js');

    // save user
    var usr = req.params.username;
    var isAdmin = req.body.isadmin;

    User.findOneAndUpdate({ username: usr }, { isAdmin: isAdmin }, function(err, user) {
        if (err) throw err;

        // we have the updated user returned to us
        console.log(user);
    });

    res.render('edit_user', { _user: user });
});

router.get('/add_country', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    res.render('add_country', { _user: user });
});

router.post('/add_country', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    var reqlib = require('app-root-path').require;
    var Country = reqlib('/models/Country.js');

    var name = req.body.name ? req.body.name : "";

    var new_country = new Country({ Name: name });
    console.log("New country: " + new_country);

    new_country.save(function (err) {
        if (err)
            console.log('Error on save!')

        res.redirect('/edit_countries');
    });
});

router.get('/edit_countries', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    var reqlib = require('app-root-path').require;
    var Country = reqlib('/models/Country.js');

    Country.find({}, function(err, countries) {

        console.log(countries);
        if (err) throw err;

        res.render('edit_countries', { countries: countries, _user: user } );
    });
});

router.post('/edit_countries', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    var reqlib = require('app-root-path').require;
    var Country = reqlib('/models/Country.js');

    var todo = req.body.todo;
    var id = req.body.id;
    var name = req.body.name ? req.body.name : "";
    console.log(name);

    if (todo == 'delete') {
        Country.findOneAndRemove({_id: id}, function (err) {
            if (err) throw err;

            console.log('Country deleted!');
            Country.find({}, function (err, countries) {
                if (err) throw err;

                res.render('edit_countries', {countries: countries, _user: user});
            });
        });
    }
});

router.get('/edit_country/:id', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    var reqlib = require('app-root-path').require;
    var Country= reqlib('/models/Country.js');

    var id = req.params.id;

    Country.findOne({ _id: id }, function(err, country) {
        if (err) throw err;

        res.render('edit_country', { country: country, _user: user });
    });
});

router.post('/edit_country/:id', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    var reqlib = require('app-root-path').require;
    var Country= reqlib('/models/Country.js');

    // save itinerary
    var id = req.params.id;
    //var id = req.body.id;
    var name = req.body.name ? req.body.name : "";

    Country.findOneAndUpdate({ _id: id }, { Name: name}, function(err, country) {
        if (err) throw err;

        // we have the updated itinerary returned to us
        console.log(country);

        res.redirect('/edit_countries');
    });
});

router.get('/add_location', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    res.render('add_location', { _user: user });
});

router.post('/add_location', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    var reqlib = require('app-root-path').require;
    var Location = reqlib('/models/Location.js');

    var name = req.body.name ? req.body.name : "";
    var country = req.body.country ? req.body.country : "";

    var new_location = new Location({ Name: name }); //, Country: country
    console.log("New location: " + new_location);

    new_location.save(function (err) {
        if (err)
            console.log('Error on save!')

        res.redirect('/edit_locations');
    });
});

router.get('/edit_locations', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    var reqlib = require('app-root-path').require;
    var Location = reqlib('/models/Location.js');

    Location.find({}, function(err, locations) {

        console.log(locations);
        if (err) throw err;

        res.render('edit_locations', { locations: locations, _user: user } );
    });
});

router.post('/edit_locations', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    var reqlib = require('app-root-path').require;
    var Location = reqlib('/models/Location.js');

    var todo = req.body.todo;
    var id = req.body.id;
    var name = req.body.name ? req.body.name : "";
    console.log(name);

    if (todo == 'delete') {
        Location.findOneAndRemove({_id: id}, function (err) {
            if (err) throw err;

            console.log('Country deleted!');
            Location.find({}, function (err, locations) {
                if (err) throw err;

                res.render('edit_locations', {locations: locations, _user: user});
            });
        });
    }
});

router.get('/edit_location/:id', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    var reqlib = require('app-root-path').require;
    var Location= reqlib('/models/Location.js');

    var id = req.params.id;

    Location.findOne({ _id: id }, function(err, location) {
        if (err) throw err;

        res.render('edit_location', { location: location, _user: user });
    });
});

router.post('/edit_location/:id', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    var reqlib = require('app-root-path').require;
    var Location= reqlib('/models/Location.js');

    // save itinerary
    var id = req.params.id;
    //var id = req.body.id;
    var name = req.body.name ? req.body.name : "";

    Location.findOneAndUpdate({ _id: id }, { Name: name}, function(err, location) {
        if (err) throw err;

        // we have the updated itinerary returned to us
        console.log(location);

        res.redirect('/edit_locations');
    });
});

router.get('/add_event_type', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    res.render('add_event_type', { _user: user });
});

router.post('/add_event_type', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    var reqlib = require('app-root-path').require;
    var EventType = reqlib('/models/EventType.js');

    var name = req.body.name ? req.body.name : "";

    var new_event_type = new EventType({ Name: name }); //, Country: country
    console.log("New event_type: " + new_event_type);

    new_event_type.save(function (err) {
        if (err)
            console.log('Error on save!')

        res.redirect('/edit_event_types');
    });
});

router.get('/edit_event_types', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    var reqlib = require('app-root-path').require;
    var EventType = reqlib('/models/EventType.js');

    EventType.find({}, function(err, event_types) {

        console.log(event_types);
        if (err) throw err;

        res.render('edit_event_types', { event_types: event_types, _user: user } );
    });
});

router.post('/edit_event_types', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    var reqlib = require('app-root-path').require;
    var EventType = reqlib('/models/EventType.js');

    var todo = req.body.todo;
    var id = req.body.id;
    var name = req.body.name ? req.body.name : "";
    console.log(name);

    if (todo == 'delete') {
        EventType.findOneAndRemove({_id: id}, function (err) {
            if (err) throw err;

            console.log('Event type deleted!');
            EventType.find({}, function (err, event_types) {
                if (err) throw err;

                res.render('edit_event_types', {event_types: event_types, _user: user});
            });
        });
    }
});

router.get('/edit_event_type/:id', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    var reqlib = require('app-root-path').require;
    var EventType= reqlib('/models/EventType.js');

    var id = req.params.id;

    EventType.findOne({ _id: id }, function(err, event_type) {
        if (err) throw err;

        console.log("edit_event_type.get, EventType: " + event_type);

        res.render('edit_event_type', { event_type: event_type, _user: user });
    });
});

router.post('/edit_event_type/:id', function(req, res, next) {
    sess=req.session;
    var user = sess.user;

    checkAdmin(user, res);

    var reqlib = require('app-root-path').require;
    var EventType= reqlib('/models/EventType.js');

    // save itinerary
    var id = req.params.id;
    //var id = req.body.id;
    var name = req.body.name ? req.body.name : "";

    EventType.findOneAndUpdate({ _id: id }, { Name: name}, function(err, event_type) {
        if (err) throw err;

        // we have the updated itinerary returned to us
        console.log(event_type);

        res.redirect('/edit_event_types');
    });
});

var checkAdmin = function(user, res) {
    console.log("current user: " + user);
    if (user == undefined)
        res.redirect("/");
    if (!user.admin)
        res.redirect("/");
}

module.exports = router;
