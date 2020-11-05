const express = require('express')
const router = express.Router()
const PostControllers = require('../controllers/post.controllers')
const passport = require('passport')

router.post('/add', passport.authenticate('jwt', { session: false }), PostControllers.createPost)
router.get('/myPosts', passport.authenticate('jwt', { session: false }), PostControllers.getPostsByCurrentUserId)

module.exports = router