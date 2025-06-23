const express = require('express')
const { userSignup, sentSignForm, sentLoginPage, userLogin } = require('../controllers/userSignup')

const router = express.Router()

router.get('/signup', sentSignForm)
router.post('/signup', userSignup)

router.get('/login', sentLoginPage)
router.post('/login', userLogin)


module.exports = router