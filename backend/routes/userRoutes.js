const express = require('express')
const { userSignup } = require('../controllers/userSignup')

const router = express.Router()

router.post('/signup', userSignup)


module.exports = router