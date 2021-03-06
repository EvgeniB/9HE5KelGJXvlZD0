// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var userSchema = new Schema({
    name: String,
    email: { type: String, required: true, unique: true },
    username: { type: String, required: false, unique: true },
    password: { type: String, required: true },
    admin: Boolean,
    saved_itineraries : [{ type: mongoose.Schema.ObjectId, ref: 'Itinerary' }]
});

// the schema is useless so far
// we need to create a model using it
var User = mongoose.model('User', userSchema, 'User');

//testing this
//var exports = module.exports = {};

// make this available to our users in our Node applications
module.exports = User;

//exports.User = User;

//make userSchema available for population
//exports.userSchema = userSchema;