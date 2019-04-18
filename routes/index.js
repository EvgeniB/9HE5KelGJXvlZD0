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

/*
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
*/

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

/*
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
*/
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
