var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('register');
});

router.post('/', function(req, res, next) {
    var mongoose = require('mongoose');
    var UserSchema = mongoose.model('User').schema;
    var User = mongoose.model('User', UserSchema, 'User');

    //var name = req.body.name ? req.body.name : "";
    //var username = req.body.username ? req.body.username : "";
    var email = req.body.email ? req.body.email : "";
    var password = req.body.password ? req.body.password : "";
    var isAdmin = false;

    console.log("DEBUG: new email " + email);

    var new_user = new User({ email: email, password: password, admin: isAdmin, saved_itineraries: [] });
    console.log("New user: " + new_user);

    new_user.save(function (err) {
        if (err) {
            console.log('Error on save! ' + err);
            next(err);
        }
        else
            res.redirect('/');
    });
});

module.exports = router;