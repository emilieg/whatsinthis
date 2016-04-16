var path = require('path');
var bodyParser = require('body-parser');
var express = require('express');
var app = express();
const fs = require('fs');
//------------------------------------------------------------------------------
//------------------------------------------------------------------------------

var firebase = require('./app/firebase');
app.use('/', firebase);

//------------------------------------------------------------------------------
var whatsisthis = require("./app/whatsinthis");

//------------------------------------------------------------------------------

var port = process.env.PORT || 3000;
var IP = process.env.IP || "0.0.0.0";
console.log("listening on port", port);
app.listen(port, IP);
