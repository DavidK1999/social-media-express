const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.post('/create/:user', async (req, res) => {
    try {
        req.body.user = req.params.user;
        // TODO remove user password before sending it to the front end
        let createdPost = await (await Post.create(req.body)).populate(req.body.user);
        res.status(200).send({data: createdPost, status:{code:200, message: 'successs'}});
    } catch (error) {
        console.log(error);
    }
});

router.get('/retrieve', async (req, res) => {
    try {
        const allPosts = await Post.find().populate({path: 'user'}).exec();
        res.status(200).send({data: allPosts, status:{code: 200, message: 'success'}});
    } catch (error) {
        console.log(error);
    }
});

router.put('/update/:id', async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new: true});
        res.status(200).send({data: updatedPost, status: {code: 200, message: 'success'}});
    } catch (error) {
        res.status(400).send({data: {}, status:{code: 400, message: 'failure'}});
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        // TODO Delete posts associated with the currently logged in user
        const deletedPost = await Post.findByIdAndRemove(req.params.id);
        res.status(200).send(deletedPost);
    } catch (error) {
        res.status(400).json({error: err.message})
    }
});

module.exports = router;
