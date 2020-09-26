const Play = require('../models/plays');
const mongoosePackage = require('./mongoosePackage');

const savePlay = (data) => {

    new Play({
        title: data.title,
        description: data.description,
        imageUrl: data.imageUrl,
        isPulbic: data.isPulbic,
        createdAt: data.createdAt,
        usersLiked
    }).save((err) => {
        if (err) {
            console.error(err);
            return err;
        };
        console.log('Play has been successfully stored');
    });

};

const getAllPlays = () => {
    const plays = await mongoosePackage.getAllItems(Play);
    if (!plays) {
        return null;
    }
    return plays;
};

const getPlayById = (id) => {
    const selectedPlay = await mongoosePackage.getItemById(id, Play);
    if (!selectedPlay) {
        return null;
    };
    return selectedPlay;
};


module.exports = {
    savePlay,
    getAllPlays,
    getPlayById
}