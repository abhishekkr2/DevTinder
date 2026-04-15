//database and mongoose

//req.body.userId-- here userId should match schema

const dns=require('dns/promises');
dns.setServers(["8.8.8.8","1.1.1.1"])

const express = require("express");
const connectDB=require("./config/database");
const User=require('./model/user');
const { error } = require('console');
const app= express();
app.use(express.json());  //convert json=>js obj

//sign up - addind user to db
app.post("/signup",async (req,res)=>{

     //create new instance of user model
 const user=new User(req.body);
      
     try{await user.save();
     res.send("user added successfully");
     }catch(err){
          res.status(400).send("error: user not added" + err.message);
     }
     
});

//search user by email
app.get("/email",async (req,res)=>{
     const useremail=req.body.emailID;
     try{
          const users= await User.find({emailID:useremail});
          if(users.length === 0){
               res.status(404).send("user not found");
          }else{
          res.send(users);
          }
     }
     catch(err){
          res.status(400).send("something went wrong");
     }
     
});

//feed API - get all user
app.get("/feed",async (req,res)=>{
     try{
     const users =await User.find({});
     res.send(users);
     }
     catch(err){
          res.status(400).send("something went wrong");
     }
});

//delete api
app.delete("/user",async (req,res)=>{
     const userId=req.body.userId;

      try{
     const users =await User.findByIdAndDelete(userId);
     res.send("user deleted successfully");
     }
     catch(err){
          res.status(400).send("something went wrong");
     }
});

//update user

app.patch("/user",async (req,res)=>{
     const userId=req.body.userId;
     const data = req.body;
     try{
          const users=await User.findByIdAndUpdate(userId,data,{runValidators :true});
          res.send("user updated successfully");
          
     }
     catch(err){
          res.status(400).send("update failed : " + err.message);
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

   
