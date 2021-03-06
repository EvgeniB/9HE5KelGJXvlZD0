// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var locationSchema = new Schema({
    Name: String,
    Country: { type: Schema.Types.ObjectId, ref: 'Country' }
});

// the schema is useless so far
// we need to create a model using it
var Location = mongoose.model('Location', locationSchema, 'Location');

// make this available to our users in our Node applications
module.exports = Location;