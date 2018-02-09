var express = require('express');
var router = express.Router();

router.get('/:id', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    require('./helpers/account_system').checkAdmin(user, res);

    var mongoose = require('mongoose');
    var tagSchema = mongoose.model('Tag').schema;
    var Tag = mongoose.model('Tag', tagSchema, 'Tag');

    var id = req.params.id;

    Tag.findOne({ _id: id }, function(err, tag) {
        if (err) throw err;

        res.render('edit_tag', { tag: tag, _user: user });
    });
});

router.post('/:id', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    require('./helpers/account_system').checkAdmin(user, res);

    var mongoose = require('mongoose');
    var tagSchema = mongoose.model('Tag').schema;
    var Tag = mongoose.model('Tag', tagSchema, 'Tag');

    // save itinerary
    var id = req.params.id;
    //var id = req.body.id;
    var name = req.body.name ? req.body.name : "";

    Tag.findOneAndUpdate({ _id: id }, { Name: name}, function(err, tag) {
        if (err)
            next(err);

        // we have the updated itinerary returned to us
        //console.log(tag);

        res.redirect('/edit_tags');
    });
});

module.exports = router;