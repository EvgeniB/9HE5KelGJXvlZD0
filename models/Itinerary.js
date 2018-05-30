// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var itinerarySchema = new Schema({
    Days: [{
        Events: [{
            Label: String,
            EventType:  {
                type: String,
                enum : ['Flight', 'Hotel', 'Meal', 'Rest', 'Optional', 'Location', 'Custom'],
                default: 'Custom'
            },
            Time: String, //Date
            Description: String,
            Tips: String,
            Photo: String,
            Price: String,
            Hours: String,
            Address: String,
            Phone: String, //Number
            Website: String,
            AudioGuides: String, //Boolean
            BookLink: String,
            Transportation: String,
            Reviews: String,
            Name: String,
            Confirmation: String,
            Flight: String,
            Airline: String,
            Terminal: String,
            Gate: String,
            Booked_Through: String,
            Check_in: String,
            Check_out: String,
            Icon: String
        }],
        Title: String,
        Date: Date,
        Day_Countries: [{ type: Schema.Types.ObjectId, ref: 'Country' }],
        Day_Areas: [{ type: Schema.Types.ObjectId, ref: 'Area'}],
        Day_Locations: [{ type: Schema.Types.ObjectId, ref: 'Location'}],
        Overnight: String
    }],
    Title: String,
    Description: String,
    Start_Date: String,
    Countries: [{ type: Schema.Types.ObjectId, ref: 'Country' }], //This is how to link collections
    Locations: [{ type: Schema.Types.ObjectId, ref: 'Location'}],
    DayLength: Number,
    NightLength: Number,
    Theme: [{ type: Schema.Types.ObjectId, ref: 'Tag'}],
    Features: [{ type: Schema.Types.ObjectId, ref: 'Feature'}],
    ImageUrl: String
});

// the schema is useless so far
// we need to create a model using it
var Itinerary = mongoose.model('Itinerary', itinerarySchema, 'Itinerary');

// make this available to our users in our Node applications
module.exports = Itinerary;

//exports.Itinerary = Itinerary;