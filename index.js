//main code
const express=require('express')
const mongoose=require('mongoose')
const Customer=require('./models/customer')
const app=express()


const dotenv=require('dotenv')
mongoose.set('strictQuery',false)
app.use(express.json())
app.use(express.urlencoded({ extended:true}))

if(process.env.NODE_ENV !=='development'){
    require('dotenv').config();
}   
const PORT=process.env.PORT || 3000
const CONNECTİON= process.env.CONNECTİON
const customers=[
    {
        "name":"Erkans",
        "industry":"Software"

    },
    {
        "name":"Ömer",
        "industry":"physiotherapy"
    },
    {
        "name":"Şerife",
        "industry":"Housewife"
    },
    {"name":"Erkan",
    "industry":"retired"}
]

const customer=new Customer({
    name:'Merve',
    industry: 'Assistant of Doctor'
})
customer.save()
app.get('/api/customers/:id',async(req,res)=>{
    console.log({
    requestParams:req.params,
    requestQuery:req.query
})
try{
const {id:customerId}=req.params
console.log(customerId)
const customer=await Customer.findById(customerId)
console.log(customer)
if(!customer){
    res.status(404).json({error:'User not found'})
}else{
    res.json({customer})
}

}
catch(e){
    res.status(500).json({error:'something went wrong'})
   
}

})

app.get('/',(req,res)=>{
    res.send("Welcome!")
}) 
app.get('/api/customers',async(req,res)=>{
    try {
        const result =await Customer.find()
    res.json({"customers":result})
    }
    catch(e){   
        res.status(500).json({error:e.message})
    }
}) 
app.post('/api/customers',async (req,res)=>{
    console.log(req.body)
    const customer=new Customer(req.body)
    try{    
   await customer.save()
    res.status(201).json(customer)
    }
    catch(e){
        res.status(400).json({error:e.message})
    }
}) 
app.post('/',(req,res)=>{
res.send("This is a Post Request")
})
app.put('/api/customers/:id',async (req,res)=>{
    try {
        const customerId=req.params.id
    const customer=await Customer.findOneAndReplace({_id:customerId},req.body,{new :true})
    console.log(customer)
    res.json({customer})
    }
    catch(e){
        console.log(e.message)
        res.status(500).json({error:'something went wrong'})
    }
})
app.patch('/api/customers/:id',async (req,res)=>{
    try {
        const customerId=req.params.id
    const customer=await Customer.findOneAndUpdate({_id:customerId},req.body,{new :true})
    console.log(customer)
    res.json({customer})
    }
    catch(e){
        console.log(e.message)
        res.status(500).json({error:'something went wrong'})
    }
})
app.patch('/api/orders/:id',async (req,res)=>{
    console.log(req.params)
    const orderId=req.params.id
    req.body._id=orderId
    try {
    const result=await Customer.findOneAndUpdate({'orders._id':orderId},
    {$set:{'orders.$':req.body}},
    {new :true})
    
    console.log(result);
    if(result){
        res.json(result)
    }
    else{
        res.status(404).json({error:'Something went wrong'})
    }
}
    catch(e){
        console.log(e.message)
        res.status(500).json({error:'something went wrong'})
    }
})
app.delete ('/api/customers/:id',async(req,res)=>{
    try{
    const customerId=req.params.id
    const result=await Customer.deleteOne({_id:customerId})
    res.json({deletedCount:result.deletedCount})
    }
    catch(e){
        res.status(500).json({error:'something went wrong'})
    }

})
const start=async()=>   {
    try{
        await mongoose.connect('mongodb+srv://erkan1002489:erkan@cluster0.v9tcoh3.mongodb.net/customers?retryWrites=true&w=majority')
        app.listen(PORT,()=>{
            console.log("App Listening on Port "+PORT)
        })
    }
    catch(e){
        console.log(e)
    }
}
start()



