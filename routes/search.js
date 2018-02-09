var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    //checkAdmin(user, res);

    var mongoose = require('mongoose');
    //This is how to get schema
    var itinerarySchema = require('mongoose').model('Itinerary').schema;
    var Itinerary = mongoose.model('Itinerary', itinerarySchema, 'Itinerary');

    var countrySchema = require('mongoose').model('Country').schema;
    var Country = mongoose.model('Country', countrySchema, 'Country');

    var tagSchema = mongoose.model('Tag').schema;
    var Tag = mongoose.model('Tag', tagSchema, 'Tag');

    var parameters = {};
    var country_name = req.query.country;

    Country.findOne({ Name: country_name }, function(err, country) {
        if (err)
            next(err);
        else {
            if (country) {
                parameters = { Countries : country._id };
            }

            Tag.find({}, function(err, tags) {
                if (err) next(err);

                var tagname;

                var themes = [];

                for(var i=0;i<tags.length;i++) {
                    tagname = req.query[tags[i].Name];
                    if (req.query[tags[i].Name])
                        themes.push(tags[i]._id);
                }


                var json_object = { $all: themes };
                if(themes.length > 0)
                    parameters.Theme = json_object;

                console.log('parameters ' + JSON.stringify(parameters));

                //The way to find itineraries given a list of Themes is as such
                //Itinerary.find({Theme: {$all: ['item1', 'item2', ...]}, rest of parameters})

                //This is how to populate using mongoose models
                Itinerary.find(parameters)
                    .populate([{path: 'Countries', model: 'Country'}])
                    .populate([{path: 'Locations', model: 'Location'}])
                    .populate([{path: 'Theme', model: 'Tag'}])
                    .exec(function (err, itineraries) {
                        // callback
                        console.log("callback");
                        console.log(itineraries);

                        res.render('search', {itineraries: itineraries, tags: tags, _user: user});
                    });
            });
        }
    })
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
                    //delete d1._id; // Doesn't work
                    d1._id = mongoose.Types.ObjectId();
                    d1.isNew = true;
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
                                }
                            });
                        });
                    });
                }
            }
        );
    }
    else
    if (type == 'search') {
        var text = req.body.search_field;
        var Tags = "";
        var tagname = "";

        var mongoose = require('mongoose');
        var tagSchema = mongoose.model('Tag').schema;
        var Tag = mongoose.model('Tag', tagSchema, 'Tag');

        Tag.find({}, function(err, tags) {
            if (err) next(err);

            for(var i=0;i<tags.length;i++) {
                tagname = req.body[tags[i].Name];
                if (req.body[tags[i].Name])
                    Tags += "&" + tagname + "=" + tagname;
                //Tags.push(req.body[tags[i].Name]);
                //console.log("Tag " + Tags[i]);
            }
            //console.log("Tags " + Tags);
            res.redirect('/search?country=' + text + Tags);
        });
    }
    else
        res.redirect('/search');
});

module.exports = router;