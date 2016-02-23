var Firebase = require('firebase'),
    fbRef = new Firebase('https://glaring-heat-7532.firebaseio.com/userProfiles');
    
exports.getById = function (req, res, id) {
    fbRef.child(id).once('value', function (snapshot) {
        var profile = snapshot.val();
        res.status(200).json(profile);
    }, function (error) {
        res.status(500).json({error: error});
    });
};
    
exports.createUserProfile = function (req, res) {
    fbRef.child(req.body.uid).set({
        username: req.body.username,
        emailAddress: req.body.emailAddress
    }, function (error) {
        if (error) {
            res.status(500).json({error: error});
        } else {
            res.status(200).send();
        }
    });
};