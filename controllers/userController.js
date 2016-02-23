var Firebase = require('Firebase'),
    fbRef = new Firebase('https://glaring-heat-7532.firebaseio.com');

exports.createUser = function (req, res) {
    var user = {
        email: req.body.email,
        password: req.body.password
    };
    
    fbRef.createUser(user, function (error, userData) {
        if (error) {
            res.status(500).json({error: error.code});
        } else {
            res.status(200).json(userData);
        }
    });
};