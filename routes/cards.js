var express = require('express'),
    router = express.Router(),
    cardCtrl = require('../controllers/cardController');
    
router.get('/', function (req, res) {
    return cardCtrl.list(req, res);
});

router.get('/cardType/:cardType', function (req, res) {
    return cardCtrl.listByType(req, res, req.params.cardType);
});

router.post('/', function (req, res) {
    return cardCtrl.create(req, res);
});

module.exports = router;