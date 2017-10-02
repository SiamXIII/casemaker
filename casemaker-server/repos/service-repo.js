var servicesDataAccess = require('../data-access/data-access.js').Services;
var ObjectID = require('mongodb').ObjectID;

var instance = {
    getServices: function (query, callback) {
        servicesDataAccess.find(query)
            .exec(callback);
    },

    saveService: function (service, callback) {

        service._id = service._id || new ObjectID();

        servicesDataAccess.findOneAndUpdate({'_id': service._id}, service, {upsert: true}, function (err, data) {
            if (!err) {
                callback('OK');
            }
        });
    },

    deleteService: function (id, callback) {
        servicesDataAccessDataAccess.remove({_id: id}, callback);
    }
}

module.exports = function () {
    return instance;
}

/**
 * Created by Siam on 7/29/2015.
 */
