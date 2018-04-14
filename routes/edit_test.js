var express = require('express');
var router = express.Router();

router.get('/', function(req, res, next) {
    res.render('edit_test');
});

module.exports = router;
