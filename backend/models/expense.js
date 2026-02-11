const mongoose=require('mongoose')


const expenseSchema= new mongoose.Schema({
    title:{
        type:String,
        required:true,
        maxlength:[100,'Title cannot be more than 100 characters']
    },
    amount:{
        type:Number,
        required:true
    },
    category:{
        type:String,
        enum:['food','rent','travel','general'],
        default:'general'
    },
    
    //Relationship with the user
    user:{
        type:mongoose.Schema.ObjectId,
        ref:'User',
        required:true
    },
    created_at:{
        type:Date,
        default:Date.now
    }
})

module.exports =mongoose.model('Expense',expenseSchema);