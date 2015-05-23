var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schemas
var Ware = new Schema({
    '_id': Schema.ObjectId,
    'key': String,
    'name': String,
    'description': String,
    'price': Number,
    'isDesignable': Boolean,
    'additionalImages': [
        {
            'imageUrl': String,
            'imageType': String
        }],
    'imageUrl': String,
    'imageType': String,
    'category': String,
    'wareUrl': String,
    'overlayUrl': String,
    'detailsUrl': String,
    'wareImageType': String,
    'overlayImageType': String,
    'detailsImageType': String
});

module.exports = mongoose.model('Ware', Ware);