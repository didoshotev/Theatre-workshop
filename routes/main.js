const { getUserStatus } = require('../controllers/user');
const { getAllPlays, getAndSortPlays } = require('../controllers/plays');

module.exports = (app) => {
    app.get('/', getUserStatus, async (req, res) => {
        const isLoggedIn = req.isLoggedIn;
        let plays = await getAllPlays();


        if (req.query.sortByLikes) {
            plays = await getAndSortPlays();
        } else if (req.query.sortByDate) {
            console.log(2);
        }
        if (plays == null) {
            res.redirect('/404');
        };

        if (isLoggedIn === true) {
            res.render('user-home', {
                isLoggedIn,
                plays
            })
        } else {
            plays = await getAndSortPlays();
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