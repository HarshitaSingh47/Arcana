var express = require('express'),
    router = express.Router(),
    userCtrl = require('../controllers/userController');

router.post('/', function (req, res) {
    return userCtrl.createUser(req, res);
});

module.exports = router;