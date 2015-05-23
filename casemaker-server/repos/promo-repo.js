var promosDataAccess = require('../data-access/data-access.js').Promos;
var ObjectID = require('mongodb').ObjectID;

var instance = {
    getPromos: function (query, callback) {
        promosDataAccess.find(query)
            .exec(callback);
    },

    savePromo: function (promo, callback) {

        promo._id = promo._id || new ObjectID();

        promosDataAccess.findOneAndUpdate({'_id': promo._id}, promo, {upsert: true}, function (err, data) {
            if (!err) {
                callback('OK');
            }
        });
    },

    deletePromo: function (id, callback) {
        promosDataAccessDataAccess.remove({_id: id}, callback);
    }
}

module.exports = function () {
    return instance;
}

/**
 * Created by Siam on 7/29/2015.
 */
