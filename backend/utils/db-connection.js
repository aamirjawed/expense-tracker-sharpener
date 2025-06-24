const mysql = require('mysql2')
const {Sequelize} = require("sequelize")


const sequelize = new Sequelize('testdb', 'root', '8083571820',{
    host:"localhost",
    dialect:"mysql"
})

try {
    sequelize.authenticate();
    console.log("Database is connected")
} catch (error) {
    console.log("Error connecting database:", error)
}

module.exports = sequelize