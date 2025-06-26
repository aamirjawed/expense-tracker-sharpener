const express = require("express")
const createSubscription = require("../controllers/paymentController")
const authenticateUser = require("../middleware/expenseMiddleware")
const { getPaymentStatus } = require("../services/cashfreeService")

const router = express.Router()

router.get('/pay', authenticateUser, createSubscription.getPaymentPage)
router.post('/pay',authenticateUser,createSubscription.processPayment)
router.get('/payment-status/:paymentSessionId', getPaymentStatus)

module.exports = router