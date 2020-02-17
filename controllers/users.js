const express = require('express');
const router = express.Router();
const User = require('../models/user');

const bcrypt = require('bcrypt');

// * Register Route 
router.post('/register', async (req, res) => {
    const hashedPassword = bcrypt.hashSync(req.body.password, bcrypt.genSaltSync(10));
    const userDbEntry = {
        username: req.body.username, 
        password: hashedPassword,
        email: req.body.email
    }
    try {
        const createdUser = await User.create(userDbEntry);
        req.session.username = createdUser.username;
        req.session.logged = true;
        res.status(200).send({data: createdUser, status:{code: 200, message: 'Login Successful'}});
        // res.send(data = createdUser, status={code: 200});
    } catch(error) {
        console.log(error);
        res.status(400).send({data: {},  status:{code :400, message: 'Sorry, this user or email already exists'}});
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
                res.status(200).send({data: foundUser, status:{code: 200, message: 'Login Successful'}});
            } else {
                res.status(400).send({data: {},  status:{code :400, message: 'Incorrect Credentials'}});
            }
        } else {
            res.status(400).send({data: {},  status:{code :400, message: 'Incorrect Credentials'}});

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

router.patch('/add/:id', async (req, res) => {
    try {
        console.log('updated');
        const foundUser = await User.findByIdAndUpdate(req.params.id, 
            {$addToSet: {"likedPosts": req.body._id}
        });
        res.status(200).send({data: foundUser, status: {code: 200, message: 'success'}});

    } catch (error) {
        console.log(error);
    }
})

router.get('/retrieve/:user', async (req, res) => {
    try {
        if(req.param.id === undefined) {
            console.log('This is undefined')
        } else {
            console.log('This is DEFINED');
        }
        const foundUser = await User.findById(req.params.id);

        res.status(200).send({data: foundUser, status: {code: 200, message: 'success'}});
    } catch (error) {
        console.log(error);
        res.status(400).send({data: {}, status:{code: 400, message: 'failure'}});
    }
});

module.exports = router;