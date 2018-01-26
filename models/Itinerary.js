// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var itinerarySchema = new Schema({
    Days: [{
        Events: [{
            Label: String,
            Type:  [Schema.Types.ObjectId],
            Time: Date,
            Description: String,
            Tips: String,
            Photo: String,
            Price: String,
            Hours: String,
            Address: String,
            Phone: Number,
            Website: String,
            AudioGuides: Boolean,
            BookLink: String,
            Transportation: String,
            Reviews: String
        }],
        Title: String,
        Date: Date,
        Countries: [Schema.Types.ObjectId],
        Locations: [Schema.Types.ObjectId],
        Overnight: String
    }],
    Title: String,
    Description: String,
    Countries: [{ type: Schema.Types.ObjectId, ref: 'Country' }], //This is how to link collections
    Locations: [Schema.Types.ObjectId],
    Featuring: [Schema.Types.ObjectId],
    DayLength: Number,
    NightLength: Number,
    Theme: [Schema.Types.ObjectId],
    ImageUrl: String,
    User: [Schema.Types.ObjectId]
});

// the schema is useless so far
// we need to create a model using it
var Itinerary = mongoose.model('Itinerary', itinerarySchema, 'Itinerary');

// make this available to our users in our Node applications
module.exports = Itinerary;

//exports.Itinerary = Itinerary;