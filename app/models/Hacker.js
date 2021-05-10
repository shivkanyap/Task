const mongoose=require('mongoose')
const Schema=mongoose.Schema

const hackerSchema=new Schema({

    name:{
        type:String,
        required:true,
        minlength:4
    },
    
    profilelink:{
        type:String,
    },
    location:{
        type:String,
    },
    education:{
        type:String,
    },
    challengessolved:{
        type:Number,
    },
    solnsubmitted:{
        type:Number,
    },
    solnaccepted:{
        type:Number,
    },
    rank:{
        type:Number,
    },
    followers:{
        type:Number,
    },
    following:{
        type:Number,
    },
    device:{
        type:String,
    },
    votes:{
        type:Number,
    },
    timestamp:{
        type:Number,
    },
    ComP:{
        type:Object

    },
    photo:{
        type:String,
        default:null
    }
    

})
const Hacker=mongoose.model('Hacker',hackerSchema)
module.exports={Hacker}