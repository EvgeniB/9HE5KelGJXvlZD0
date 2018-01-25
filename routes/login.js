var express = require('express');
var router = express.Router();

var sess;

/* GET users listing. */
router.get('/', function(req, res, next) {
    res.render('login');
});

router.post('/', function(req, res, next) {
    sess=req.session;

    //var reqlib = require('app-root-path').require;
    //var User = reqlib('/models/User.js');

    var UserSchema = require('mongoose').model('User').schema;
    var User = require('mongoose').model('User', UserSchema, 'User');

    var usr = req.body.username;
    var pw = req.body.password;

    console.log(usr + " " + pw);
    console.log("Login POST METHOD");
    console.log("Type of usr " + typeof(usr) + " and type of pw " + typeof(pw));

    User.findOne({ username: usr, password: pw }, function (err, user) {
        //if (err) throw err;

        // object of all the users
        console.log("User: " + user);

        if (user) {
            sess.admin = true;
            sess.user = user;

            console.log("Admin " + sess.admin);
            console.log("User " + sess.user);
        }

        // This is how to handle multiple routing inside callbacks
        if (err || !user) {
            //res.render('error', {});
            console.log("Error: " + err);
            next(err);
        } else {
            res.redirect('/');
        }



        //res.render('login', {title: 'Express', user: user});
        //res.redirect('/login');
        //res.render('/', { _user: user });
    });

    //res.redirect('/login');
});

module.exports = router;