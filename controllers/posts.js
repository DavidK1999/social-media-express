const express = require('express');
const router = express.Router();
const Post = require('../models/post');

router.post('/create/:user', async (req, res) => {
    try {
        const createdPost = await Post.create(req.body);
        res.status(200).send({data: createdPost, status:{code:200, message: 'successs'}});
    } catch (error) {
        console.log(error);
    }
});
router.get('/retrieve/:user');
router.put('/edit/:user');
router.delete('/delete/:user');

module.exports = router;
