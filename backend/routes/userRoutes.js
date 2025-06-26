const express = require('express')
const { userSignup, sentSignForm, sentLoginPage, userLogin, getUserDetailsWithId, deleteUserWithId } = require('../controllers/userSignup')
const authenticateUser  = require('../middleware/expenseMiddleware')
const isPremium = require('../middleware/isPremium')
const router = express.Router()

router.get('/signup', sentSignForm)
router.post('/signup', userSignup)

router.get('/login', sentLoginPage)
router.post('/login', userLogin)

router.get('/user-details/:id', getUserDetailsWithId)
router.delete('/delete-user/:id', deleteUserWithId)

router.get("/me", authenticateUser, isPremium, (req, res) => {
  res.json({
    userId: req.user.id,
    isPremium: req.user.isPremium,
  });
});


module.exports = router