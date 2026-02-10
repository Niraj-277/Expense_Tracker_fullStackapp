
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

exports.getExpense=async(req,res,next)=>{
    try{
        console.log(req.user.id)
        
        
        const expense=await Expense.find({user:req.user.id})
        res.status(200).json({
            success:true,
            message:"all the documents fetched",
            expense
        })
    }catch(error){
        res.status(400).json({
            success:false,
            error:error.message
        })
    }
}

//@desc delete expense 
//@route DELETE api/v1/delete expense

exports.deleteExpense=async (req,res,next) => {
    try{
        const expenseId= req.params.id

        const expense=await Expense.findOne({
            _id:expenseId,
            user:req.user.id
        })
        if(!expense){
            return res.status(404).json({
                success: false,
                message: "Expense not found or not authorized"
        })}

        //Delete the expense

        await expense.deleteOne();
         res.status(200).json({
            success: true,
            message: "Expense deleted successfully"
        });


    }catch(error){
        return res.status(400).json({
            success:false,
            error:error.message
        })
    }
    
}


//@update a expense
//@route api/v1/update

exports.updateExpense = async (req, res, next) => {
    try {
        let expense = await Expense.findOneAndUpdate(
            { _id: req.params.id, user: req.user.id }, // Check BOTH ID and User
            req.body,
            {
                new: true, // Return the updated version
                runValidators: true // Ensure data is valid
            }
        );

        if (!expense) {
            return res.status(404).json({
                success: false,
                error: "Expense not found or not authorized"
            });
        }

        res.status(200).json({
            success: true,
            message: "Expense updated successfully",
            expense
        });

    } catch (error) {
        res.status(400).json({
            success: false,
            error: error.message
        });
    }
};