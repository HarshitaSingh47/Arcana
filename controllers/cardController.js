var Card = require('../models/card');

exports.list = function (req, res) {
    Card.find().exec(function (err, results) {
        if (err) {
            console.log(err);
            res.status(500).json({ error: err });
        } else {
            console.log(results);
            res.status(200).json(results);
        }
    });
};

exports.listByType = function (req, res, cardType) {
    var query = Card.find(),
        filter = cardType;
        
    if (filter.length > 0) {
        query.where({ cardType: filter });
    }
    
    query.exec(function (err, results) {
        if (err) {
            console.log(err);
            res.status(500).json({error: err});
        } else {
            console.log(results);
            res.status(200).json(results);
        }
    });
};

exports.create = function (req, res) {
    var card = new Card({
        cardType: req.body.cardType,
        cardName: req.body.cardName,
        burnValue: req.body.burnValue,
        description: req.body.description,
        flavorText: req.body.flavorText,
        genValue: req.body.genValue,
        health: req.body.health,
        instanceCost: req.body.instanceCost,
        maintenanceCost: req.body.maintenanceCost,
        power: req.body.power,
        rarity: req.body.rarity
    });
    
    card.save(function (err) {
        if (err) {
            res.status(500).json({error: err});
        } else {
            res.status(200);
        }
    });
}