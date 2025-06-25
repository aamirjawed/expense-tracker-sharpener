const {DataTypes}  = require('sequelize')
const sequelize = require('../utils/db-connection')


const Order = sequelize.define('orders', {
    id:{
        type:DataTypes.INTEGER,
        autoIncrement:true,
        primaryKey:true,
        allowNull:false
    },

    userId:{
        type:DataTypes.INTEGER,
        allowNull:false
    },
    productType:{
        type:DataTypes.STRING,
        defaultValue:'premium',
        allowNull:false,
    },
    paymentType:{
        type:DataTypes.ENUM('pending', 'completed', 'failed', 'refunded'),
        defaultValue:'pending',
        allowNull:false
    },
    paymentMode:{
        type:DataTypes.ENUM('card', 'paypal', 'crypto', 'wallet'),
        allowNull:false
    },
    amount:{
        type:DataTypes.FLOAT,
        allowNull:false,
    },
    currency:{
        type:DataTypes.STRING,
        defaultValue:'INR'
    },
    
})

module.exports = Order