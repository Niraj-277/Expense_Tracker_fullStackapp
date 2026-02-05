const express=require("express")
const mongoose=require('mongoose')
const dotenv=require('dotenv')



const app = express();

app.use(express.json())

//!  1.  Load the config

dotenv.config()

//! 2. connect mongodb
const connectDb=require('./config/db')
console.log("MONGO_URI:", process.env.MONGO_URI);
connectDb();

//!3. Load the middleware
app.use(express.json())

//!4. Mount the Router
app.use('/api/v1',require('./routes/authRoutes')) 
app.use('/api/v1',require('./routes/expenseroutes'))





app.get("/",(req,res)=>{
    res.json({
        success:true,
    })
})
const PORT=process.env.PORT || 5000
app.listen(PORT,()=>{
    console.log(`server running ${5000}`)
})

