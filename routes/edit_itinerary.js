var express = require('express');
var router = express.Router();

router.get('/edit_itinerary/:title', function(req, res, next) {
    var reqlib = require('app-root-path').require;
    var Itinerary= reqlib('/models/Itinerary.js');

    var iti = req.params.title;

    Itinerary.find({ Title: iti }, function(err, itinerary) {
        if (err) throw err;

        console.log(itinerary);

        res.render('edit_itinerary', { Title: itinerary });
    });

    res.render('edit_itinerary');
});

router.post('/edit_itinerary/:title', function(req, res, next) {
    var reqlib = require('app-root-path').require;
    var Itinerary= reqlib('/models/Itinerary.js');

    // save itinerary
    var iti = req.params.title;
    var isAdmin = req.body.isadmin;

    Itinerary.findOneAndUpdate({ Title: iti }, { isAdmin: isAdmin }, function(err, itinerary) {
        if (err) throw err;

        // we have the updated itinerary returned to us
        console.log(itinerary);
    });

    res.render('edit_itinerary');
});


module.exports = router;