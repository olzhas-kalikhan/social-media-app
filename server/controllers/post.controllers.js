const Post = require('../models/Post')
const { BadRequest, NotFound } = require('../utils/erros')

const getPostsById = (id, req, res, next) => {
    Post.find({ postedBy: id })
        .sort('-date')
        .limit(10)
        .populate('postedBy', 'name email username profileImage')
        .exec((err, posts) => {
            try {
                if (err)
                    return next(err)
                if (posts.length > 0)
                    return res.status(200).json({ message: { msgBody: "Posts found", msgError: false }, posts })
                else
                    throw new NotFound("Posts not found")
            }
            catch (err) { return next(err) }
        })
}

exports.createPost = (req, res, next) => {
    try {
        const { postText } = req.body
        const { id } = req.user
        const newPost = new Post({ postedBy: id, post: postText })
        newPost.save(err => {
            if (err)
                next(err)
            else
                return res.status(201).json({ message: { msgBody: "Post succesfully added", msgError: false } })
        })
    }
    catch (err) { next(err) }
}

exports.getPostsByUserId = (req, res, next) => {
    const { userId } = req.body
    getPostsById(userId, req, res, next)
}

exports.getPostsByCurrentUserId = (req, res, next) => {
    const { id } = req.user
    getPostsById(id, req, res, next)
}

exports.likeComment = (req, res, next) => {
    const { id } = req.user
    const { postId } = req.body
    Post.findByIdAndUpdate(postId, { $push: { likes: id } }, (err, post) => {
        if (err)
            return next(err)
        else {
            return res.status(200).json({ post })
        }

    })
}
exports.unLikeComment = (req, res, next) => {
    const { id } = req.user
    const { postId } = req.body
    Post.findByIdAndUpdate(postId, { $pull: { likes: id } }, (err, post) => {
        if (err)
            return next(err)
        else {
            return res.status(200).json({ post })
        }

    })
}