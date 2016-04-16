var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var Promise = require('bluebird');
var Firebase = require('../models/Firebase');


exports.go = function() {

    var url = "";


    return new Promise(function (resolve, reject) {
        request(url, function (error, response, html){
            if (error) {
                reject(error);
            }
        })
    })
}