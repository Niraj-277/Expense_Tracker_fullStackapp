const express=require('express')
const User=require('../models/user')
const jwt=require("jsonwebtoken")

exports.protect=async (req,res,next) => {
     let token;

    //1. Check if the token exists in the header
    if(req.headers.authorization && req.headers.authorization.startsWith('Bearer')){
        token=req.authorization.split(' ')[1];
    }
    if(!token){
        return res.status(401).json({
            success:false,
            message:"token does not exist"
        })
    }
    try{
        //verify token
        const decoded=jwt.verify(token,process.env.JWT_SECRET)

        //attach the user to the req
        req.user=await User.findById(decoded.id)

        next();
    }catch(err){
        res.status(400).json({
            success:false,
            error:err.message
        })
    }
    
}