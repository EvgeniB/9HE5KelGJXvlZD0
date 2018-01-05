var express = require('express');
var router = express.Router();


router.get('/my_itineraries', function(req, res, next) {
    var reqlib = require('app-root-path').require;
    var Itinerary = reqlib('/models/Itinerary.js');
    var usr;

    Itinerary.find({ User: usr }, function(err, itineraries) {
        if (err) throw err;

        res.render('my_itineraries', { itineraries: itineraries } );
    });

    res.render('my_itineraries');
});

module.exports = router;