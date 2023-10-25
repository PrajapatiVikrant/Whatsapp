//schema
const mongoose = require('mongoose')
const productsch = new mongoose.Schema({
    name:{
    type:String,
    required:true
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:Number,
        required:true,
        unique:true
    }


})
module.exports = mongoose.model("bcadatas",productsch)