require('dotenv').config();
const env = process.env.NODE_ENV;

const config = require('./config/config')[env];
const mognoose = require('mongoose');
const express = require('express');
const app = express();
const DB_URL = process.env.DATABASE_URL;
const mainRouter = require('./routes/main');
const loginRouter = require('./routes/auth');
const theaterRouter = require('./routes/theater');

mognoose.connect(DB_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useFindAndModify: false,
}, (err) => {
    if (err) {
        console.error(err);
        throw err;
    };
    console.log('Database is setup and running!');
});
require('./config/express')(app)
loginRouter(app);
theaterRouter(app);
mainRouter(app);

app.listen(config.port, console.log(`Listening on port ${config.port}!`))