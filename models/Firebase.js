var Firebase = require("firebase");
var ref = new Firebase("https://whatsinthis.firebaseio.com/");
var refUrl = "https://nwhacksfoodie.firebaseio.com/";
var Promise = require('bluebird');

exports.setState = function(id, state) {
    var ref =  new Firebase(refUrl + id);

    ref.update({
        state: state
    });
}
