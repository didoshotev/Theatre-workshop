const mongoose = require('mongoose')
const mongoosePackage = {
    saveItem: async function (data, theClass) {
        return new theClass(data).save((err) => {
            if (err) {
                console.error(err);
                return null;
            };
        });

    },
    getItemById: async function (id, theClass) {
        const item = await new theClass.findById().lean();
        if (!item) {
            return null
        }
        return item
    },
    getAllItems: async function (theClass) {
        const items = await theClass.find().lean();
        return items
    },
    getItemByUsername: async function (prop, theClass) {
        const selectedItem = await theClass.findOne({ username: prop }).lean();
        return selectedItem;
    }
};

module.exports = mongoosePackage;