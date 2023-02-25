const express = require('express')
const app = express()
const cors = require("cors")
const dotenv = require("dotenv")

dotenv.config()

app.use(express.json( ))
app.use(cors())
const db = require("./models")

const postRouter = require('./routes/Posts')
app.use("/posts",postRouter)

const CommentRouter = require('./routes/Comments')
app.use("/comment",CommentRouter)

const UserRouter = require('./routes/Users')
app.use("/auth",UserRouter)

const LikesRouter = require('./routes/Likes')
app.use("/like",LikesRouter)


db.sequelize.sync().then(()=>{

app.listen(process.env.PORT || 3001,()=>{
    console.log('Server running on port 3001')
}) 

})
