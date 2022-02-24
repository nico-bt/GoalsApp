const { urlencoded } = require("express")
const express = require("express")
const {errorHandler} = require("./middleware/errorMiddleware")
const dotenv = require("dotenv").config()
const port=process.env.PORT || 5000

// DATABASE CONNECTION
const connectDB = require("./config/db")
connectDB()

const app = express()

app.use(express.json())
app.use(express.urlencoded({extended:false}))

// ROUTES
// *************************
app.use("/api/goals", require("./routes/goalRoutes"))
app.use("/api/users", require("./routes/userRoutes"))

app.use(errorHandler)

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
})
