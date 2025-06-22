const express = require('express')
const { userSignup, sentSignForm, sentLoginPage } = require('../controllers/userSignup')

const router = express.Router()

router.get('/signup', sentSignForm)
router.post('/signup', userSignup)

router.get('/login', sentLoginPage)
router.post('/login', )


module.exports = router