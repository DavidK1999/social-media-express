const mongoose = require('mongoose');

let date = new Date();
let days = ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'];
let months = [
    'January', 'February', 'March', 'April', 
    'May', 'June', 'July', 'August', 'September', 
    'November', 'December'
]
let month = months[date.getMonth()];
let day = days[date.getDay()];
let dayNumber = date.getDate();
let time = `${date.getHours()}:${date.getMinutes()}`;
let dayMonth = `${day}, ${month} ${dayNumber} at ${time}`

if(date.getHours() >= 12) {
    time = `${time} PM`
} else {
    time = `${time} AM`
}

switch(dayNumber) {
    case 1:
         dayMonth = `${day}, ${month}, ${dayNumber}st at ${time}`
         break;
    case 2: 
         dayMonth = `${day}, ${month}, ${dayNumber}nd at ${time}`
         break;
    case 3: 
         dayMonth = `${day}, ${month}, ${dayNumber}rd at ${time}`
         break;
    default:
         dayMonth = `${day}, ${month}, ${dayNumber}th at ${time}`
         break;
}


const postSchema = mongoose.Schema({
    user: {type: mongoose.Schema.Types.ObjectId, ref: 'User'},
    body: {type: String, required: true},
    timestamp: {type: String, default: dayMonth},
    likes: {type: Number, default: 0},
    tags: {type: [String]}
});

const Post = mongoose.model('Post', postSchema);

module.exports = Post;