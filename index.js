const express = require('express')
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

app.use(express.json( ))
app.use(cors())
const db = require("./models")



const UserRouter = require('./routes/Users')
app.use("/auth",UserRouter)



db.sequelize.sync().then(()=>{

app.listen(process.env.PORT || 3001,()=>{
    console.log('Server running on port 3001')
}) 

})
