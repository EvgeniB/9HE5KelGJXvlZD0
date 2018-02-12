var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    require('./helpers/account_system').checkAdmin(user, res);

    var mongoose = require('mongoose');
    var LocationSchema = mongoose.model('Location').schema;
    var Location = mongoose.model('Location', LocationSchema, 'Location');

    var CountrySchema = mongoose.model('Country').schema;
    var Country = mongoose.model('Country', CountrySchema, 'Country');

    var id = req.params.id;

    Location.findOne({ _id: id }, function(err, location) {
        if (err) next(err);

        Country.find({}, function(err, countries) {

            res.render('edit_location', { location: location, countries: countries, _user: user });

        });
    });
});

router.post('/:id', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    require('./helpers/account_system').checkAdmin(user, res);

    var mongoose = require('mongoose');
    var LocationSchema = mongoose.model('Location').schema;
    var Location = mongoose.model('Location', LocationSchema, 'Location');

    // save itinerary
    var id = req.params.id;
    //var id = req.body.id;
    var name = req.body.name ? req.body.name : "";
    var country = req.body.country;

    Location.findOneAndUpdate({ _id: id }, { Name: name, Country: country }, function(err, location) {
        if (err) next(err);

        // we have the updated itinerary returned to us
        console.log(location);

        res.redirect('/edit_locations');
    });
});

module.exports = router;