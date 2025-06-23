const express = require("express")
const { sentAddExpense, addExpense, fetchExpense } = require("../controllers/expenseControllers")

const router = express.Router()

router.get('/add-expense', sentAddExpense )
router.post('/add-expense', addExpense)


router.get('/fetch-expense', fetchExpense)


module.exports = router