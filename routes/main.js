const { getUserStatus } = require('../controllers/user');
const { getAllPlays } = require('../controllers/plays');

module.exports = (app) => {
    app.get('/', getUserStatus, async (req, res) => {
        const isLoggedIn = req.isLoggedIn;

        const plays = await getAllPlays();
        if (plays == null) {
            res.redirect('/404');
        };

        if (isLoggedIn === true) {
            res.render('user-home', {
                isLoggedIn,
                plays
            })
        } else {
            res.render('guest-home', {
                isLoggedIn,
                plays
            })
        }
    });
    app.use('*', (req, res) => {
        res.render('404', {
            "title": 'Error 404'
        })
    });

};