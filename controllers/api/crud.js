const mongoose = require("mongoose");
module.exports.controller = function(router, protectRoute, models){
    for (var model in models) {
        let modelClass = models[model];
        let route = '/' + modelClass.name.toLowerCase();

        console.log('[INFO] Export protected route : POST /api' + route);
        router.post(route, protectRoute, function(req,res,err){
            mongoose.model(modelClass.name).create(req.body, function(err, result) {
                if (err) {
                    res.statusCode = 400;
                    res.send(err);
                } else {
                    res.statusCode = 201;
                    res.send(result);
                }
            })
        });

        console.log('[INFO] Export protected route : GET /api' + modelClass.routeGets);
        router.get(modelClass.routeGets, protectRoute, function(req, res, err) {
            mongoose.model(modelClass.name).findEnabled({}, function(err, result){
                if (err) res.json(err);
                else res.json(result);
            }, req.query.limit, req.query.offset);
        });

        console.log('[INFO] Export protected route : GET /api' + route + '/:id');
        router.get(route + '/:id', protectRoute, function(req,res,err){
            mongoose.model(modelClass.name).findOneEnabled({_id: req.params.id}, function(err, resultat){
                if (err) res.json(res);
                else res.json(resultat)
            });
        });

        console.log('[INFO] Export protected route : PATCH /api' + route + '/:id');
        router.patch(route + '/:id', protectRoute, function(req,res,err){
            var id = req.params.id;

            mongoose.model(modelClass.name).findOneEnabled({_id: id}, function(error, entity){
                if (error) res.status(400).send(err);
                else {
                    Object.keys(req.body).forEach(function (key) {
                        entity[key] = req.body[key];
                    });
                    entity.save(function (err, updated){
                        if (err) res.status(400).send(err);
                        else res.status(204).send();
                    })
                }
            });
        })

        console.log('[INFO] Export protected route : DELETE /api' + route + '/:id');
        router.delete(route + '/:id', protectRoute, function(req,res,err){
            var id = req.params.id;
            if (!id){
                res.statusCode = 400;
                res.send("Need id to delete entity");
            }
            else {
                mongoose.model(modelClass.name).findByIdAndUpdate({_id: id}, {disabled: true}, function (err, resu) {
                    if (err) {
                        res.statusCode = 400;
                        res.send(err);
                    }
                    else {
                        res.json({
                            success: true,
                            message: 'Entity deleted'
                        });
                    }
                })
            }
        });
    }
}
