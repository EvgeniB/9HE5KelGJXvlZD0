var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    require('./helpers/account_system').checkAdmin(user, res);

    var mongoose = require('mongoose');
    var LocationSchema = mongoose.model('Location').schema;
    var Location = mongoose.model('Location', LocationSchema, 'Location');

    Location.find({}, function(err, locations) {

        console.log(locations);
        if (err) throw err;

        res.render('edit_locations', { locations: locations, _user: user } );
    });
});

router.post('/', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    require('./helpers/account_system').checkAdmin(user, res);

    var mongoose = require('mongoose');
    var LocationSchema = mongoose.model('Location').schema;
    var Location = mongoose.model('Location', LocationSchema, 'Location');

    var todo = req.body.todo;
    var id = req.body.id;
    var name = req.body.name ? req.body.name : "";
    console.log(name);

    if (todo == 'delete') {
        Location.findOneAndRemove({_id: id}, function (err) {
            if (err) throw err;

            console.log('Country deleted!');
            Location.find({}, function (err, locations) {
                if (err) throw err;

                res.render('edit_locations', {locations: locations, _user: user});
            });
        });
    }
});

module.exports = router;