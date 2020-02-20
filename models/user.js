const mongoose = require('mongoose');

const userSchema = mongoose.Schema({
    username: {type: String, required: true, unique: true},
    email: {type: String, required: true, unique: true},
    password: {type: String, required: true},
    likedPosts: {type: [String]},
    createdPosts: {type: Number ,default: 0},
    followedUsers: {type: [String]},
    followedUsersPosts: {type: [Object]},
    followedUsersCount: {type: Number, default: 0}
})

const User = mongoose.model('User', userSchema);

module.exports = User;