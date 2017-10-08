var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schemas
var Promo = new Schema({
    '_id': Schema.ObjectId,
    'name': String,
    'url': String,
    'imageUrl': String,
    'imageType': String
});

module.exports = mongoose.model('Promo', Promo);
/**
 * Created by Siam on 5/30/2015.
 */
