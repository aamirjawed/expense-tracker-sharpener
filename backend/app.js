const express = require('express')
const db = require('./utils/db-connection')
const userRoutes = require('./routes/userRoutes')
const cors = require("cors")
const path  = require("path")



const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));

app.use(express.urlencoded({ extended: true }));

//routes

app.use('/user', userRoutes)

app.listen(3000, () => [
    console.log("Server is running on 3000")
])