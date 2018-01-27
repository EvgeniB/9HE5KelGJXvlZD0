var express = require('express');
var router = express.Router();

router.get('/:username', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    require('./helpers/account_system').checkAdmin(user, res);

    var mongoose = require('mongoose');
    var UserSchema = mongoose.model('User').schema;
    var User = mongoose.model('User', UserSchema, 'User');

    var usr = req.params.username;

    User.find({ username: usr }, function(err, mongo_user) {
        if (err) throw err;

        console.log("User being edited: " + mongo_user);
        res.render('edit_user', { mongo_user: mongo_user, _user: user });
    });
});

router.post('/:username', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    require('./helpers/account_system').checkAdmin(user, res);

    var mongoose = require('mongoose');
    var UserSchema = mongoose.model('User').schema;
    var User = mongoose.model('User', UserSchema, 'User');

    // save user
    var id = req.params.username;

    var name = req.body.name ? req.body.name : "";
    var username = req.body.username ? req.body.username : "";
    var password = req.body.password ? req.body.password : "";
    var isAdmin = req.body.isAdmin ? true : false;//req.body.isAdmin ? (req.body.isAdmin ? true : false) : "";

    User.findOneAndUpdate({ _id: id }, { name: name, username: username, password: password, admin: isAdmin }, function(err, mongo_user) {
        if (err) {


        next(err);
        }
        else {
            // we have the updated user returned to us
            console.log("Updated user: " + mongo_user);
            res.redirect('/edit_users');
            //res.render('edit_user', { mongo_user: mongo_user, _user: user });
        }
    });

});

module.exports = router;