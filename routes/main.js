module.exports = (app) => {
    app.get('/', (req, res) => {
        //TODO: check if the user is logged
        res.render('user-home')
    });

    app.get('/guest', (req, res) => {
        res.render('guest-home')
    });

    app.use('*', (req, res) => {
        res.render('404', {
            "title": 'Error 404'
        })
    });

};