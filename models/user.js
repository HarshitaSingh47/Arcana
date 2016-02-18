var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    Card = require('./card'),
    userSchema = new Schema({
        username: {
            type: String,
            required: true
        },
        emailAddress: {
            type: String,
            required: true
        },
        userCards: {
            type: [Card],
            required: false
        }
    });
    
module.exports = mongoose.model('User', userSchema, 'users');