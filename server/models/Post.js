const mongoose = require('mongoose')

const PostSchema = new mongoose.Schema({
    postedBy: {
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
        required: false
    },
    date: {
        type: Date,
        default: (new Date())
    },
    post: {
        type: String,
    },
    likes: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'User',
    }],
    replies: [{
        type: mongoose.Schema.Types.ObjectId, ref: 'Post',
        default: []
    }],
    files: [{
        type: String
    }],
    isReply: {
        type: Boolean,
        default: false
    }
})

const Post = mongoose.model('Post', PostSchema, 'posts')
module.exports = Post