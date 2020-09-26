const User = require('../models/user');
const mognoosePackage = require('../controllers/mongoosePackage');

const saveUser = async (data) => {

    const userObject = new User({
        username: data.username,
        password: data.password
    });
    userObject.save((err, doc) => {
        if (err) {
            console.error(err);
            return err
        };
        console.log(`DOCUMENT:`, doc);
    });
};

const getUser = async (id) => {
    const selectedUser = mognoosePackage.getItemById(id, User);
    if (!selectedUser) {
        return null;
    }
    return selectedUser;
};


module.exports = {
    saveUser,
    getUser
}