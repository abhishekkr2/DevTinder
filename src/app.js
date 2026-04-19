//database and mongoose

//req.body.userId-- here userId should match schema

const dns=require('dns/promises');
dns.setServers(["8.8.8.8","1.1.1.1"])

const express = require("express");
const connectDB=require("./config/database");
const cookieparser=require('cookie-parser');
const {validatesignup}=require('./utils/validation');


const profileRouter =require("./routes/auth");
const requestRouter= require("./routes/request");
const authRouter = require("./routes/profile");


const app= express();
app.use(express.json());  //convert json=>js obj
app.use(cookieparser());

app.use("/",authRouter); //or just app.use(authRouter)
app.use("/",profileRouter);
app.use("/",requestRouter);




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

   
