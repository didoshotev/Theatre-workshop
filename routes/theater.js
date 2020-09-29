const { getUserStatus, getUserById } = require("../controllers/user");
const { savePlay, getPlayById, updatePlay, getAndSortPlays } = require('../controllers/plays');

module.exports = (app) => {
    app.get('/create', getUserStatus, (req, res) => {
        res.render('./theater pages/create-theater')
    })
    app.get('/edit', (req, res) => { // TODO: ID
        res.render('./theater pages/edit-theater')
    })
    app.get('/details/:id', getUserStatus, async (req, res) => {
        const objectId = req.params.id
        const currentUserID = req.key.userID;
        const currentPlay = await getPlayById(objectId)
        let isLiked = false;
        if (currentPlay.usersLiked.includes(currentUserID)) {
            isLiked = true;
        };
        const currentPlayCreatorID = currentPlay.creatorID;
        let isCreator = false;
        if (currentUserID === currentPlayCreatorID) {
            isCreator = true;
        }
        if (currentPlay == null) {
            res.redirect('/');
            console.error('Fail to Load the details page');
            return
        }
        res.render('./theater pages/theater-details', {
            currentPlay: currentPlay.toObject(),
            isCreator,
            isLiked
        });
    });

    app.post('/create', getUserStatus, async (req, res) => {

        const { title, description, imageUrl, checkBox } = req.body;
        const creatorID = req.key.userID;
        try {
            if (title === "") {
                throw new TypeError(`${title} is invalid!`);
            } else if (description === "" || description.length > 50) {
                throw new TypeError(`${description} is invalid!`)
            } else if (imageUrl === "") {
                throw new TypeError(`${imageUrl} is invalid!`)
            } else if (creatorID === "" || !creatorID) {
                throw new TypeError(`${creatorID} is invalid!`);
            };
        } catch (err) {
            res.status(401);
            console.error(err);
            res.redirect('/create?error=true');
            return;
        };
        let isPublic = false;
        if (checkBox == 'on') { isPublic = true };
        const datetime = new Date();
        const date = datetime.toISOString().slice(0, 10);
        const time = datetime.toLocaleTimeString();
        const createdAt = `${time.slice(0, 5)}/${date}`

        const play = await savePlay({ isPublic, title, description, imageUrl, createdAt, creatorID })
        res.redirect('/');
    });

    app.get('/like/:id', getUserStatus, async (req, res) => {

        const currentUserID = req.key.userID;
        const playID = req.params.id;
        const currentPlay = await getPlayById(playID);
        if (currentPlay.usersLiked.includes(currentUserID)) {
            res.redirect('/');
            console.log("You've already liked this play!");
            return;
        };
        currentPlay.usersLiked.push(currentUserID);
        currentPlay.save();
        res.redirect('/');
    });

    app.get('/sortByLikes', async (req, res) => {
        res.redirect('/?sortByLikes=true');
    });

    app.get('/sortByDate', async (req, res) => {
        res.redirect('/?sortByDate=true');
    });
};