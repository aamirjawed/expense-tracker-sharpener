const express = require('express')
const db = require('./utils/db-connection')
const userRoutes = require('./routes/userRoutes')
const expenseRoutes = require('./routes/expenseRoutes')
const paymentRoutes = require('./routes/paymentRoutes')
const cors = require("cors")
const path  = require("path")



const app = express()
app.use(cors())
app.use(express.json())
app.use(express.static(path.join(__dirname, 'public')));
app.use(express.static(path.join(__dirname, 'views')));

app.use(express.urlencoded({ extended: true }));

//routes

app.use('/user', userRoutes)
app.use('/', expenseRoutes)

// payment routes

app.use('/', paymentRoutes)


db.sync().then((result) => {
    app.listen(3000, () => [
    console.log("Server is running on 3000")
])
}).catch((err) => {
    console.log(err)
});

