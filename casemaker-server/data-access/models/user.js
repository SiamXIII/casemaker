var mongoose = require('mongoose');
var Schema = mongoose.Schema;
var bcrypt = require('bcryptjs');
var SALT_WORK_FACTOR = 10;
var jwt = require('jsonwebtoken');

// User schema
var User = new Schema({
    username: {type: String, required: true, unique: true},
    password: {type: String, required: true}
});

// Bcrypt middleware on UserSchema
User.pre('save', function (next) {
    var user = this;

    if (!user.isModified('password')) return next();

    bcrypt.genSalt(SALT_WORK_FACTOR, function (err, salt) {
        if (err) return next(err);

        bcrypt.hash(user.password, salt, function (err, hash) {
            if (err) return next(err);
            user.password = hash;
            next();
        });
    });
});

//Password verification
User.methods.comparePassword = function (password, cb) {
    bcrypt.compare(password, this.password, function (err, isMatch) {
        if (err) return cb(err);
        cb(isMatch);
    });
};

exports.login = function (req, res) {
    var Users = mongoose.model('User', User);

    var username = req.body.username || '';
    var password = req.body.password || '';

    if (username == '' || password == '') {
        return res.send(401);
    }

    Users.findOne({username: username}, function (err, user) {
        if (err || !user) {
            console.log(err);
            return res.send(401);
        }

        user.comparePassword(password, function (isMatch) {
            if (!isMatch) {
                console.log("Attempt failed to login with " + user.username);
                return res.send(401);
            }

            var token = jwt.sign(user, 'shhhhhhared-secret', {expiresInMinutes: 60});

            return res.json({token: token});
        });

    });
};
/**
 * Created by Siam on 6/10/2015.
 */
