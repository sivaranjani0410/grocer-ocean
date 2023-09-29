const express=require('express')
const app=express()
const PORT=4000
const mongoose=require('mongoose')
const cors=require('cors')
const routerFile=require('./Routes/router')
const bodyParser=require('body-parser')

if(mongoose.connect('mongodb+srv://nishakrishg:Lavamoni-96@cluster0.0ldkkcv.mongodb.net/GrocerOcean-db?retryWrites=true&w=majority'))
{
console.log('DB is connected');
}
app.use(bodyParser.json())
app.use(express.json())
app.use(cors())
app.use('/',routerFile)

app.listen(PORT,()=>{
    console.log('server is running and up ' + PORT);
})
