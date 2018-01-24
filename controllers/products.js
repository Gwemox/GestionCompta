const mongoose = require('mongoose');

module.exports.controller = function(router, protectRoute, models){
    console.log('[INFO] Export protected route : GET /products');
    router.get('/products', protectRoute, function(req, res, err) {
        mongoose.model("Product").findEnabled({}, function(err, result){
            if (err) res.json(err);
            else res.render('product/list', { token: req.decoded, products: result});
        }, req.query.limit, req.query.offset);

    });

    console.log('[INFO] Export protected route : GET /product/:id');
    router.get('/product/:id', protectRoute, function(req, res, err) {
        mongoose.model("Product").findOneEnabled({_id: req.params.id}, function(err, result){
            if (err) res.json(err);
            else res.render('product/show', { token: req.decoded, product: result});
        }, req.query.limit, req.query.offset);

    });
}
