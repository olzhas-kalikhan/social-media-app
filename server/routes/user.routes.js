const express = require('express')
const router = express.Router()
const UserControllers = require('../controllers/user.controllers')
const passport = require('passport')

//require('../config/passport')(passport)
//Registration
router.post('/register', UserControllers.register)
router.post('/login', passport.authenticate('local', { session: false }), UserControllers.login)
router.get('/logout', passport.authenticate('jwt', { session: false }), UserControllers.logout)
router.get('/authenticated', passport.authenticate('jwt', { session: false }), UserControllers.authenticated)
module.exports = router;
