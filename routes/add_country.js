var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    res.render('add_country', { _user: user });
});

router.post('/', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    require('./helpers/account_system').checkAdmin(user, res);

    var mongoose = require('mongoose');
    var CountrySchema = mongoose.model('Country').schema;
    var Country = mongoose.model('Country', CountrySchema, 'Country');

    var name = req.body.name ? req.body.name : "";

    var new_country = new Country({ Name: name });
    console.log("New country: " + new_country);

    new_country.save(function (err) {
        if (err)
            console.log('Error on save!')

        res.redirect('/edit_countries');
    });
});

module.exports = router;