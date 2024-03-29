const keys = JSON.parse(process.env.KEYS)
const User = require('../models/User')
const jwt = require('jsonwebtoken')

const FileUploadHelpers = require('./file.upload.helpers')
const bucket = FileUploadHelpers.bucket

const { BadRequest, NotFound } = require('../utils/erros')
const signToken = userId => {
    return jwt.sign({
        iss: "TOP_SECRET",
        sub: userId
    }, "TOP_SECRET", { expiresIn: "1h" })
}

exports.register = (req, res, next) => {
    const { email, name, password, role } = req.body
    User.findOne({ email }, (err, user) => {
        try {
            if (err)
                return next(err)
            if (user) {
                throw new BadRequest('Email already exist')
            }
            //return res.status(400).json({ message: { msgBody: "Email already exist", msgError: true } })
            else {
                const newUser = new User({ email, name, password, role })
                newUser.save(err => {
                    if (err)
                        return next(err)
                    //return res.status(500).json({ message: { msgBody: "Error has occured", msgError: true } })
                    else
                        return res.status(201).json({ message: { msgBody: "Account succesfully created", msgError: false } })
                })
            }
        }
        catch (err) { return next(err) }
    })
}
exports.login = (req, res) => {
    if (req.isAuthenticated()) {
        const { _id, email, role, date, name, username, profileImage } = req.user
        const token = signToken(_id)
        res.cookie('access_token', token, { httpOnly: true, sameSite: true })
        return res.status(200).json({ isAuthenticated: true, user: { _id, email, role, date, username, name, profileImage } })
    }
    else {
        return res.status(401).json({ isAuthenticated: false, user: { email: "", username: "", role: "", date: "", name: "", profileImage: "" } })
    }
}
exports.logout = (req, res) => {
    res.clearCookie('access_token')
    return res.json({ user: { email: "", username: "", role: "", date: "", name: "", profileImage: "" }, success: true })
}
exports.authenticated = (req, res) => {
    const { _id, email, role, date, name, profileImage, username } = req.user
    return res.status(200).json({ isAuthenticated: true, user: { _id, email, role, date, username, name, profileImage } })
}

exports.addFriend = (req, res, next) => {
    const { friendUserId } = req.body
    const { _id } = req.user
    User.findByIdAndUpdate(_id, { $push: { following: friendUserId } }, (err, user) => {
        if (err)
            return next(err)
        else
            return res.status(200).json({ message: `Following ${friendUserId}` })
    })
}

exports.getFollowing = (req, res, next) => {
    const { _id } = req.user
    User.findById(_id)
        .populate('following', 'email name ')
        .exec((err, user) => {
            if (err)
                return next(err)
            else
                return res.status(200).json({ following: user.following })
        })
}

exports.searchUser = (req, res, next) => {
    const { query } = req.body
    User.find(
        {
            "name": { "$regex": query, "$options": "i" },
        },
        'name email profileImage',
        (err, users) => {
            if (err)
                return next(err)
            else
                return res.status(200).json({ users })
        }

    )
}

exports.uploadProfileImage = async (req, res, next) => {
    try {
        if (!req.file) {
            throw new NotFound("File not uploaded")
        }
        const { _id, email, } = req.user
        // This is where we'll upload our file to Cloud Storage
        // Create new blob in the bucket referencing the file
        const blob = bucket.file(`${email}/${req.file.originalname}`);

        // Create writable stream and specifying file mimetype
        const blobWriter = blob.createWriteStream({
            metadata: {
                contentType: req.file.mimetype,
            },
        });

        blobWriter.on('error', (err) => next(err));

        blobWriter.on('finish', () => {
            // Assembling public URL for accessing the file via HTTP
            const publicUrl = `https://firebasestorage.googleapis.com/v0/b/${bucket.name}/o/${encodeURIComponent(blob.name)}?alt=media`;
            User.findByIdAndUpdate(_id, { $set: { profileImage: publicUrl } })
                .then(() => res
                    .status(200)
                    .send({ fileName: req.file.originalname, fileLocation: publicUrl })
                )
                .catch(err => { throw new Error(err) })
            // Return the file name and its public URL

        });

        // When there is no more data to be consumed from the stream
        blobWriter.end(req.file.buffer);
    } catch (error) {
        throw new Error(error)
    }
}

