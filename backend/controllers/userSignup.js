
const path = require('path')
const db = require('../utils/db-connection')


const sentSignForm = (req,res) => {
    res.sendFile(path.join(__dirname, '../views/index.html'))
}


const userSignup = (req, res) => {
    const {name, email, password} = req.body

    const insertQuery = `insert into user (name, email, password) values (?,?,?)`

    db.execute(insertQuery, [name, email, password], (err) => {
        if(err){
            console.log(err)
            res.status(500).send(err.message)
            db.end()
            return
        }

        console.log("Value has been added")
        res.status(200).send(`User with name ${name} has been added`)
    })
}

const sentLoginPage = (req, res) => {
    res.sendFile(path.join(__dirname, '../views/login.html'))
}



module.exports = {userSignup, sentSignForm, sentLoginPage}