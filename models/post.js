const mongoose = require('mongoose');
const userName = require('./user');

const postSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    body: {type: String, required: true},
    timestamp: {type: Date, default: Date.now},
    likes: {type: Number, default: 0},
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;