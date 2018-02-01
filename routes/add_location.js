var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    require('./helpers/account_system').checkAdmin(user, res);

    res.render('add_location', { _user: user });
});

router.post('/', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    require('./helpers/account_system').checkAdmin(user, res);

    var mongoose = require('mongoose');
    var LocationSchema = mongoose.model('Location').schema;
    var Location = mongoose.model('Location', LocationSchema, 'Location');

    var name = req.body.name ? req.body.name : "";
    var country = req.body.country ? req.body.country : "";

    var new_location = new Location({ Name: name }); //, Country: country
    console.log("New location: " + new_location);

    new_location.save(function (err) {
        if (err)
            console.log('Error on save!')

        res.redirect('/edit_locations');
    });
});

module.exports = router;