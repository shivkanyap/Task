const express=require('express')
const app=express()
const cors=require('cors')
const port=3005
const {mongoose}=require('./config/database')
const {routes}=require('./config/routes')
const path = require('path')


app.use(express.json())
app.use(cors())
app.use('/',routes)
app.use(express.static(path.join(__dirname, 'client/build')))

app.get('*', (req, res) => {
    res.sendFile(path.join(__dirname + '/client/build/index.html'))
}) 

app.listen(port,()=>{
    console.log('lisiting to port',port)
})