var express = require('express');
var router = express.Router();

router.get('/details/:title', function(req, res, next) {
    var reqlib = require('app-root-path').require;
    var Itinerary = reqlib('/models/Itinerary.js');
    var title = req.params.title;

    Itinerary.find({ Title: title }, function(err, itineraries) {
        if (err) throw err;

        res.render('details', { itineraries: itineraries } );
    });

    res.render('details');
});

module.exports = router;