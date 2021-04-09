const Post = require('../models/Post')
const { BadRequest, NotFound } = require('../utils/erros')
const { bucket } = require('./file.upload.helpers')

exports.getAllPosts = (req, res, next) => {
    Post
        .find({})
        .sort({ date: 'desc' })
        .limit(20)
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

exports.deletePost = (req, res, next) => {
    const postId = req.body
    
    Post.deleteOne({ id: postId }, (err) => {
        if (err)
            return next(err)
        else
            return res.status(200).json({ message: { msgBody: "Post deleted", msgError: false } })
    })
}

exports.createPost = (req, res, next) => {
    try {
        const { postText } = req.body
        const { id, username } = req.user
        const files = []

        console.log(req.body)
        if (req.files) {
            for (let file of req.files) {

                // This is where we'll upload our file to Cloud Storage
                // Create new blob in the bucket referencing the file
                const blob = bucket.file(`posts/${username}/${file.originalname}`);
                // Create writable stream and specifying file mimetype
                const blobWriter = blob.createWriteStream({
                    metadata: {
                        contentType: file.mimetype,
                    },
                });
                blobWriter.on('error', (err) => next(err));
                blobWriter.on('finish', () => {
                    blob.makePublic()
                    // Assembling public URL for accessing the file via HTTP

                });
                // When there is no more data to be consumed from the stream
                blobWriter.end(file.buffer);
                const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media`;
                files.push(publicUrl)
            }

        }
        console.log(files)
        const newPost = new Post({ postedBy: id, post: postText, files: files })
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