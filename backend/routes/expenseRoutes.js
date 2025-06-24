const express = require("express")
const { sentAddExpense, addExpense, fetchExpense } = require("../controllers/expenseControllers")
const authenticateUser = require("../middleware/expenseMiddleware")

const router = express.Router()

router.get('/add-expense', sentAddExpense )
router.post('/add-expense',authenticateUser, addExpense)


router.get('/fetch-expense', authenticateUser, fetchExpense)


module.exports = router