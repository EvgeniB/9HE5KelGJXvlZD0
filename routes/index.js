var express = require('express');
var router = express.Router();

var sess;

/* GET home page. */
router.get('/', function(req, res, next) {
    sess=req.session;

    var reqlib = require('app-root-path').require;
    var User = reqlib('/models/User.js');
    // get all the users

    var admin = sess.admin;
    var user = sess.user;

    console.log("Index GET: " + admin + " " + user);

    res.render('index', {admin: admin, _user: user});
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
        res.render('index', { admin: sess.admin, _user: sess.user });
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


router.get('/login', function (req, res) {
    sess=req.session;

    var fn = require('./login');
    fn.get_login(req, res);
});

router.post('/login', function (req, res, next) {
    sess=req.session;

    var reqlib = require('app-root-path').require;
    var User = reqlib('/models/User.js');

    var usr = req.body.username;
    var pw = req.body.password;

    //console.log(usr + " " + pw);
    console.log("Login POST METHOD");

    User.findOne({ username: usr, password: pw }, function (err, user) {
        if (err) throw err;

        // object of all the users
        console.log("User: " + user);

        if (user) {
            sess.admin = true;
            sess.user = user.username;

            console.log("Admin " + sess.admin);
            console.log("User " + sess.user);
        }

        //res.render('login', {title: 'Express', user: user});
        res.redirect('/');
    });
});

router.get('/logout', function(req, res) {
    sess=req.session;

    sess.admin = false;
    sess.user = null;

    res.redirect('/');
});

router.get('/admin', function(req, res, next) {
    sess=req.session;

    var admin = sess.admin;
    var user = sess.username;

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
    var reqlib = require('app-root-path').require;
    var User = reqlib('/models/User.js');


    // register new user
    var usr = req.body.username;
    var pw = req.body.password;
    var newUser = new User({username: usr, password: pw});
    if (usr && pw) {

        newUser.save(function (err) {
            if (err)
                console.log('Error on save!')
        });

        res.render('register');

    }
});

router.get('/search', function(req, res) {
    console.log("Here");
    var reqlib = require('app-root-path').require;
    var Itinerary = reqlib('/models/Itinerary.js');

    if (req.body.country != 'undefined') {
        console.log("Here2");
        Itinerary.find({ countries: req.body.country }).sort({DayLength: 'desc'}).exec(function(err, itineraries) {
            if (err) throw err;

            res.render('search', { itineraries: itineraries } );
        });
    } else if(req.body.theme != 'undefined') {
        console.log("Here3");
        Itinerary.find({ countries: req.body.theme }).sort({DayLength: 'desc'}).exec(function(err, itineraries) {
            if (err) throw err;

            res.render('search', { itineraries: itineraries} );
        });
    } else {
        Itinerary.find({}, function (err, itineraries) {
            console.log("Here4");
            if (err) throw err;

            console.log(itineraries);
            res.render('search', { itineraries: itineraries } );
        });
    }
});

router.get('/details/:title', function(req, res, next) {
    var reqlib = require('app-root-path').require;
    var Itinerary = reqlib('/models/Itinerary.js');
    var title = req.params.title;

    Itinerary.find({ Title: title }, function(err, itineraries) {
        if (err) throw err;

        res.render('details', { itineraries: itineraries } );
    });

    res.render('details');
});

router.get('/my_itineraries', function(req, res, next) {
    var reqlib = require('app-root-path').require;
    var Itinerary = reqlib('/models/Itinerary.js');
    var usr;

    Itinerary.find({ User: usr }, function(err, itineraries) {
        if (err) throw err;

        res.render('my_itineraries', { itineraries: itineraries } );
    });
});

router.get('/add_itinerary', function(req, res, next) {
    res.render('add_itinerary');
});

router.get('/edit/:id', function(req, res, next) {
    var reqlib = require('app-root-path').require;
    var Itinerary= reqlib('/models/Itinerary.js');

    var id = req.params.id;

    Itinerary.find( { _id: id }, function(err, itinerary) {
        if (err) throw err;

        console.log(itinerary);

        res.render('edit', { itinerary: itinerary });
    });
});

router.post('/edit/:id', function(req, res, next) {
    var reqlib = require('app-root-path').require;
    var Itinerary= reqlib('/models/Itinerary.js');

    // save itinerary
    var id = req.params.id;
    var isAdmin = req.body.isadmin;

    Itinerary.findOneAndUpdate(id, { isAdmin: isAdmin }, function(err, itinerary) {
        if (err) throw err;

        // we have the updated itinerary returned to us
        console.log(itinerary);

        res.render('edit');
    });
});

router.get('/edit_itineraries', function(req, res, next) {
    var reqlib = require('app-root-path').require;
    var Itinerary = reqlib('/models/Itinerary.js');

    Itinerary.find({}, function(err, itineraries) {

        console.log(itineraries);
        if (err) throw err;

        res.render('edit_itineraries', { itineraries: itineraries } );
    });
});

router.post('/edit_itineraries', function(req, res, next) {
    var reqlib = require('app-root-path').require;
    var Itinerary = reqlib('/models/Itinerary.js');

    var todo = req.body.todo;
    var id = req.body.id;
    var title = req.body.title;
    console.log(title);

    if (todo == 'delete') {
        Itinerary.findOneAndRemove({ _id: id }, function(err) {
            if (err) throw err;

            console.log('Itinerary deleted!');
            Itinerary.find({}, function (err, itineraries) {
                if (err) throw err;

                res.render('edit_itineraries', {itineraries: itineraries});
            });
        });
    } else {

        var new_it = new Itinerary({ Title: title });

        new_it.save(function (err) {
            if (err)
                console.log('Error on save!')

            Itinerary.find({}, function (err, itineraries) {
                if (err) throw err;
                console.log(itineraries);

                res.render('edit_itineraries', {itineraries: itineraries});
            });
        });

    }
});

router.get('/edit_itinerary/:id', function(req, res, next) {
    var reqlib = require('app-root-path').require;
    var Itinerary= reqlib('/models/Itinerary.js');

    var id = req.params.id;

    Itinerary.findOne({ _id: id }, function(err, itinerary) {
        if (err) throw err;

        console.log(itinerary + '\n');
        console.log(JSON.parse(JSON.stringify(itinerary.Title)));

        res.render('edit_itinerary', { itinerary: itinerary });
    });
});

router.post('/edit_itinerary/:id', function(req, res, next) {
    var reqlib = require('app-root-path').require;
    var Itinerary= reqlib('/models/Itinerary.js');

    // save itinerary
    var id = req.params.id;
    var isAdmin = req.body.isadmin;

    Itinerary.findOneAndUpdate({ _id: id }, { isAdmin: isAdmin }, function(err, itinerary) {
        if (err) throw err;

        // we have the updated itinerary returned to us
        console.log(itinerary);

        res.render('edit_itinerary', { itinerary: itinerary });
    });
});

router.get('/edit_users', function(req, res, next) {
    var reqlib = require('app-root-path').require;
    var User = reqlib('/models/User.js');
    // get all the users

    User.find({}, function(err, users) {
        if (err) throw err;

        res.render('edit_users', { users: users } );
    });
});

router.get('/edit_user/:username', function(req, res, next) {
    var reqlib = require('app-root-path').require;
    var User = reqlib('/models/User.js');

    var usr = req.params.username;

    User.find({ username: usr }, function(err, user) {
        if (err) throw err;

        console.log(user);

        res.render('edit_user', { user: user });
    });

    res.render('edit_user');
});

router.post('/edit_user/:username', function(req, res, next) {
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

    res.render('edit_user');
});

module.exports = router;
