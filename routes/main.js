const { getUserStatus } = require('../controllers/user');

module.exports = (app) => {
    app.get('/', getUserStatus, async (req, res) => {
        const isLoggedIn = req.isLoggedIn;
        if (isLoggedIn === true) {
            res.render('user-home', {
                isLoggedIn
            })
        } else {
            res.render('guest-home', {
                isLoggedIn
            })
        }

    });


    app.use('*', (req, res) => {
        res.render('404', {
            "title": 'Error 404'
        })
    });

};