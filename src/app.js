//database and mongoose

//req.body.userId-- here userId should match schema

const dns=require('dns/promises');
dns.setServers(["8.8.8.8","1.1.1.1"])

const express = require("express");
const connectDB=require("./config/database");
const cookieparser=require('cookie-parser');
const {validatesignup}=require('./utils/validation');
const cors = require('cors')
const app= express();


const profileRouter =require("./routes/profile");
const requestRouter= require("./routes/request");
const authRouter = require("./routes/auth");
const userRouter = require("./routes/user");



app.use(cors(
     {origin : "http://localhost:5173",
          credentials : true,
     }
));
app.use(express.json());  //convert json=>js obj
app.use(cookieparser());

app.use("/",authRouter); //or just app.use(authRouter)
app.use("/",profileRouter);
app.use("/",requestRouter);
app.use("/",userRouter);





connectDB()
.then(()=>{
        console.log("database connected successfully");
        app.listen(1000,()=>{
         console.log("server started");
    });
})
.catch((err)=>{
     console.error("database connection failed");
});

   
