const express = require('express')
const { where } = require('sequelize')
const { validateToken } = require('../middlewares/AuthMiddlewares')

const router = express.Router()
const {Posts,Likes} = require("../models")
router.get('/', validateToken, async(req,res) => {
const listOfPosts = await Posts.findAll({include:[Likes]})

const likedPost = await Likes.findAll({where:{UserId:req.user.id}})

res.json({listOfPosts:listOfPosts,likedPost:likedPost})

})

router.get('/byId/:id', async(req,res)=>{
    const id = req.params.id
    const post = await Posts.findByPk(id)
res.json(post)

})


router.get('/byuserId/:id', async(req,res)=>{
    const id = req.params.id
    const listOfpost = await Posts.findAll({where:{UserId:id},include:[Likes]})
res.json(listOfpost)

})


router.post("/",validateToken, async(req,res) => {
const post = req.body
post.username = req.user.username
post.UserId = req.user.id
await Posts.create(post)

res.json(post)
 

})
 
 
router.put("/title",validateToken, async(req,res) => {
const {newtitle,id}= req.body
await Posts.update({title:newtitle},{where:{id:id}})
res.json(newtitle)
   

})
 
router.put("/postText",validateToken, async(req,res) => {
const {newText,id}= req.body
await Posts.update({postText:newText},{where:{id:id}})
res.json(newText)
 

})

router.delete("/:postId",validateToken, async (req,res)=>{
    const postId = req.params.postId 

    await Posts.destroy({
        where:{ 
            id:postId
        },
    })
    res.json("deleted success")
})







module.exports = router