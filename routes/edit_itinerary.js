var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    require('./helpers/account_system').checkAdmin(user, res);

    var mongoose = require('mongoose');
    var ItinerarySchema = mongoose.model('Itinerary').schema;
    var Itinerary = mongoose.model('Itinerary', ItinerarySchema, 'Itinerary');

    var CountrySchema = mongoose.model('Country').schema;
    var Country = mongoose.model('Country', CountrySchema, 'Country');

    var LocationSchema = mongoose.model('Location').schema;
    var Location = mongoose.model('Location', LocationSchema, 'Location');

    var tagSchema = mongoose.model('Tag').schema;
    var Tag = mongoose.model('Tag', tagSchema, 'Tag');

    var id = req.params.id;

    Itinerary.findOne({ _id: id }, function(err, itinerary) {
        if (err) throw err;

        //console.log(itinerary + '\n');
        //console.log(JSON.parse(JSON.stringify(itinerary.Title)));

        Country.find({}, function(err, countries) {

            //console.log('countries: ' + countries);

            Location.find({}, function(err, locations) {

                Tag.find({}, function(err, themes) {

                    res.render('edit_itinerary', {
                        itinerary: itinerary,
                        countries: countries,
                        locations: locations,
                        themes: themes,
                        cancel_uri: 'edit_itineraries',
                        _user: user
                    });

                });

            });

        });
    });
});

router.post('/:id', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    require('./helpers/account_system').checkAdmin(user, res);

    var mongoose = require('mongoose');
    var ItinerarySchema = mongoose.model('Itinerary').schema;
    var Itinerary = mongoose.model('Itinerary', ItinerarySchema, 'Itinerary');

    // save itinerary
    var itinerary = JSON.parse(req.body.itinerary);

    var id = req.params.id;
    //Itinerary.findOneAndUpdate({ _id: id }, { Days: itinerary.Days, Title: itinerary.Title, Description: itinerary.Description, DayLength: itinerary.DayLength,
    //    NightLength: itinerary.NightLength, ImageUrl: itinerary.ImageUrl }, function(err, itinerary) {
    Itinerary.findOneAndUpdate({ _id: id }, itinerary , function(err, itinerary) {
        if (err) throw err;

        // we have the updated itinerary returned to us
        //console.log(itinerary);

        res.redirect('/edit_itinerary/' + id);
    });
});

module.exports = router;