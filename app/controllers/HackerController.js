const express=require('express')
const router=express.Router()
const {Hacker}=require('../models/Hacker')


const multer=require('multer')
const storage =multer.diskStorage({
    destination:function(req,file,cb){
        cb(null,"uploads")
        
    },
    filename:function(req,file,cb){
        cb(null,Number(new Date())+ '_' +file.originalname)
    }
    
})

const fileFilter = (req,file,cb) => {
    if(file.mimetype == 'image/jpeg' || file.mimetype == 'image/png'){
        cb(null,true)
    }else{
        cb(null,false)
    }
}
const upload = multer({
    storage, 
    limits: { fileSize: 1024 * 1024 * 5 },
    fileFilter
})


router.get('/result',async (req,res)=>{
    
            try{
                let solAvg=0
                let solArray=[]
                let compAvg=0
                let total=0
                let resArray=[]
                let result =await Hacker.find()
                // let result=hacker.sort(dynamicSort("name"))
                result.forEach(data=>{
                    console.log((data.solnaccepted/data.challengessolved)*100,'re')
                    
                    solAvg=(data.solnaccepted/data.challengessolved)*100
                    let sum=0
                    Object.values(data.ComP).forEach(item=>{
                        
                        console.log(item,'java')
                        sum=sum+item
                        
                        
                    })
                    compAvg=((sum)/300)*100
                    total=solAvg+compAvg
                    console.log(solAvg,compAvg,total)
                    resArray.push({
                        "name":data.name,
                        "value":total  
                    })
        
                })
                console.log('r',resArray)
                
                return res.send(result)
            }catch(e){
                return res.send(e)
            }
})

router.post('/add',upload.single('photo'),(req,res)=>{
    const body=req.body
    if(req.file){
        body.photo=req.file.path
    }
    else{
        const error = new Error('Please upload a file')
        error.httpStatusCode = 400
        return next(error)
    }
    const hacker =new Hacker(body)
    console.log(body)
    hacker.save()
    .then(hack=>res.send(hack))
    .catch(err=>res.send(err))
})
router.get('/allHackers', async function(req,res){
    function dynamicSort(property) {
        var sortOrder = 1;
        if(property[0] === "-") {
            sortOrder = -1;
            property = property.substr(1);
        }
        return function (a,b) {
            /* next line works with strings and numbers, 
             * and you may want to customize it to your needs
             */
            var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
            return result * sortOrder;
        }
    }
    try{
        let hacker =await Hacker.find()
        let result=hacker.sort(dynamicSort("name"))
        return res.send(result)
    }catch(e){
        return res.send(e)
    }

})
router.get('/:id',(req,res)=>{
    const {id}=req.params
    console.log('id',id)
    Hacker.findOne({_id:id})
    .then(data=>{
        if(data){
            res.send(data)
        }
        else{
            res.send({})
        }
    })
    .catch(err=>{
        res.send(err)
    })
})

// router.get('/text', async function(req,res){
//     console.log('hi')
//     // function dynamicSort(property) {
//     //     var sortOrder = 1;
//     //     if(property[0] === "-") {
//     //         sortOrder = -1;
//     //         property = property.substr(1);
//     //     }
//     //     return function (a,b) {
//     //         /* next line works with strings and numbers, 
//     //          * and you may want to customize it to your needs
//     //          */
//     //         var result = (a[property] < b[property]) ? -1 : (a[property] > b[property]) ? 1 : 0;
//     //         return result * sortOrder;
//     //     }
//     // }
//     try{
//         let solAvg=0
//         let solArray=[]
//         let compAvg=0
//         let total=0
//         let resArray=[{}]
//         let hacker =await Hacker.find()
//         let result=hacker.sort(dynamicSort("name"))
//         // result.forEach(data=>{
//         //     solAvg=(solnaccepted/challengessolved)*100
//         //     data.ComP.forEach(item=>{
//         //         compAvg=((item.java+item.javascript+item.Html)/300)*100
//         //     })
//         //     total=solAvg+compAvg
//         //     resArray.push({
//         //         "name":data.name,
//         //         "value":total  
//         //     })

//         // })
//         console.log('r',resArray)
        
//         return res.send(result)
//     }catch(e){
//         return res.send(e)
//     }

// })
module.exports={
    hackerRouter:router
}