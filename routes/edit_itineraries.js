var express = require('express');
var router = express.Router();

router.get('/edit_itineraries', function(req, res, next) {
    var reqlib = require('app-root-path').require;
    var Itinerary = reqlib('/models/Itinerary.js');

    Itinerary.find({}, function(err, itineraries) {
        if (err) throw err;

        res.render('edit_itineraries', { itineraries: itineraries } );
    });

    res.render('edit_itineraries');
});

module.exports = router;