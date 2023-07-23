const mongoose=require('mongoose')
const customerSchema=new mongoose.Schema({
    name: {
        type: String,
        required:true
    },
    industry: String,
    orders :[
        {
            description:String,
            amount:Number
        }

    ]
})  
module.exports= mongoose.model('Client',customerSchema)
