const mongoose=require('mongoose')

const ProductSchema=mongoose.Schema({
    imageURL:String,
    title:String,
    category:String,
    price:Number
})

module.exports=mongoose.model('ProductDetails',ProductSchema)