var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var Promise = require('bluebird');
var Firebase = require('../models/Firebase');

// use this as a way to test your api calls
// node test/testWhatsIsThis.js will call this method
exports.go = function() {
    // build your api calls here

    var url = "http://services.aonaware.com/DictService/DictService.asmx/Define?word=floride";
    console.log("testing api calls");

    return new Promise(function (resolve, reject) {
        request(url, function (error, response, html){
            if (error) {
                reject(error);
            }
            console.log(response);
        })
    })
}