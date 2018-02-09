var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    require('./helpers/account_system').checkAdmin(user, res);

    var mongoose = require('mongoose');
    var tagSchema = mongoose.model('Tag').schema;
    var Tag = mongoose.model('Tag', tagSchema, 'Tag');

    Tag.find({}, function(err, tags) {
        if (err)
            next(err);

        res.render('edit_tags', { tags: tags, _user: user } );
    });
});

router.post('/', function(req, res, next) {
    var sess=req.session;
    var user = sess.user;

    require('./helpers/account_system').checkAdmin(user, res);

    var mongoose = require('mongoose');
    var tagSchema = mongoose.model('Tag').schema;
    var Tag = mongoose.model('Tag', tagSchema, 'Tag');

    var todo = req.body.todo;
    var id = req.body.id;
    var name = req.body.name ? req.body.name : "";
    console.log(name);

    if (todo == 'delete') {
        Tag.findOneAndRemove({_id: id}, function (err) {
            if (err) throw err;

            console.log('Tag deleted!');
            Tag.find({}, function (err, tags) {
                if (err) throw err;

                res.render('edit_tags', {tags: tags, _user: user});
            });
        });
    }
});

module.exports = router;