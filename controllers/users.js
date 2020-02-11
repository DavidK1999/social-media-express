const express = require('express');
const router = express.Router();
const User = require('../models/user');

const bcrypt = require('bcrypt');

// * Register Route 
router.post('/register', async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    const userDbEntry = {
        username: req.body.username, 
        password: req.body.password,
        email: req.body.email
    }
    try {
        const createdUser = await User.create(userDbEntry);
        req.session.username = createdUser.username;
        req.session.logged = true;
        res.status(200).send({data: createdUser, message:'Success'});
        // res.send(data = createdUser, status={code: 200});
    }catch(error) {
        console.log(error);
        res.status(400).send({data: {},  message: 'Sorry, this user or email already exists'});
    }
});

// * Login Route
router.post('/login', async (req, res) => {
    try {
        const foundUser = await User.findOne({username: req.body.username});
        if(foundUser) {
            if(bcrypt.compareSync(req.body.password, foundUser.password)) {
                req.session.message = '';
                req.session.username = foundUser.username;
                req.session.loggedin = true;
                res.status(200).json(foundUser);
            } else {
                req.session.message = 'Username or password is incorrect';
            }
        } else {
            req.session.message = 'Username or password is incorrect';
        }
    } catch(err) {
        res.send(err);
    }
});

router.get('/logout', (req, res) => {
    req.session.destroy((err) => {
        if(err) {
            res.send(err);
        } else {
            res.status(200).json("Its garbage");
        }
    })
})

module.exports = router;