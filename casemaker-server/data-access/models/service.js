var mongoose = require('mongoose');
var Schema = mongoose.Schema;

// Schemas
var Service = new Schema({
    '_id': Schema.ObjectId,
    'title': String,
    'imageUrl': String,
    'imageType': String,
    'link': String
});

module.exports = mongoose.model('Service', Service);

