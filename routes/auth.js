const { verifyUser, saveUser, getUserStatus } = require('../controllers/user');

module.exports = (app) => {
    app.get('/login', getUserStatus, (req, res) => {
        res.render('login', {
            isLoggedIn: req.isLoggedIn
        })
    });
    app.get('/register', getUserStatus, (req, res) => {
        res.render('register');
    })

    app.post('/register', async (req, res) => {
        const { username, password, repeatPassword } = req.body;
        try {
            if (password !== repeatPassword) {
                throw error('Password do not match')
            };
        } catch (err) {
            res.status(400);
            res.redirect('/register?error=true');
            return
        };

        const status = await saveUser(req, res)
        console.log(status);
        if (status === true) {
            res.redirect('/user-home')
        } else {
            res.redirect('/register?error=true');
        }

    });

    app.post('/login', async (req, res) => {
        const obj = await verifyUser(req, res);
        if (obj.error === true) {
            res.redirect('/login?error=true')
            res.status(400);
            return;
        } else {
            res.redirect('/')
            return
        }
    })

    app.get('/logout', (req, res) => {
        res.clearCookie('aid');
        res.redirect('/');
    })
};