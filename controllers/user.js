const env = process.env.NODE_ENV || 'development';

const config = require('../config/config')[env];
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const User = require('../models/user');
const mongoosePackage = require('../controllers/mongoosePackage');

const generateToken = (data) => {
    const token = jwt.sign(data, config.privateKey);
    return token;
};

const saveUser = async (req, res) => {
    const { username, password } = req.body;
    const saltRounds = 10;

    try {
        const hashedPassword = await bcrypt.hash(password, saltRounds)
        if (!hashedPassword) {
            return {
                error: true,
                message: 'Something happened with hashing the password'
            }
        };

        const user = new User({
            username,
            password: hashedPassword
        });

        const userObject = await user.save();

        const token = generateToken({
            userID: userObject._id,
            username: userObject.username,
        });
        if (!token) {
            return {
                error: true,
                message: 'Something happened with jwt'
            }
        };
        res.cookie('aid', token);
        return true;

    } catch (err) {
        console.error(err);
        res.status(400);
    };
};

const getUserById = async (id) => {
    const selectedUser = mognoosePackage.getItemById(id, User);
    if (!selectedUser) {
        return null;
    }
    return selectedUser;
};

const getUserByUsername = async (username) => {
    const selectedUser = mongoosePackage.getItemByUsername(username, User);
    if (!selectedUser) {
        return null
    };
    return selectedUser;
}

const verifyUser = async (req, res) => {
    const { username, password } = req.body;
    try {
        const userObject = await mongoosePackage.getItemByUsername(username, User);
        if (!userObject) {
            throw new TypeError('No such user!')
        };
        const passCheck = await bcrypt.compare(password, userObject.password)
        if (passCheck === false) {
            throw new TypeError('No such user!')
        }
        const token = generateToken({
            userID: userObject._id,
            username: userObject.username
        })
        res.cookie('aid', token);
        return true;
    } catch (err) {
        return {
            message: err.message,
            error: true
        }
    };
};

const getUserStatus = (req, res, next) => {
    const token = req.cookies['aid'];
    if (!token) {
        req.isLoggedIn = false;
    };
    try {
        const key = jwt.verify(token, config.privateKey);
        req.isLoggedIn = true;
        req.key = key;
    } catch (err) {
        req.isLoggedIn = false;
    };
    next();
};



module.exports = {
    saveUser,
    getUserById,
    getUserByUsername,
    verifyUser,
    getUserStatus
}