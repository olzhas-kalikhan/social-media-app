const express = require('express')
const router = express.Router()
const PostControllers = require('../controllers/post.controllers')
const FileUploadHelpers = require('../controllers/file.upload.helpers')
const passport = require('passport')

router.post('/add', passport.authenticate('jwt', { session: false }), FileUploadHelpers.uploader.array('attahcedFiles', 10), PostControllers.createPost)
router.get('/allPosts', passport.authenticate('jwt', { session: false }), PostControllers.getAllPosts)
router.get('/myPosts', passport.authenticate('jwt', { session: false }), PostControllers.getPostsByCurrentUserId)
router.post('/likeComment', passport.authenticate('jwt', { session: false }), PostControllers.likeComment)
router.post('/unLikeComment', passport.authenticate('jwt', { session: false }), PostControllers.unLikeComment)

module.exports = router