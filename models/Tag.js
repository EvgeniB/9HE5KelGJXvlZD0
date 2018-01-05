// grab the things we need
var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// create a schema
var tagSchema = new Schema({
    Title: String
});

// the schema is useless so far
// we need to create a model using it
var Tag = mongoose.model('Tag', tagSchema);

// make this available to our users in our Node applications
module.exports = Tag;