var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    cardSchema = new Schema({
        cardType: {
            type: String,
            required: true
        },
        cardName: {
            type: String,
            required: true
        },
        burnValue: {
            type: String,
            required: false
        },
        description: {
            type: String,
            required: false
        },
        flavorText: {
            type: String,
            required: false
        },
        genValue: {
            type: Number,
            required: false
        },
        health: {
            type: Number,
            required: false
        },
        instanceCost: {
            type: Number,
            required: false
        },
        maintenanceCost: {
            type: Number,
            required: false
        },
        power: {
            type: Number,
            required: false
        },
        rarity: {
            type: String,
            required: true
        }
    });
    
module.exports = mongoose.model('Card', cardSchema, 'cards');