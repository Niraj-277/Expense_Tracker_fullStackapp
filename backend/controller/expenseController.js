
const Expense=require('../models/expense')

exports.createExpense=async (req,res,next)=>{
    try{
        req.body.user=req.user.id
        const expense=await Expense.create(req.body)
        res.status(201).json({
            success:true,
            message:"document created",
            expense
        })
    }catch(error){
        res.status(400).json({
            success:false,
            error:error.message
        })
    }
}