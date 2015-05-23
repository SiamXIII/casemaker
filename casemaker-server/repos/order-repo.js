var ordersDataAccess = require('../data-access/data-access.js').Orders;
var ObjectID = require('mongodb').ObjectID;

var instance = {
    getOrders: function (query, callback) {
        ordersDataAccess.find(query)
            .populate('_ware')
            .exec(callback);
    },

    saveOrder: function (order, callback) {
        order._id = order._id || new ObjectID();

        ordersDataAccess.count(function (err, count) {
            order.orderNum = count + 1;

            ordersDataAccess.findOneAndUpdate({'_id': order._id}, order, {upsert: true}, function (err, data) {
                if (!err) {
                    callback('OK');
                }
            });
        });
    },

    deleteOrder: function (id, callback) {
        ordersDataAccess.remove({_id: id}, callback);
    }
}

module.exports = function () {
    return instance;
}
/**
 * Created by Siam on 6/11/2015.
 */
