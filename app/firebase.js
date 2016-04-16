var express = require('express');
var router = express.Router();
var Firebase = require('../models/Firebase');

router.use(function(req, res, next) {
    console.log('Request id', Math.random());
    next();
});

router.get('/', function(req, res) {
    var query = req.query;
    console.log(query);
    res.json({ message: 'firebase!', queryString: query });
});

router.route('/recipes/:id')
    .get(function(req, res) {
        console.log(req.params.id);

        Firebase.getRecipes(req.params.id)
            .then(function(data) {
                console.log(data);
                res.send(data);
            })
            .catch(function(error) {
                console.log(error);
                res.send(error);
            });
    });

router.route('/budget/:id')
    .get(function(req, res) {
        console.log(req.params.id);

        Firebase.getBudget(req.params.id)
            .then(function(data) {
                console.log(data);
                res.send(data);
            })
            .catch(function(error) {
                console.log(error);
                res.send(error);
            });
    });

router.route('/getAll')
    .get(function(req, res) {

        Firebase.getAllData()
            .then(function(data) {
                console.log(data);
                res.send(data);
            })
            .catch(function(error) {
                console.log(error);
                res.send(error);
            });
    });

module.exports = router;