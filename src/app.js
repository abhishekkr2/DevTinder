//database and mongoose
const dns=require('dns/promises');
dns.setServers(["8.8.8.8","1.1.1.1"])

const express = require("express");
const connectDB=require("./config/database");
const User=require('./model/user');
const app= express();

app.post("/signup",async (req,res)=>{

     //create new instance of user model
 const user=new User({
     firstName:"abhishek",
     lastName:"kumar",
     emailID:"abhi@gmail.com",
     password:"abhi@123"
     });
      
     try{await user.save();
     res.send("user added successfully");
     }catch(err){
          res.status(400).send("error: user not added" + err.message);
     }
     
});




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

   
