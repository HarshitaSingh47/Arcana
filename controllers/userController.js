var User = require('../models/user');

exports.list = function (req, res) {
    User.find().exec(function (err, results) {
        if (err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).json(results);
        }
    });
};

exports.getById = function (req, res, id) {
    User.find().where({ '_id': id }).exec(function (err, results) {
        if (err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).json(results);
        }
    });
};

exports.getByFirebaseId = function (req, res, firebaseId) {
    User.find().where({ firebaseId: firebaseId }).exec(function (err, results) {
        if (err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).json(results);
        }
    });
};

exports.getByUsername = function (req, res, username) {
    User.find().where({ username: username }).exec(function (err, results) {
        if (err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).json(results);
        }
    });
};

exports.getByEmailAddress = function (req, res, email) {
    User.find().where({ emailAddress: email }).exec(function (err, results) {
        if (err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).json(results);
        }
    });
};

exports.create = function (req, res) {
    var user = new User({
        firebaseId: req.body.firebaseId,
        username: req.body.username,
        emailAddress: req.body.emailAddress,
        userCards: []
    });
    
    user.save(function (err) {
        if (err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).send();
        }
    });
};