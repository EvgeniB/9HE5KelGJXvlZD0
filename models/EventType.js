// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var eventTypeSchema = new Schema({
    Name: String
});

// the schema is useless so far
// we need to create a model using it
var EventType = mongoose.model('EventType', eventTypeSchema);

// make this available to our users in our Node applications
module.exports = EventType;