const mysql = require('mysql2')

const connection = mysql.createConnection ({
    host:"localhost",
    user:'root',
    password:"8083571820",
    database:'testdb'
})

connection.connect((err)=>{
    if(err){
        console.log(err)
        return
    }

    console.log("Database connected")

    // sign up query
    const creationQuery = `create table if not exists user(
        id int primary key auto_increment,
        name varchar(100),
        email varchar(100),
        password varchar(255)
    )`

    connection.execute(creationQuery, (err) => {
        if(err){
            console.log(err)
            connection.end()
            return
        }

        console.log("Table is created")
    })

    // expense table
    const expenseTableQuery = `create table if not exists expense(
        id int primary key auto_increment,
        amount int,
        description varchar(255),
        category varchar(255)

    )`

    connection.execute(expenseTableQuery, (err) => {
        if(err){
            console.log(err)
            connection.end()
            return
        }

        console.log("Expense table is created")
    })

    
})

module.exports = connection