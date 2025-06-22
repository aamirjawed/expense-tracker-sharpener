const mysql = require('mysql2')

const connection = mysql.createConnection ({
    host:"localhost",
    user:'root',
    password:"",
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
        name varchar(20),
        email varchar(20),
        password varchar(20)
    )`

    connection.execute(creationQuery, (err) => {
        if(err){
            console.log(err)
            connection.end()
            return
        }

        console.log("Table is created")
    })

    
})

module.exports = connection