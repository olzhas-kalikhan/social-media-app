const Post = require('../models/Post')
const { BadRequest, NotFound } = require('../utils/erros')
const { bucket } = require('./file.upload.helpers')

exports.getAllPosts = (req, res, next) => {
    getPostsById(null, false, req, res, next)
}

const getPostsById = (id, reply, req, res, next) => {
    let query = id ? { postedBy: id } : {}
    Post.find({ ...query, isReply: reply })
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
    try {
        const { post } = req.body
        if (post.postedBy._id !== req.user.id)
            throw new BadRequest("Unauthorized")
        else
            Post.deleteOne({ _id: post._id }, (err) => {
                if (err)
                    return next(err)
                else
                    return res.status(200).json({ message: { msgBody: "Post deleted", msgError: false } })
            })
    }
    catch (err) { next(err) }
}

exports.createPost = (req, res, next) => {
    try {
        const { postText, postId } = req.body
        const { id, email } = req.user
        const files = []
        if (postText === "" && !req.files)
            throw new BadRequest("Images or Text required")
        if (req.files) {
            for (let file of req.files) {

                // This is where we'll upload our file to Cloud Storage
                // Create new blob in the bucket referencing the file
                const blob = bucket.file(`${email}/posts/${file.originalname}`);
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
        const newPost = new Post({ postedBy: id, post: postText, files: files, isReply: postId !== undefined })
        if (postId) {
            Post.findOneAndUpdate({ _id: postId }, { $push: { replies: newPost._id } }, (err) => {
                if (err)
                    return next(err)
            })
        }
        newPost.save(err => {
            if (err)
                return next(err)
            else
                return res.status(201).json({ message: { msgBody: "Post succesfully added", msgError: false } })
        })

    }
    catch (err) { next(err) }
}
exports.getRepliesByPostId = (req, res, next) => {
    const { id } = req.params
    Post.findById(id)
        .populate({
            path: 'replies',
            ref: Post,
            populate: {
                path: 'postedBy',
                select: 'name email username profileImage'
            }
        })
        .exec((err, post) => {
            try {
                if (err)
                    return next(err)
                if (post)
                    return res.status(200).json({ message: { msgBody: "Comments found", msgError: false }, replies: post.replies })
                else
                    throw new NotFound("Comments not found")
            }
            catch (err) { return next(err) }
        })
}

exports.getPostsByUserId = (req, res, next) => {
    const { userId } = req.body
    getPostsById(userId, false, req, res, next)
}

exports.getPostsByCurrentUserId = (req, res, next) => {
    const { id } = req.user
    getPostsById(id, false, req, res, next)
}

exports.likePost = (req, res, next) => {
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
exports.unLikePost = (req, res, next) => {
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