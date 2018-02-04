// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var countrySchema = new Schema({
    Name: String
});

// the schema is useless so far
// we need to create a model using it
var Country = mongoose.model('Country', countrySchema, 'Country');

// make this available to our users in our Node applications
module.exports = Country;