const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const session = require('express-session');
const cors = require('cors');
const port = 8000;
const whitelist = ['http://localhost:3000']
const corsOptions = {
    origin: function (origin, callback) {
        if (whitelist.indexOf(origin) !== -1) {
            callback(null, true);
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    }
}

require('./db/db.js');

app.use(cors(corsOptions));

app.use(session({secret: 'asdhlasfhalsjfa',resave: false, saveUninitialized: false}));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({extended: false}));

const usersController = require('./controllers/users.js');
app.use('/auth', usersController);

const postsController = require('./controllers/posts.js');
app.use('/post', postsController);

app.listen(port, () => {console.log(`Listening on port ${port}`)});
