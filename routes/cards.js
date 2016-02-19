var express = require('express'),
    router = express.Router(),
    cardCtrl = require('../controllers/cardController');
    
router.get('/', function (req, res) {
    return cardCtrl.list(req, res);
});

router.get('/id/:cardId', function (req, res) {
    return cardCtrl.getById(req, res, req.params.cardId);
});

router.get('/cardType/:cardType', function (req, res) {
    return cardCtrl.listByType(req, res, req.params.cardType);
});

router.post('/', function (req, res) {
    return cardCtrl.createCard(req, res);
});

router.put('/', function (req, res) {
    return cardCtrl.updateCard(req, res);
});

router.post('/deleteCard', function (req, res) {
    return cardCtrl.deleteCard(req, res);
});

module.exports = router;