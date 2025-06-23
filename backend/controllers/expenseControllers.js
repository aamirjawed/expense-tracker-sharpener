const db = require('../utils/db-connection')
const path = require('path')


const sentAddExpense = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/addExpense.html'))
}

const addExpense = (req, res) => {
    const {amount, description, category} = req.body

    if(!amount || !description || !category){
        return res.json({message:"All fields are required"})
    }

    try {
        const query = `insert into expense (amount, description, category) values(?,?,?)`

        db.execute(query, [amount, description, category], (err)=>{
            if(err){
                console.log("Add expense error:", err.message)
                return res.status(500).json({message:"Error while adding expense"})
            }

            console.log("Expense added")
            return res.status(200).json({message:"Expense has been added"})
        })
    } catch (error) {
        console.log(err)
        res.status(500).json({message:"Unexpected server issue"})
    }
}

const fetchExpense = async (req, res) => {
    
        const query = `select amount, description, category from expense`

        db.execute(query, [], (err, results) => {
            if(err){
                console.error("Error fetching expense", err)
                return res.status(500).json({message:"Failed to fetch expense"})
            }

            return res.status(200).json({ expenses: results });
        })
    }




module.exports = {sentAddExpense, addExpense, fetchExpense}