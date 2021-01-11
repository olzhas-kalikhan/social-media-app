const keys = require('../config/keys')
const User = require('../models/User')
const passport = require('passport')
const jwt = require('jsonwebtoken')


const firebase = require('firebase/app')
require('firebase/storage')
firebase.initializeApp(keys.firebaseConfig)
const storageRef = firebase.storage().ref();


const { BadRequest, NotFound } = require('../utils/erros')
const signToken = userId => {
    return jwt.sign({
        iss: "TOP_SECRET",
        sub: userId
    }, "TOP_SECRET", { expiresIn: "20m" })
}

exports.register = (req, res, next) => {
    const { email, name, password, role } = req.body
    User.findOne({ email }, (err, user) => {
        try {
            if (err)
                return next(err)
            if (user)
                throw new BadRequest('Email already exist')
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
        const { _id, email, role, date, name, profileImage } = req.user
        const token = signToken(_id)
        res.cookie('access_token', token, { httpOnly: true, sameSite: true })
        return res.status(200).json({ isAuthenticated: true, user: { email, role, date, name, profileImage } })
    }
}
exports.logout = (req, res) => {
    res.clearCookie('access_token')
    return res.json({ user: { username: "", role: "", date: "", name: "", profileImage: "" }, success: true })
}
exports.authenticated = (req, res) => {
    const { email, role, date, name, profileImage } = req.user
    return res.status(200).json({ isAuthenticated: true, user: { email, role, date, name, profileImage } })
}

exports.addFriend = (req, res, next) => {
    const { friendUserId } = req.body
    const { _id } = req.user
    User.findByIdAndUpdate(_id, { $push: { following: friendUserId } }, (err, user) => {
        console.log(user)
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

exports.uploadProfileImage = (req, res, next) => {
    const body = req.body
    console.log(body, req.file)
    return res.status(200).json(req.body)
}