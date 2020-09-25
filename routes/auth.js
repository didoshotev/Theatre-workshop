const express = require('express');


module.exports = (app) => {
    app.get('/login', (req, res) => {
        res.render('login')
    });
    app.get('/register', (req, res) => {
        res.render('register');
    })

    app.get('/logout', (req, res) => {

    });
};