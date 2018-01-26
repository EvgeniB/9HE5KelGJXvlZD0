var express = require('express');
var router = express.Router();

router.get('/admin', function(req, res, next) {
    var sess=req.session;
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

module.exports = router;