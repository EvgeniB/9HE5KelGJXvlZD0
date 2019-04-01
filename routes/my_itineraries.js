var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    res.render('my_itineraries');
    require('./helpers/account_system').checkAdmin(user, res);

    var mongoose = require('mongoose');

    //var ItinerarySchema = mongoose.model('Itinerary').schema;
    //var Itinerary = mongoose.model('Itinerary', ItinerarySchema, 'Itinerary');

    var UserSchema = mongoose.model('User').schema;
    var User = mongoose.model('User', UserSchema, 'User');
    //var usr;

    //Itinerary.find({ User: usr }, function(err, itineraries) {
    //if (err) throw err;

    //populating itineraries belonging to the user

    /*
    User
    .findOne( { _id: user._id } )
    //populate('saved_itineraries').
    //populate({ path: 'saved_itineraries', model: 'Itinerary' }).

    .populate({
        path: 'saved_itineraries',
        model: 'Itinerary',
        populate: [{ path: 'Countries', model: 'Country' },
        { path: 'Locations', model: 'Location' },
        { path: 'Theme', model: 'Tag' },
        { path: 'Days.Day_Countries', model: 'Country' },
        { path: 'Days.Day_Locations', model: 'Location' }] })
    .exec(function (err, usr) {
        if (err || !usr) {
            console.log("Error populating user itineraries: " + err);
            next(err);
        } else {
            console.log('User object: ' + usr);
            console.log('The itineraries are %s', usr.saved_itineraries);

            res.render('my_itineraries', {usr: usr, _user: user});
        }
    });
    */

    //});
});

module.exports = router;