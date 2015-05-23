var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schemas
var Order = new Schema({
    '_id': Schema.ObjectId,
    '_ware': {
        type: Schema.ObjectId,
        ref: 'Ware'
    },
    'shippingAddress': String,
    'phone': String,
    'orderDate': Date,
    'orderNum': Number,
    'eMail': String,
    'status': String,
    'imageUrl': String,
    'imageType': String,
    'imageId': String,
    'customImages': [String],
    'sellPrice': Number
});

module.exports = mongoose.model('Order', Order);
/**
 * Created by Siam on 5/28/2015.
 */
/**
 * Created by Siam on 6/11/2015.
 */
