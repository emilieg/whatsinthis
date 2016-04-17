var fs = require('fs');
var request = require('request');
var cheerio = require('cheerio');
var Promise = require('bluebird');
var Firebase = require('../models/Firebase');
var Factual = require('factual-api');
var factual = new Factual('ucdlw2DnmCkN0BkFUNWu8tnwGYG2xsm6ySqIqAp1', 'BGYXhK0r6FpO1XXWsOgJP5qE15GjjQVJNhzgyw0x');
var foodData = require('../models/food-data');

function definitions(ingredients) {
    ingredients.forEach(function(i) {
        console.log(i.toLowerCase());
        var data = foodData.data[i.toLowerCase()];
        if (data){
            console.log(data.def);
        }
    });
}

// use this as a way to test your api calls
// node test/testWhatsIsThis.js will call this method
exports.go = function() {
    // build your api calls here

    // var key = "ucdlw2DnmCkN0BkFUNWu8tnwGYG2xsm6ySqIqAp1"
    //var url = "http://toxgate.nlm.nih.gov/cgi-bin/sis/search2/x?dbs+<db>:<keyword>?key=" + key;
    //
    // var url = "http://api.v3.factual.com/t/products-cpg?q=shampoo?key=";
    // console.log("testing api calls");

    // return new Promise(function (resolve, reject) {
    //     request(url, function (error, response, body){
    //         if (error) {
    //             reject(error);
    //         }
    //         console.log(response);
    //         return JSON.parse(body);
    //     })
    // })
    var upc = 611269357011;



    factual.get('/t/products-cpg-nutrition?q=' + upc, function (error, res) {
        var ingredients = res.data[0].ingredients;
        var brand = res.data[0].brand;
        var category = res.data[0].category;
        var image_urls = res.data[0].image_urls[0];
        var product_name = res.data[0].product_name;

        console.log(product_name);
        console.log(definitions(ingredients));
    });


}

exports.getData = function(id) {
    console.log("getting data for " + id);

    return new Promise (function(resolve, reject){
        factual.get('/t/products-cpg-nutrition?q=' + id, function (error, res) {
            var ingredients = res.data[0].ingredients;
            var brand = res.data[0].brand;
            var category = res.data[0].category;
            var image_urls = res.data[0].image_urls[0];
            var product_name = res.data[0].product_name;

            //console.log(product_name);
            //console.log(definitions(ingredients));

            resolve({
                ingredients: ingredients,
                brand: brand,
                category: category,
                image_urls: image_urls,
                product_name: product_name,
                ingredientToInfoMapping: foodData
            });

        });
    });

}