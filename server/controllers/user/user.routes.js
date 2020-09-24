const express = require('express');
const router = express.Router();
const UserController = require('./user.controllers')

router.post('/signup', UserController.createUser)

module.exports = router;