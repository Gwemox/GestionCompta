module.exports.controller = function(router, protectRoute, models){
    console.log('[INFO] Export route : GET /');
    router.get('/', function(req, res, err) {
        res.render('home/index', { token: req.decoded })
    });
    console.log('[INFO] Export route : GET /home');
    router.get('/home', function (req, res) {
        res.render('home/index', { token: req.decoded })
    });
}
