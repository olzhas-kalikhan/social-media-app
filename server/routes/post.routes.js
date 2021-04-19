const express = require('express')
const router = express.Router()
const PostControllers = require('../controllers/post.controllers')
const FileUploadHelpers = require('../controllers/file.upload.helpers')
const passport = require('passport')

router.post('/add', passport.authenticate('jwt', { session: false }), FileUploadHelpers.uploader.array('attahcedFiles', 10), PostControllers.createPost)
router.get('/allPosts', passport.authenticate('jwt', { session: false }), PostControllers.getAllPosts)
router.get('/myPosts', passport.authenticate('jwt', { session: false }), PostControllers.getPostsByCurrentUserId)
router.get('/:id/replies', passport.authenticate('jwt', { session: false }), PostControllers.getRepliesByPostId)
router.post('/likePost', passport.authenticate('jwt', { session: false }), PostControllers.likePost)
router.post('/unLikePost', passport.authenticate('jwt', { session: false }), PostControllers.unLikePost)
router.post('/deletePost', passport.authenticate('jwt', { session: false }), PostControllers.deletePost)
module.exports = router