const mongoosePackage = {
    saveItem: async function (data, theClass) {
        new theClass(data).save((err) => {
            if (err) {
                console.error(err);
                return err;
            };
            console.log('Successfully stored!');
        });
    },
    getItemById: async function (id, theClass) {
        const item = await new theClass.findById().lean();
        return item
    },
    getAllItems: async function (theClass) {
        const items = await theClass.find().lean();
        return items
    },
};

module.exports = mongoosePackage;