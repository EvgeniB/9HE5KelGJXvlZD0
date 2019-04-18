var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;
/*
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

    Itinerary
        .findOne( { _id: id } )

        .populate([{ path: 'Countries', model: 'Country' },
            { path: 'Locations', model: 'Location' },
            { path: 'Theme', model: 'Tag' },
            { path: 'Days.Day_Countries', model: 'Country' },
            { path: 'Days.Day_Locations', model: 'Location' }])
        .exec(function (err, itinerary) {
            if (err || !itinerary) {
                console.log("Error populating user itinerary: " + err);
                next(err);
            } else {

                Country.find({}, function(err, countries) {

                    Location.find({}, function(err, locations) {

                        Tag.find({}, function(err, themes) {

                            res.render('edit_itinerary', {
                                itinerary: itinerary,
                                countries: countries,
                                locations: locations,
                                Themes: themes,
                                cancel_uri: 'edit_itineraries',
                                _user: user
                            });

                        });

                    });

                });
            }
        });
        */
        res.render('itinerary/edit_itinerary');
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