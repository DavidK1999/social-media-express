const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true},
    password: {type: String, required: true},
    likedPosts: {type: [String]},
    followedUsers: {type: [mongoose.Schema.Types.ObjectId], ref: 'Following'}
})

const User = mongoose.model('User', userSchema);

module.exports = User;