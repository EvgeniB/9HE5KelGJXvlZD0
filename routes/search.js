var express = require('express');
var router = express.Router();

router.get('/search', function(req, res, next) {
    var reqlib = require('app-root-path').require;
    var Itinerary = reqlib('/models/Itinerary.js');

    if (req.body.country) {
        Itinerary.find({ countries: req.body.country }).sort({DayLength: 'desc'}).exec(function(err, itineraries) {
            if (err) throw err;

            res.render('search', { itineraries: itineraries } );
        });
    } else if(req.body.theme) {
        Itinerary.find({ countries: req.body.theme }).sort({DayLength: 'desc'}).exec(function(err, itineraries) {
            if (err) throw err;

            res.render('search', { itineraries: itineraries} );
        });
    } else {
        Itinerary.find({}, function (err, itineraries) {
            if (err) throw err;

            res.render('search', { itineraries: itineraries } );
        });
    }

    res.render('search');
});

module.exports = router;