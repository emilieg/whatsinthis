var express = require('express');
var router = express.Router();
var Firebase = require('../models/Firebase');
var fractural = require("./fractural");
// this is an example of defining your routes that you are exposing

router.use(function(req, res, next) {
    console.log('Request id', Math.random());
    next();
});

// example 1
router.get('/', function(req, res) {
    var query = req.query;
    console.log(query);
    //res.json({ message: 'firebase!', queryString: query });

    var id = query.id;
    fractural.getData(id).then(function(result){
        console.log("ok.." + result);
        res.send(result);
    });
});

// example 2
router.route('/test/:id')
    .get(function(req, res) {
        console.log(req.params.id);
        res.send("OK")
    });

// example 3 - when you call /getDataFromStorage, it will call the function Firebase.getAllData() from models/Firebase.js
router.route('/getDataFromStorage')
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