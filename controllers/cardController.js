var Card = require('../models/card');

exports.list = function (req, res) {
    Card.find().exec(function (err, results) {
        if (err) {
            res.status(500).json({ error: err });
        } else {
            res.status(200).json(results.data);
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
            res.status(500).json({error: err});
        } else {
            res.status(200).json(results);
        }
    });
};

exports.getById = function (req, res, cardId) {
    Card.find().where({ '_id': cardId }).exec(function (err, results) {
        if (err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).json(results);
        }
    });
}

exports.createCard = function (req, res) {
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
            res.status(200).send();
        }
    });
}

exports.updateCard = function (req, res) {
    var query = { '_id': req.body._id },
        update = {
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
        };
        
    Card.findOneAndUpdate(query, update, function (err, result) {
        if (err) {
            res.status(500).json({error: err});
        } else {
            res.status(200).send();
        }
    });
}

exports.deleteCard = function (req, res) {
    Card.find({ '_id': req.body.cardId }).remove(function (result) {
        res.status(200).send();
    });
}