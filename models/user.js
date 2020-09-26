const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
    username: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    likedPlays: [{
        type: 'ObjectId',
        ref: 'Plays'
    }]
});

module.exports = mongoose.model('User', UserSchema)