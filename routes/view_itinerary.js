var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    require('./helpers/account_system').checkAdmin(user, res);

    var mongoose = require('mongoose');
    var ItinerarySchema = mongoose.model('Itinerary').schema;
    var Itinerary = mongoose.model('Itinerary', ItinerarySchema, 'Itinerary');

    var id = req.params.id;

    Itinerary.findOne({ _id: id }, function(err, itinerary) {
        if (err) {
            next(err);
        }
        else {
            console.log("Viewing itinerary: " + itinerary);
            res.render('view_itinerary', {itinerary: itinerary, _user: user});
        }
    });
});

module.exports = router;