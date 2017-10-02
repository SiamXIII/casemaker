var promosDataAccess = require('../data-access/data-access.js').Promos;
var ObjectID = require('mongodb').ObjectID;

var instance = {
    getAllPromos: function (callback) {
        promosDataAccess.find()
            .exec(callback);
    },

    savePromo: function (promo, callback) {

        var promo = new promosDataAccess(promo);
        promo._id = promo._id || new ObjectID();
        promo.save(function (err, data) {
            if (!err) {
                callback('OK');
            }
        });
    },

    deletePromo: function (id, callback) {
        promosDataAccess.remove({_id: id}, callback);
    }
}

module.exports = function () {
    return instance;
}