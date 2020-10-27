const User = require('../models/User')
const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken')
const router = require('../routes/user.routes')

exports.profile = (req, res, next) => {
    console.log(req.session.token+'')
    if (req.session.token) {
        let userData = jwt.verify(req.session.token, 'TOP_SECRET')
        return res.status(200).json({
            ...userData,
            status: 200,
            token: req.session.token
        })
    }
    else
        return res.status(500).json({
            message: 'An error occured',
            status: 500,
            user: req.user
        })
}