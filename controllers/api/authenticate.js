const mongoose = require("mongoose");
var hash = require('../../helpers/hash.js');
var jwt    = require('jsonwebtoken');

/* Secret for JWT */
const secretJWT = 'jaimeynovingesupetsfr';

module.exports.controller = function(router, protectRoute, models){
    router.post('/authenticate', function(req, res) {
        var User = mongoose.model("User");
        // find the user
        User.findOneEnabled({
            email: req.body.email
        }, function(err, user) {

            if (err) throw err;

            if (!user) {
                res.json({ success: false, message: 'Authentication failed. User not found.' });
            } else if (user) {

                // check if password matches
                if (!hash.comparePassword(req.body.password, user.password)) {
                    res.json({ success: false, message: 'Authentication failed. Wrong password.' });
                } else {

                    // if user is found and password is right
                    // create a token with only our given payload
                    const payload = {
                        user: user
                    };
                    var token = 'Bearer ' + jwt.sign(payload, secretJWT, {
                        expiresIn: 24*60*60 // expires in 24 hours
                    });

                    /* Set cookie in response */
                    res.cookie('jwtToken', token, { maxAge: 24*60*60*1000, httpOnly: true });
                    /* return the information including token as JSON */
                    res.send({
                        success: true,
                        message:'You are authenticated !',
                        token: token
                    });
                }
            }
        });
    });
}
