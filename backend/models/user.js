const mongoose=require("mongoose")
const bcrypt=require('bcrypt')
const jwt = require('jsonwebtoken')

const userSchema=new mongoose.Schema({
    name:{
        type:String,
        required:[true,"please enter a name"]
    },
    email:{
        type:String,
        required:[true,"please enter an email"],
        unique:true,
    },
    password:{
        type:String,
        required:[true,"please enter a password"],
        minLength:6,
        select:false
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})
const User=mongoose.model('User',userSchema)
module.exports=User;
