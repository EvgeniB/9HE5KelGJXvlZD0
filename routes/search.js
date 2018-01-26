var express = require('express');
var router = express.Router();


router.get('/', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    //checkAdmin(user, res);

    console.log("User: " + user);

    console.log("Here");
    var reqlib = require('app-root-path').require;
    //var Itinerary = reqlib('/models/Itinerary.js');
    var mongoose = require('mongoose');

    /*
    if (req.body.country != 'undefined') {
        console.log("Here2");
        Itinerary.find({ countries: req.body.country }).sort({DayLength: 'desc'}).exec(function(err, itineraries) {
            if (err) throw err;

            res.render('search', { itineraries: itineraries, _user: user } );
        });
    } else if(req.body.theme != 'undefined') {
        console.log("Here3");
        Itinerary.find({ countries: req.body.theme }).sort({DayLength: 'desc'}).exec(function(err, itineraries) {
            if (err) throw err;

            res.render('search', { itineraries: itineraries, _user: user } );
        });
    } else {

*/

//This is how to get schema
    var itinerarySchema = require('mongoose').model('Itinerary').schema;
    var Itinerary = mongoose.model('Itinerary', itinerarySchema, 'Itinerary');
    //console.log(itinerarySchema);

    //This is how to populate using mongoose models
    Itinerary.find()
        .populate([{path: 'Countries', model: 'Country'}])
        .populate([{path: 'Locations', model: 'Location'}])
        .exec(function (err, itineraries) {
            // callback
            console.log("callback");
            console.log(itineraries);

            res.render('search', { itineraries: itineraries, _user: user } );
        });

    //Itinerary.itinerarySchema.
    //find({}).
    //populate('Countries').
    //exec(function (err, itineraries) {
    //   if (err) return handleError(err);
    //   console.log('The itineraries are %s', user.saved_itineraries);

    //res.render('search', { itineraries: itineraries, _user: user } );

    //});





    /*
                Itinerary.find({}, function (err, itineraries) {
                console.log("Here4");
                if (err) throw err;

                console.log(itineraries);
                res.render('search', { itineraries: itineraries, _user: user } );
            });

                */
    //  }
});

router.post('/', function(req, res, next) {
    var mongoose = require('mongoose');
    //mongoose.connect('mongodb://heroku_4mvmv68l:ocg3ckt1oo1hqndkbtee0n322c@ds111895.mlab.com:11895/heroku_4mvmv68l');
    var sess = req.session;
    var user = sess.user;
    console.log("!!!!!!!!!!!!!!!" + user._id);

    var type = req.body.type;

    var UserSchema = require('mongoose').model('User').schema;
    var User = require('mongoose').model('User', UserSchema, 'User');

    if(type=='save') {

        var mongoose = require('mongoose');
        var ItinerarySchema = mongoose.model('Itinerary').schema;
        var Itinerary = mongoose.model('Itinerary', ItinerarySchema, 'Itinerary');

        var id = req.body.id;

        Itinerary.findById(id).exec(
            function(err, doc) {


                if (err || !doc) {
                    console.log("Error finding itinerary: " + err);
                    next(err);
                } else {
                    // Found itinerary
                    var d1 = doc;
                    delete d1._id;
                    d1.save(function (err, d2) {
                        //if (err) throw err;
                        if (err) {
                            console.log("Error saving cloned itinerary: " + err);
                            next(err);
                        }
                        console.log(user + " " + user._id);
                        // Itinerary saved
                        User.findById(user._id).exec(function (err, user) {
                            //User.findOne({ _id : user._id }).exec(function(err, user_) {//, function(err, user_) {
                            //if (err) throw err;
                            if (err || !user) {
                                console.log("Error finding user: " + err);
                                next(err);
                            }
                            console.log("User " + user);

                            user.saved_itineraries.push(d2._id);

                            User.findByIdAndUpdate(user._id, {saved_itineraries: user.saved_itineraries}, function (err, a) {
                                if (err || !a) {
                                    console.log("Error finding updated user: " + a);
                                    next(err);
                                }
                                else {

                                    // we have the updated user returned to us
                                    console.log(a);
                                    res.redirect('/search');


                                    //Itinerary.find({}, function (err, itineraries) {
                                    //    if (err) {
                                    //        return console.log("error: " + err);
                                    //    }
                                    //    res.render('search', {itineraries: [], _user: user});
                                    //});
                                }
                            });


                        });


                    });
                }
            }
        );
    }

    //res.render('search', { itineraries: [], _user: user } );

});

module.exports = router;