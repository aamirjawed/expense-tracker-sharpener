const {Sequelize, DataTypes}  = require("sequelize")
const sequelize = require('../utils/db-connection')

const User = sequelize.define('Users', {
    id:{
        type:DataTypes.INTEGER,
        primaryKey:true,
        autoIncrement:true,
        allowNull:false
        
        
    },
    name:{
        type:DataTypes.STRING,
        allowNull:false

    },
    email:{
        type:DataTypes.STRING,
        allowNull:false,
       
    },
    password:{
        type:DataTypes.STRING,
        allowNull:false
    }

})

module.exports = User