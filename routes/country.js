var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    var reqlib = require('app-root-path').require;

    res.render('country');
});

module.exports = router;