const express = require('express')
const app = express()
const connectdb = require("./db/authdatabase")
require('dotenv').config()
const messageroute = require("./routes/messageroute")
const authroutes = require("./routes/authroute")
const userroutes = require("./routes/userroute")

const cookieparser = require("cookie-parser")
app.use(express.json())
app.use(cookieparser())
app.use("/api/auth",authroutes)
app.use("/api/message",messageroute)
app.use("/api/user",userroutes)
const PORT = process.env.PORT || 5000
app.listen(PORT,()=>{
    connectdb()
    console.log(`server is running on port:${PORT} `);
})