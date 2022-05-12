const express = require("express");
const app = express();
const connection = require('./database/db')


// Middleware
app.use(express.json())
app.use(express.urlencoded({ extended: false }))
connection()



app.use('/api', require('./router/Router'))




app.listen(5000, () => {
    console.log("Server is running")
})