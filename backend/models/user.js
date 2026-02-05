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
//1. Encrypt the password 

userSchema.pre('save',async function (next){
    if(!this.isModified('password')){
        next();
    }
    const salt = await bcrypt.genSalt(10);
    this.password= await bcrypt.hash(this.password,salt)
    console.log(this.password)
})

//2. Match the user password 

userSchema.methods.matchPassword = async function (enteredPassword) {
    return await bcrypt.compare(enteredPassword,this.password)
 
};





const User=mongoose.model('User',userSchema)
module.exports=User;
