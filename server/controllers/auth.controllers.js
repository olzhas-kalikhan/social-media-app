const User = require('../models/User')
const bcrypt = require('bcrypt')
const passport = require('passport')
const jwt = require('jsonwebtoken')
exports.register = async (req, res, next) => {
    const { email, name, password } = req.body
    let errors = []
    //Check required fields
    if (!name) errors.push('Name not defined')
    if (!email) errors.push('Email not defined')
    if (!password) errors.push('Password not defined')
    if (errors.length > 0) {
        res.status(403).json({ status: 403, success: false, error: errors })
    }
    else {
        User.findOne({ email: email })
            .then(user => {
                if (user) {
                    errors.push('Email already registered')
                    res.status(403).json({ status: 403, success: false, error: errors })
                }
                else {
                    const newUser = new User({
                        email,
                        name,
                        password
                    })
                    //hash password
                    bcrypt.genSalt(10, (err, salt) =>
                        bcrypt.hash(newUser.password, salt, (err, hash) => {
                            if (err) throw err
                            newUser.password = hash
                            newUser.save()
                                .then(user => {
                                    console.log(user)
                                    res.status(200).json({ status: 200, success: true, message: "User registered" })
                                })
                                .catch(err => {
                                    console.log(err)
                                    res.status(403).json({ status: 403, success: false, error: [...errors, err] })
                                })
                        })
                    )
                }
            })
            .catch(err => res.status(500).json({ status: 500, success: false, error: err }))
    }
}
exports.login = (req, res, next) => {
    passport.authenticate('local', (err, user, info) => {
        if (err) return next(err)//res.status(304).json({ status: 304, success: false, error: err })
        if (!user) return next('User not found')//res.status(304).json({ status: 304, success: false, message: 'Failed to authenticate' })
        req.login(
            user,
            { session: false },
            (err) => {
                if (err) return next(err)
                const body = { _id: user._id, email: user.email };
                const token = jwt.sign({ user: body }, 'TOP_SECRET');
                req.session.token = token;
                return res.status(200).json({ status: 200, success: true, token })
            })
    })(req, res, next)
}
exports.checkAuth = (req, res, next) => {
    if (req.session.token) next()
    else return res.status(401).json({ status: 401, authorized: false })
}