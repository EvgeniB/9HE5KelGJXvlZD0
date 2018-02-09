var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    require('./helpers/account_system').checkAdmin(user, res);

    var mongoose = require('mongoose');
    var UserSchema = mongoose.model('User').schema;
    var User = mongoose.model('User', UserSchema, 'User');
    // get all the users

    User.find({}, function(err, users) {
        if (err) throw err;

        res.render('edit_users', { mongo_users: users, _user: user } );
    });
});

router.post('/', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    require('./helpers/account_system').checkAdmin(user, res);

    var mongoose = require('mongoose');
    var UserSchema = mongoose.model('User').schema;
    var User = mongoose.model('User', UserSchema, 'User');

    var todo = req.body.todo;
    var id = req.body.id;
    var name = req.body.name ? req.body.name : "";
    console.log(name);

    if (todo == 'delete') {
        User.findOneAndRemove({_id: id}, function (err) {
            if (err) throw err;

            console.log('User deleted!');
            res.redirect('/edit_users');
        });
    }
});

module.exports = router;