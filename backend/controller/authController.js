const express= require('express')
const User=require('../models/user')

// @desc Register controller
// @route POST api/v1/register
exports.register=async (req,res,next) => {
    try{

        //1. getting the data from the request
        const {name,email,password,}=req.body
        if(!user){
            res.status(400).json({
                success:false,
                error:"provide the body"
            })
        }
        //2. creating the user in the database
        const user = await User.create({
            name,
            email,
            password
        })

    }catch(error){
        res.status(400).json({
            success:false,
            error:error.message
        })
    }
    
}








exports.loginController=async (req,res,next) => {
    try{
        const user= req.body 
        if(!user){
            res.status(400).json({
                success:false,
                error:'did not get the user'
            })
        }

    }catch(error){

    }
    
}