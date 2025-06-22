
const db = require('../utils/db-connection')


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

module.exports = {userSignup}