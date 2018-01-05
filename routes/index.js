var express = require('express');
var router = express.Router();

/* GET home page. */
router.get('/', function(req, res, next) {

    var reqlib = require('app-root-path').require;
    var User = reqlib('/models/User.js');
    // get all the users
    User.find({}, function(err, users) {
        if (err) throw err;

        // object of all the users
        console.log(users);

        res.render('index', { title: 'Express', users: users });
    });



});

/* POST home page. */
router.post('/', function(req, res, next) {

    var reqlib = require('app-root-path').require;
    var User = reqlib('/models/User.js');


    // check if the credentials match to the user
    var usr = req.body.username;
    var pw = req.body.password;
    if (usr && pw) {

        User.find({ username: usr, password: pw }, function (err, user) {
            if (err) throw err;

            // object of all the users
            console.log(user);

            res.render('index', {title: 'Express', user: user});
        });

    }

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
    var fn = require('./login');
    fn.get_login(req, res);
});

router.post('/login', function (req, res, next) {
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

        res.render('login', {title: 'Express', user: user});

    }
});

router.get('/admin', function(req, res, next) {
    var reqlib = require('app-root-path').require;
    var User = reqlib('/models/User.js');
    var Itinerary = reqlib('/models/Itinerary.js');
    // get all the users
    User.find({}, function(err, users) {
        if (err) throw err;

        Itinerary.find({}, function(err, itineraries) {
            if (err) throw err;

            res.render('admin', { users: users, itineraries: itineraries } );
        });
    });
});

router.get('/register', function(req, res, next) {
    res.render('register');
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
    var title = req.body.title;
    console.log(title);

    if (todo == 'delete') {
        Itinerary.findOneAndRemove({ Title: title }, function(err) {
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

router.get('/edit_itinerary/:title', function(req, res, next) {
    var reqlib = require('app-root-path').require;
    var Itinerary= reqlib('/models/Itinerary.js');

    var iti = req.params.title;

    Itinerary.find({ Title: iti }, function(err, itinerary) {
        if (err) throw err;

        console.log(itinerary);

        res.render('edit_itinerary', { Title: itinerary });
    });

    res.render('edit_itinerary');
});

router.post('/edit_itinerary/:title', function(req, res, next) {
    var reqlib = require('app-root-path').require;
    var Itinerary= reqlib('/models/Itinerary.js');

    // save itinerary
    var iti = req.params.title;
    var isAdmin = req.body.isadmin;

    Itinerary.findOneAndUpdate({ Title: iti }, { isAdmin: isAdmin }, function(err, itinerary) {
        if (err) throw err;

        // we have the updated itinerary returned to us
        console.log(itinerary);
    });

    res.render('edit_itinerary');
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
