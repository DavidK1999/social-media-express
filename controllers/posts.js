const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.post('/create/:user', async (req, res) => {
    try {
        req.body.user = req.params.user; 
        delete req.body.user.password
        // TODO remove user password before sending it to the front end
        let createdPost = await Post.create(req.body);
        console.log(createdPost);
        res.status(200).send({data: createdPost, status:{code:200, message: 'successs'}});
    } catch (error) {
        console.log(error);
    }
});

router.get('/retrieve', async (req, res) => {
    try {
        console.log('Fetched');
        const allPosts = await Post.find().populate({path: 'user'}).exec();
        console.log(allPosts);
        res.status(200).send({data: allPosts, status:{code: 200, message: 'success'}});
    } catch (error) {
        console.log(error);
    }
});

router.get('/tags/:tags', async (req, res) => {
    try {
        console.log(req.params.tags);
        const taggedPosts = await Post.find({tags: req.params.tags});
        console.log(taggedPosts);
        res.status(200).send({data: taggedPosts, status:{code: 200, message: 'success'}});
    } catch (error) {
        console.log(error);
    }
});

router.patch('/upvote/:id', async (req, res) => {
    try {
        console.log('Added');
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, 
            {$inc : {'likes': 1}}
        
        );
        res.status(200).send({data: updatedPost, status: {code: 200, message: 'success'}});
    } catch (error) {
        res.status(400).send({data: {}, status:{code: 400, message: 'failure'}});
    }
});
router.put('/update/:id', async (req, res) => {
    try {
        const updatedPost = await Post.findByIdAndUpdate(req.params.id, req.body, {new:true});
        res.status(200).send({data: updatedPost, status: {code: 200, message: "success"}});
    } catch (error) {
        res.status(400).send({data: {}, status:{code: 400, message: 'failure'}});
    }
});

router.delete('/delete/:id', async (req, res) => {
    try {
        console.log('Deleted');
        // TODO Delete posts associated with the currently logged in user
        const deletedPost = await Post.findByIdAndRemove(req.params.id);
        res.status(200).send({data: deletedPost, status:{code: 200, message: 'success'}});
    } catch (error) {
        res.status(400).json({error: error})
    }
});

module.exports = router;
