const mongoose = require('mongoose');

const date = new Date();
const days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
const months = [
    'January', 'February', 'March', 'April', 
    'May', 'June', 'July', 'August', 'September', 
    'November', 'December'
]
const month = months[date.getMonth()];
const day = days[date.getDay()];
const dayNumber = date.getDay();
const time = `${date.getHours()}:${date.getMinutes()}`;

const dayMonth = `${day} ${month} ${dayNumber} ${time}`


//TODO add tags

const postSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    body: {type: String, required: true},
    timestamp: {type: String, default: dayMonth},
    likes: {type: Number, default: 0},
    tags: {type: [String]}
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;