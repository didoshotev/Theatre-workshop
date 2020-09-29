const Play = require('../models/plays');
const mongoosePackage = require('./mongoosePackage');

const savePlay = (data) => {
    new Play({
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        isPublic: data.isPublic,
        createdAt: data.createdAt,
        usersLiked: [],
        creatorID: data.creatorID
    }).save((err, createdObject) => {
        if (err) {
            console.error(err);
            return err;
        };
        console.log('Play has been successfully stored');
        return createdObject
    });

};

const getAllPlays = async () => {
    const plays = await mongoosePackage.getAllItems(Play);
    return plays;
};

const getPlayById = async (id) => {
    const selectedPlay = await mongoosePackage.getItemById(id, Play);
    if (!selectedPlay) {
        return null;
    };
    return selectedPlay;

};

const updatePlay = async (play) => {
    return await play.save();
}

const getAndSortPlays = async () => {
    const currentPlays = await getAllPlays();
    return currentPlays.sort((a, b) => b.usersLiked.length - a.usersLiked.length);
};

module.exports = {
    savePlay,
    getAllPlays,
    getPlayById,
    updatePlay,
    getAndSortPlays
}