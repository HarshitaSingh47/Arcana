var express = require('express'),
    router = express.Router(),
    userProfileCtrl = require('../controllers/userProfileController');
    
router.get('/:userId', function (req, res) {
    return userProfileCtrl.getById(req, res, req.params.userId);
});
    
router.post('/', function (req, res) {
    return userProfileCtrl.createUserProfile(req, res);
});

module.exports = router;