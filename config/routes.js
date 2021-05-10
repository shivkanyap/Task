const express=require('express')
const router=express.Router()
const {usersRouter}=require('../app/controllers/UserControllers')
const {hackerRouter}=require('../app/controllers/HackerController')
router.use('/users',usersRouter)
router.use('/hacker',hackerRouter)

module.exports={
    routes:router
}