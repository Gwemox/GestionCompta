const mongoose = require("mongoose");
const fs = require('fs');
const join = require('path').join;
const Schema = mongoose.Schema;
var express = require('express');
var app = express();
var bodyParser = require('body-parser');
var cookieParser = require('cookie-parser');
var jwt = require('jsonwebtoken');

/* Secret for JWT */
const secretJWT = 'jaimeynovingesupetsfr';

/* Use BodyParser for body content */
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

/* Use CookieParser */
app.use(cookieParser());

/* Use pug engine for views */
app.set('view engine', 'pug');
app.locals.basedir = join(__dirname, 'views');

/* Set public directory */
app.use('/static', express.static('public'));

mongoose.connect('mongodb://localhost/projet', {useMongoClient: true});
mongoose.plugin(schema => { schema.options.usePushEach = true });
/* Use good Promise */
mongoose.Promise = Promise

const dirModels = join(__dirname, './models');
const excludeModels = [
    'baseModel.js'
]

var models = {}

/* Dynamic export models */
fs.readdirSync(dirModels)
    .filter(file => (~file.search(/^[^\.].*\.js$/) && excludeModels.indexOf(file) === -1))
.forEach(file => {
    let classModel = require(join(dirModels, file));
    let tmpModel = new classModel();
    models[tmpModel.constructor.name] = tmpModel;
    models[tmpModel.constructor.name].exportModel();
});

app.use(function(req, res, next) {
    var token = req.body.token || req.query.token || req.headers['Authorization'] || req.headers['authorization'] || req.cookies.jwtToken;
    if (token) {
        token = token.replace('Bearer ', '');
        jwt.verify(token, secretJWT, function(err, decoded) {
            if (!err) {
                req.decoded = decoded;
            }
        });
    }
    next();
})

/* Function to check authenticate user */
const protectRoute = function(req, res, next) {
    if (req.decoded) {
        next();
    } else {
        return res.status(401).send({ success: false, message: 'Failed to authenticate token.' });
    }
}

/* Declare API routes */
var apiRoutes = express.Router();
// dynamically include routes (Controller)
fs.readdirSync('./controllers/api/').forEach(function (file) {
    if(file.substr(-3) == '.js') {
        route = require('./controllers/api/' + file);
        route.controller(apiRoutes, protectRoute, models);
    }
});

/* Declare VIEWS routes */
var viewRoutes = express.Router();
// dynamically include routes (Controller)
fs.readdirSync('./controllers').forEach(function (file) {
    if(file.substr(-3) == '.js') {
        route = require('./controllers/' + file);
        route.controller(viewRoutes, protectRoute, models);
    }
});

/* Use ROUTER + protect */

app.use('/api/', apiRoutes);
app.use('/', viewRoutes);

/* Data Fixtures */
require(join(__dirname, '/helpers/dataFixtures.js'))

/* Start Server */
var server = app.listen(3000, function() {
    console.log("[INFO] Server started on http://localhost:3000/")
});

module.exports = server;