const mongoose = require('mongoose');

const postSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    body: {type: String, required: true},
    timestamp: {type: String, required: true},
    likes: {type: Number, default: 0}
})

const Post = mongoose.model('Post', postSchema);

module.exports = Post;