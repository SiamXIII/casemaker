var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schemas
var Promo = new Schema({
    '_id': Schema.ObjectId,
    'title': String,
    'description': String,
    'imageUrl': String,
    'imageType': String,
    'link': String
});

module.exports = mongoose.model('Promo', Promo);

