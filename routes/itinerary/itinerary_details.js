var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('itinerary/itinerary_details');
});

router.post('/', function(req, res, next) {
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