var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
var morgan = require('morgan');
const fs = require('fs');
var methodOverride = require('method-override'); // simulate DELETE and PUT (express4)


//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

var firebase = require('./app/firebase');
app.use('/api', firebase);

app.use(express.static(__dirname + '/public'));                 // set the static files location /public/img will be /img for users
app.use(morgan('dev'));                                         // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'}));            // parse application/x-www-form-urlencoded
app.use(bodyParser.json());                                     // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride());

app.get('*', function(req, res) {
    res.sendfile('./public/index.html'); // load the single view file (angular will handle the page changes on the front-end)
});

//------------------------------------------------------------------------------
var whatsisthis = require("./app/whatsinthis");
var whatsisthis = require("./app/fractural");

//------------------------------------------------------------------------------

var port = process.env.PORT || 3000;
var IP = process.env.IP || "0.0.0.0";
console.log("listening on port", port);
app.listen(port, IP);
