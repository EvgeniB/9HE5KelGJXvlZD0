var express = require('express');
var router = express.Router();
var fs = require('fs');
var formidable = require('formidable')

router.get('/:id', function(req, res, next) {
    var mongoose = require('mongoose');
    var CountrySchema = mongoose.model('Country').schema;
    var Country = mongoose.model('Country', CountrySchema, 'Country');

    var id = req.params.id;

    Country.findOne({ _id: id }, function(err, country) {
        if (err) throw err;

        res.render('edit_country', { country: country });
    });
});

router.post('/:id', function(req, res, next) {
    var mongoose = require('mongoose');
    var CountrySchema = mongoose.model('Country').schema;
    var Country = mongoose.model('Country', CountrySchema, 'Country');

    var id = req.params.id;
    //var id = req.body.id;
    var name = req.body.name ? req.body.name : "";
    var subtitle = req.body.subtitle ? req.body.subtitle : "";
    var whytext = req.body.whytext ? req.body.whytext : "";
    var quickfacts = req.body.quickfacts ? req.body.quickfacts : "";
    var topdestinations = req.body.topdestinations ? req.body.topdestinations : "";
    var travelseason = req.body.travelseason ? req.body.travelseason : "";
    var passportvisa = req.body.passportvisa ? req.body.passportvisa : "";
    //console.log('file ' + req.files);
    //var image = fs.readFileSync(req.file.image);
    var form = new formidable.IncomingForm();

    var imageBin;

    form.parse(req, function(err, fields, files) {
        imageBin = Buffer.write(files);
        console.log(files);
        console.log(imageBin);
    });

    Country.findOneAndUpdate({ _id: id }, { Name: name, Subtitle: subtitle,
        WhyText: whytext, QuickFacts: quickfacts, TopDestinations: topdestinations,
        TravelSeason: travelseason, PassportVisa: passportvisa, HeaderImage: image }, function(err, country) {
        if (err) throw err;

        // we have the updated itinerary returned to us
        console.log(country);

        res.redirect('/edit_countries');
    });
});

module.exports = router;