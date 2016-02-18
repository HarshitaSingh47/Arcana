var express = require('express'),
    router = express.Router(),
    userCtrl = require('../controllers/userController');
    
router.get('/', function (req, res) {
    return userCtrl.list(req, res);
});

router.get('/id/:userId', function (req, res) {
    return userCtrl.getById(req, res, req.params.userId);
});

router.get('/firebaseId/:firebaseId', function (req, res) {
    return userCtrl.getByFirebaseId(req, res, req.params.firebaseId);
});

router.get('/username/:username', function (req, res) {
    return userCtrl.getByUsername(req, res, req.params.username);
});

router.get('/email/:email', function (req, res) {
    return userCtrl.getByEmailAddress(req, res, req.params.email);
});

router.post('/', function (req, res) {
    return userCtrl.create(req, res);
});

module.exports = router;