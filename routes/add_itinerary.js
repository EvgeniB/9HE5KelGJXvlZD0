var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    require('./helpers/account_system').checkAdmin(user, res);

    var mongoose = require('mongoose');
    var CountrySchema = mongoose.model('Country').schema;
    var Country = mongoose.model('Country', CountrySchema, 'Country.js');

    var mongoose = require('mongoose');
    var LocationSchema = mongoose.model('Location').schema;
    var Location = mongoose.model('Location', LocationSchema, 'Location.js');

    Country.find({}, function(err, countries) {
        Location.find({}, function(err, locations) {
            res.render('add_itinerary', { _user: user, countries: countries, locations: locations });
        });
    });
});

router.post('/', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    require('./helpers/account_system').checkAdmin(user, res);

    var mongoose = require('mongoose');
    var ItinerarySchema = mongoose.model('Itinerary').schema;
    var Itinerary = mongoose.model('Itinerary', ItinerarySchema, 'Itinerary');

    var todo = req.body.todo;
    var id = req.body.id;

    var itinerary = JSON.parse(req.body.itinerary);

    var new_it = new Itinerary({ Days: itinerary.Days, Title: itinerary.Title, Description: itinerary.Description, DayLength: itinerary.DayLength,
        NightLength: itinerary.NightLength, ImageUrl: itinerary.ImageUrl });
    console.log(new_it);

    new_it.save(function (err) {
        if (err)
            console.log('Error on save!')

        res.redirect('/edit_itineraries');
    });
});

module.exports = router;
