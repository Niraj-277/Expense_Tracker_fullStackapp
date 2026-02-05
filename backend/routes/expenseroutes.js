const express=require('express')
const router=express.Router()
const {createExpense}=require('../controller/expenseController')
const {protect}=require('../middleware/auth')


router.post('/expense',protect,createExpense)

module.exports=router;

