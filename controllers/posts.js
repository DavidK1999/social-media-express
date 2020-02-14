const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.post('/create/:user', async (req, res) => {
    try {
        req.body.user = req.params.user;
        // TODO remove user password before sending it to the front end
        const createdPost = await Post.create(req.body);
        res.status(200).send({data: createdPost, status:{code:200, message: 'successs'}});
    } catch (error) {
        console.log(error);
    }
});

router.get('/retrieve', async (req, res) => {
    try {
        const allPosts = await Post.find().populate({path: 'user'}).exec();
        console.log(allPosts);
        res.status(200).send({data: allPosts, status:{code: 200, message: 'success'}});
    } catch (error) {
        console.log(error);
    }
});

router.put('/edit/:user', async (req, res) => {
    try {
        // TODO Edit posts associated with the currently logged in user
        const userPost = await Post.find();
    } catch (error) {
        console.log(error);
    }
});

router.delete('/delete/:user', async (req, res) => {
    try {
        // TODO Delete posts associated with the currently logged in user
        const deletePost = await Post.find();
    } catch (error) {
        console.log(error);
    }
});

module.exports = router;
