module.exports = {

    get_login: function (req, res)
    {
        console.log("Here");
        res.render('login');
    },

    post_login: function (req, res, next) {
        var reqlib = require('app-root-path').require;
        var User = reqlib('/models/User.js');


        // register new user
        var usr = req.body.username;
        var pw = req.body.password;
        var newUser = new User({username: usr, password: pw});
        if (usr && pw) {

            newUser.save(function (err) {
                if (err)
                    console.log('Error on save!')
            });

            res.render('login', {title: 'Express', user: user});

        }
    }

};