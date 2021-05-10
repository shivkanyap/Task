const mongoose=require('mongoose')
const Schema=mongoose.Schema

const hackerSchema=new Schema({

    name:{
        type:String,
        required:true,
        minlength:4
    },
    


})