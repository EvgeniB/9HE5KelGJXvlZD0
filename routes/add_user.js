var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    require('./helpers/account_system').checkAdmin(user, res);

    res.render('add_user', { _user: user });
});

router.post('/', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    require('./helpers/account_system').checkAdmin(user, res);

    var mongoose = require('mongoose');
    var UserSchema = mongoose.model('User').schema;
    var User = mongoose.model('User', UserSchema, 'User');

    var name = req.body.name ? req.body.name : "";
    var username = req.body.username ? req.body.username : "";
    var password = req.body.password ? req.body.password : "";
    var isAdmin = req.body.isAdmin ? true : false;//req.body.isAdmin ? (req.body.isAdmin ? true : false) : "";

    var new_user = new User({ name: name, username: username, password: password, admin: isAdmin, saved_itineraries: [] });
    console.log("New user: " + new_user);

    new_user.save(function (err) {
        if (err) {
            console.log('Error on save! ' + err);
            next(err);
        }else
        res.redirect('/edit_users');
    });
});

module.exports = router;