const express = require('express')
const router = express.Router()
const UserControllers = require('../controllers/user.controllers')
//Registration
router.get('/profile', UserControllers.profile)
module.exports = router;
