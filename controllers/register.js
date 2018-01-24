module.exports.controller = function(router, protectRoute, models){
    console.log('[INFO] Export route : GET /register');
    router.get('/register', function (req, res) {
        res.render('register/index', { token: req.decoded })
    });
}
