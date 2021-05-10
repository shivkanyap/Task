const express=require('express')
const router=express.Router()
const {Hacker}=require('../models/Hacker')

router.post('/add',(req,res)=>{
    const body=req.body
    const hacker =new Hacker(body)
    console.log(body)
    hacker.save()
    .then(hack=>res.send(hack))
    .catch(err=>res.send(err))
})
router.get('/allHackers', async function(req,res){
    try{
        let hacker =await Hacker.find()
        return res.send(hacker)
    }catch(e){
        return res.send(e)
    }

})
module.exports={
    hackerRouter:router
}