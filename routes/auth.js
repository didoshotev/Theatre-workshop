const express = require('express');
const userMethods = require('../controllers/user');

module.exports = (app) => {
    app.get('/login', (req, res) => {
        res.render('login')
    });
    app.get('/register', (req, res) => {
        res.render('register');
    })

    app.post('/register', (req, res) => {
        // TODO:
    });

    app.get('/logout', (req, res) => {

    });
};