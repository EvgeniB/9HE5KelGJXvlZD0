var express = require('express');
var router = express.Router();

/* GET users listing. */
router.get('/', function(req, res, next) {
    sess=req.session;

    sess.admin = false;
    sess.user = null;

    res.redirect('/');
});

module.exports = router;
