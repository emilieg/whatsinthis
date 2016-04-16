var Firebase = require("firebase");
var refUrl = "https://whatsinthis.firebaseio.com/";
var Promise = require('bluebird');

// this is an example of adding data into firebase
exports.setState = function(id, state) {
    var ref =  new Firebase(refUrl + id);

    ref.update({
        state: state
    });
}

// this is an example of getting all data from firebase
exports.getAllData = function () {
    return new Promise(function(resolve, reject) {
        var ref = new Firebase(refUrl);
        ref.on("value", function(data) {
            console.log("got some data");
            if (data.val() == null) {
                console.log("got no data");
                resolve("");
            }
            var result = data.val();

            resolve(
                result
            )
        }, function(errorObject) {
            console.log("failed");
            reject(errorObject.code);
        });
    });
}