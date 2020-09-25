module.exports = (app) => {
    app.get('/create', (req, res) => {
        res.render('./theater pages/create-theater')
    })
    app.get('/edit', (req, res) => { // TODO: ID
        res.render('./theater pages/edit-theater')
    })
};