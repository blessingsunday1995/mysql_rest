const express = require('express')
const router = express.Router()
const {Users} = require("../models")
const bcrypt = require('bcrypt')
const {validateToken} = require('../middlewares/AuthMiddlewares')
const {sign} = require('jsonwebtoken')

router.post("/", async(req,res) => {
    const {username,password} = req.body
    bcrypt.hash(password,10).then((hash)=>{
        Users.create({
            username: username,
            password: hash,
        })
        res.json("Succes");
    })
})



router.post("/login", async(req,res) => {
    const {username,password} = req.body

    const user = await Users.findOne({where:{username:username}})

    if(!user) return res.json({error:"user not exist"})


    bcrypt.compare(password,user.password).then(async(match)=>{
 if(!match) return res.json({error:"Wrund Username and Password Conbination"})

const accessToken = sign({username: user.username,id:user.id},"mgbonyebi")

return res.json({token:accessToken, username:username,id: user.id })

})

   
}) 

router.get('/auth',validateToken,(req,res)=>{

    res.json(req.user)
})


router.get('/basicinfo/:id', async (req,res)=>{
    const id = req.params.id

const basicInfo =  await Users.findByPk(id,{attributes:{exclude:["password"]}})
    res.json(basicInfo)
}) 

router.put('/changepassword',validateToken, async (req,res)=>{
    const {oldPassword,newPassword} = req.body 

      const user = await Users.findOne({where:{username:req.user.username}})
 
        bcrypt.compare(oldPassword,user.password).then(async(match)=>{
        if(!match) return res.json({error:"Wround Password"})
              bcrypt.hash(newPassword,10).then((hash)=>{
            Users.update({password:hash},{where:{username:req.user.username}})
        res.json("Succes");
    })


})

})

module.exports = router