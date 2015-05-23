var mongoose = require('mongoose');
var config = require('../config/config.js');

var Ware = require('./models/ware.js');
var Category = require('./models/category');
var Slide = require('./models/slide');
var Order = require('./models/order');
var Promo = require('./models/promo');

mongoose.connect(config.get('mongoose:uri'));

var db = mongoose.connection;

module.exports.Wares = Ware;
module.exports.Categories = Category;
module.exports.Slides = Slide;
module.exports.Orders = Order;
module.exports.Promos = Promo;