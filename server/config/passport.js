const LocalStrategy = require('passport-local')
const mongoose = require('mongoose')
const bcrypt = require('bcrypt')

const User = require('../models/User')
const JWTstrategy = require('passport-jwt').Strategy;
const ExtractJWT = require('passport-jwt').ExtractJwt;

module.exports = (passport) => {
    passport.serializeUser(function (user, done) {
        done(null, user.id);
    });
    passport.deserializeUser(function (id, done) {
        User.findById(id, function (err, user) {
            done(err, user);
        });
    });
    passport.use(
        new LocalStrategy({
            usernameField: 'email',
            passwordField: 'password'
        },
            (email, password, done) => {
                User.findOne({ email })
                    .then(user => {
                        if (!user) {
                            return done(null, false, { message: 'That email not registered' })
                        }
                        bcrypt.compare(password, user.password, (err, isMatch) => {
                            if (err) throw err
                            if (isMatch) {
                                return done(null, user)
                            }
                            else {
                                return done(null, false, { message: 'Password incorrect' })
                            }
                        })
                    })
                    .catch(err => done(err))
            })
    )
}