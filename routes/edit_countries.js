var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    require('./helpers/account_system').checkAdmin(user, res);

    var mongoose = require('mongoose');
    var CountrySchema = mongoose.model('Country').schema;
    var Country = mongoose.model('Country', CountrySchema, 'Country');

    Country.find({}, function(err, countries) {

        console.log(countries);
        if (err) throw err;

        res.render('edit_countries', { countries: countries, _user: user } );
    });
});

router.post('/', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    require('./helpers/account_system').checkAdmin(user, res);

    var mongoose = require('mongoose');
    var CountrySchema = mongoose.model('Country').schema;
    var Country = mongoose.model('Country', CountrySchema, 'Country');

    var todo = req.body.todo;
    var id = req.body.id;
    var name = req.body.name ? req.body.name : "";
    console.log(name);

    if (todo == 'delete') {
        Country.findOneAndRemove({_id: id}, function (err) {
            if (err) throw err;

            console.log('Country deleted!');
            Country.find({}, function (err, countries) {
                if (err) throw err;

                res.render('edit_countries', {countries: countries, _user: user});
            });
        });
    }
});

module.exports = router;