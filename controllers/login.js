module.exports.controller = function(router, protectRoute, models){
    console.log('[INFO] Export route : GET /login');
    router.get('/login', function (req, res) {
        res.render('login/index', { token: req.decoded })
    });
}
