const express=require('express')
const router=express.Router()
const {createExpense,getExpense, updateExpense, deleteExpense}=require('../controller/expenseController')
const {protect}=require('../middleware/auth')


router.post('/expense',protect,createExpense)

router.get('/getexpense',protect,getExpense)
router.put('/updateexpense/:id',protect,updateExpense)
router.delete('/deleteexpense/:id',protect,deleteExpense)

module.exports=router;

