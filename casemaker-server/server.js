/**
 * Module dependencies.
 */

var express = require('express');
var routes = require('./routes');
var user = require('./routes/user');
var http = require('http');
var path = require('path');
var fs = require('fs');
var bodyParser = require('body-parser');
var multiparty = require('multiparty');
var cors = require('cors');

var app = express();
var waresRepo = require('./repos/ware-repo.js')();
var categoriesRepo = require('./repos/category-repo')();
var slidesRepo = require('./repos/slides-repo')();
var promosRepo = require('./repos/promos-repo')();
var ordersRepo = require('./repos/order-repo')();
var servicesRepo = require('./repos/service-repo')();

var users = require('./data-access/models/user');

app.set('port', 8080);

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', "*");
    res.setHeader('Access-Control-Allow-Headers', "Content-Type, Authorization");
    res.setHeader('Access-Control-Allow-Methods', "GET,PUT,POST,DELETE");
    next();
});

app.use(cors());

app.use(bodyParser.json({limit: '50mb'}));
app.use(bodyParser.urlencoded({limit: '50mb', extended: true}));

app.get('/api/wares', function (req, res) {
    waresRepo.getWares(req.query, function (err, data) {
        if (!err) {
            return res.send(data);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({error: 'Server error'});
        }
    });
});

app.get('/api/wares/:key', function (req, res) {
    waresRepo.getWareByKey(req.params.key, function (err, ware) {
        if (!err) {
            categoriesRepo.getCategoryByKey(ware.category, function (err, category) {
                return res.send({
                    ware: ware,
                    category: category
                });
            });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({error: 'Server error'});
        }
    });
});

app.get('/api/search/wares', function (req, res) {
    waresRepo.searchWares(req.query.name, function (err, data) {
        if (!err) {
            return res.send(data);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({error: 'Server error'});
        }
    });
});

app.get('/api/orders', function (req, res) {
    ordersRepo.getOrders(req.query, function (err, data) {
        if (!err) {
            return res.send(data);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({error: 'Server error'});
        }
    });
});

app.get('/api/categories', function (req, res) {
    categoriesRepo.getCategories(function (err, data) {
        if (!err) {
            return res.send(data);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({error: 'Server error'});
        }
    });
});

app.get('/api/categories/:key', function (req, res) {
    waresRepo.getWares({category: req.params.key}, function (err, wares) {
        if (!err) {
            categoriesRepo.getCategoryByKey(req.params.key, function (err, category) {
                return res.send({
                    category: category,
                    wares: wares
                });
            });
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({error: 'Server error'});
        }
    });
});

app.get('/api/slides', function (req, res) {
    slidesRepo.getAllSlides(function (err, data) {
        if (!err) {
            return res.send(data);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({error: 'Server error'});
        }
    });
});

app.get('/api/promos', function (req, res) {
    promosRepo.getAllPromos(function (err, data) {
        if (!err) {
            return res.send(data);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({error: 'Server error'});
        }
    });
});

app.get('/api/services', function (req, res) {
    servicesRepo.getServices(function (err, data) {
        if (!err) {
            return res.send(data);
        } else {
            res.statusCode = 500;
            log.error('Internal error(%d): %s', res.statusCode, err.message);
            return res.send({error: 'Server error'});
        }
    });
});

app.get('/api/images', function (req, res) {
    try {
        if (fs.lstatSync('images\/storage\/' + req.query.imageUrl)) {
            var img = fs.readFileSync('images\/storage\/' + req.query.imageUrl);
            res.writeHead(200, {
                'Content-Type': req.query.imageType
            });
            res.end(img, 'binary');
        }
        else {
            var img = fs.readFileSync('images\/storage\/empty-image.jpg');
            res.writeHead(200, {'Content-Type': req.query.imageType});
            res.end(img, 'binary');
        }
    } catch (ex) {
        res.writeHead(404);
        res.end();
    }
});

app.get('/api/customImages', function (req, res) {

});

app.post('/api/wares', function (req, res) {
    var item = req.body;

    waresRepo.saveWare(item, function (result) {
        res.send(result);
    });
});

app.post('/api/services', function (req, res) {
    var item = req.body;

    servicesRepo.saveService(item, function (result) {
        res.send(result);
    });
});

app.post('/api/categories', function (req, res) {
    var item = req.body;

    categoriesRepo.saveCategory(item, function (result) {
        res.send(result);
    });
});

app.post('/api/orders', function (req, res) {
    var item = req.body;

    ordersRepo.saveOrder(item, function (result) {
        res.send(result);
    });
});

app.post('/api/slides', function (req, res) {
    var item = req.body;

    slidesRepo.saveSlide(item, function (result) {
        res.send(result);
    });
});

app.post('/api/promos', function (req, res) {
    var item = req.body;

    promosRepo.savePromo(item, function (result) {
        res.send(result);
    });
});

app.post('/api/services', function (req, res) {
    var item = req.body;

    servicesRepo.saveService(item, function (result) {
        res.send(result);
    });
});

app.post('/api/upload', function (req, res) {
    var form = new multiparty.Form();

    form.parse(req, function (err, fields, files) {
        var file = files.Files[0];
        fs.readFile(file.path, 'binary', function (err, data) {
            // ...
            fs.writeFile('images\/storage\/' + file.originalFilename, data, 'binary',
                function (err) {
                    console.log('Upload completed:' + file.originalFilename);
                    res.send('Upload completed:' + file.originalFilename);
                }
            )
            ;
        });
    });
});

app.post('/api/uploadImage', function (req, res) {
    var fullImage = req.body.base64_image.source.replace(/^data:image\/png;base64,/, "");
    var customImages = [];
    req.body.custom_images.forEach(function (item) {
        customImages.push({
            title: item.title,
            source: item.source.replace(/^data:image\/.+;base64,/, "")
        });
    });

    fs.writeFile('images\/storage\/' + req.body.base64_image.title, fullImage, 'base64',
        function (err) {
            console.log('Upload completed:' + '123.png');
            res.send('Upload completed:' + '123.png');
        }
    );

    if (customImages.length) {
        customImages.forEach(function (item, index) {
            fs.writeFile('images\/storage\/' + item.title, item.source, 'base64',
                function (err) {
                    console.log('Upload completed:' + '234.png');
                    res.send('Upload completed:' + '234.png');
                }
            );
        });
    }
});

app.delete('/api/slides', function (req, res) {
    slidesRepo.deleteSlide(req.query.id, function () {
        res.send('Success');
    });
});

app.delete('/api/promos', function (req, res) {
    promosRepo.deletePromo(req.query.id, function () {
        res.send('Success');
    });
});

app.delete('/api/services', function (req, res) {
    servicesRepo.deleteService(req.query.id, function () {
        res.send('Success');
    });
});

app.delete('/api/categories', function (req, res) {
    categoriesRepo.deleteCategory(req.query.id, function () {
        res.send('Success');
    });
});

app.delete('/api/orders', function (req, res) {
    ordersRepo.deleteOrder(req.query.id, function () {
        res.send('Success');
    });
});

app.delete('/api/wares', function (req, res) {
    waresRepo.deleteWare(req.query.id, function () {
        res.send('Success');
    });
});

app.post('/login', users.login);

app.get('/', function (req, res) {
    res.send('Hello World');
});

http.createServer(app).listen(app.get('port'), function () {
    console.log('Express server listening on port ' + app.get('port'));
});
