const mongoose = require('mongoose');
var pdf = require('html-pdf');
var options = { format: 'A4' };
var pug = require('pug');


module.exports.controller = function(router, protectRoute, models){
    console.log('[INFO] Export protected route : POST /order');
    router.post('/order', protectRoute, function(req, res, err) {
        let user = req.decoded.user;
        let productId = req.body.product;
        let quantity = req.body.quantity
        mongoose.model("Product").findOneEnabled({_id: productId}, function(err, productAdd){
            if (err) res.json(err);
            mongoose.model("Order").findOneOrCreate({user: user._id, paid: false, disabled: false}, function(err, result){
                if (err) res.json(err);
                else {
                    let productFound = false;
                    let tmpProducts = [];
                    if (productAdd._id && quantity) {
                        if(Array.isArray(result.products)) {
                            tmpProducts = result.products.map(function(product) {
                                if (new String(product.product._id).trim() === productId) {
                                    product.quantity = parseInt(product.quantity) + parseInt(quantity);
                                    productFound = true;
                                }
                                return product;
                            });
                        }

                        if(!productFound) {
                            tmpProducts.push({product: productAdd, quantity: quantity});
                        }
                    }

                    result.products = tmpProducts;
                    result.save();
                    res.render('order/new', { token: req.decoded, order: result});
                }
            });
        });

    });

    console.log('[INFO] Export protected route : POST /paid');
    router.post('/paid', protectRoute, function(req, res, err) {
        let user = req.decoded.user;
        let orderId = req.body.order;
        mongoose.model("Order").findOneEnabled({_id: orderId, user: user._id}, function(err, order){
            if (err) res.json(err);
            var html = pug.renderFile('./views/order/invoice.pug', {order: order});
            pdf.create(html, options).toBuffer(function(err, buffer){
                if (err) return console.log(err);
                order.paid = true;
                order.save()
                res.type('application/pdf');
                res.status(201).end(buffer, 'binary');
            });
        });

    });
}
