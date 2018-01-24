const mongoose = require("mongoose");
var hash = require('../../helpers/hash.js');
module.exports.controller = function(router, protectRoute, models){

    console.log('[INFO] Export route : POST /api/register');
    router.post('/register', function(req,res,err){
        var User = mongoose.model("User");
        req.body.password = hash.hashPassword(req.body.password);
        User.create(req.body, function(err, result) {
            if (err) {
                res.statusCode = 400;
                res.send(err);
            } else {
                res.statusCode = 201;
                res.send(result);
            }
        })
    });
}
