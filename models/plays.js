const mongoose = require('mongoose');

const PlaysSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        unique: true,
    },
    description: {
        type: String,
        required: true,
        maxlength: 50
    },
    imageUrl: {
        type: String,
        required: true
    },
    isPublic: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: String,
        required: true
    },
    creatorID: {
        type: String,
        required: true
    },
    usersLiked: [{
        type: 'ObjectId',
        ref: 'users'
    }]
})

module.exports = mongoose.model('Plays', PlaysSchema);