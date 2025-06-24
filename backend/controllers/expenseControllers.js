
const { User, Expense } = require('../models');


const db = require('../utils/db-connection')
const path = require('path')


const sentAddExpense = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/addExpense.html'))
}

const addExpense =async (req, res) => {
    const {amount, description, category} = req.body

    if (!amount || !description || !category) {
    return res.status(400).json({ message: "All fields are required: amount, description, category." });
  }

    try {
        const expense = await Expense.create({amount:amount, description:description, category:category, userId:req.user.id})

        res.status(201).json({message:"Expense has been added", expense})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server side error while adding expense"})
    }
}

const fetchExpense = async (req, res) => {
    try {
        const allExpenses = await Expense.findAll({
  where: { userId: req.user.id }
});

        res.status(200).json({message:"All expenses", allExpenses})
    } catch (error) {
        console.log(error)
        res.status(500).json({message:"Server side error while fetching expenses"})
    }
        

    }




module.exports = {sentAddExpense, addExpense, fetchExpense}