var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    res.render('add_tag', { _user: user });
});

router.post('/', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    require('./helpers/account_system').checkAdmin(user, res);

    var mongoose = require('mongoose');
    var tagSchema = mongoose.model('Tag').schema;
    var Tag = mongoose.model('Tag', tagSchema, 'Tag');

    var name = req.body.name ? req.body.name : "";

    var new_tag = new Tag({ Name: name });
    //console.log("New tag: " + new_tag);

    new_tag.save(function (err) {
        if (err) {
            console.log('Error on save!')
            next(err);
        }

        res.redirect('/edit_tags');
    });
});

module.exports = router;