const express = require('express')
const db = require('./utils/db-connection')
const userRoutes = require('./routes/userRoutes')
const cors = require("cors")
const app = express()
app.use(cors())
app.use(express.json())

//routes

app.use('/user', userRoutes)

app.listen(3000, () => [
    console.log("Server is running on 3000")
])