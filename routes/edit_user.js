var express = require('express');
var router = express.Router();

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