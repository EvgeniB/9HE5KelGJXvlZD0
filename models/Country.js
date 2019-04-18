// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var countrySchema = new Schema({
    Name: String,
    Subtitle: String,
    WhyText: String,
    HeaderImage: { type: Schema.Types.Buffer },
    Images: [{
        Filename: String,
        Content: { type: Schema.Types.Buffer } // mongoose.Schema.Buffer
    }],
    QuickFacts: String,
    TopDestinations: String,
    TravelSeason: String,
    PassportVisa: String,
    RelatedItineraries: [{ type: Schema.Types.ObjectId, ref: 'Itinerary' }]
});

// the schema is useless so far
// we need to create a model using it
var Country = mongoose.model('Country', countrySchema, 'Country');

// make this available to our users in our Node applications
module.exports = Country;