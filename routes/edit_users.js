var express = require('express');
var router = express.Router();

router.get('/edit_users', function(req, res, next) {
    var reqlib = require('app-root-path').require;
    var User = reqlib('/models/User.js');
    // get all the users

    User.find({}, function(err, users) {
        if (err) throw err;

        res.render('edit_users', { users: users } );
    });

    res.render('edit_users');
});

module.exports = router;