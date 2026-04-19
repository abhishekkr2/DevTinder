//database and mongoose

//req.body.userId-- here userId should match schema

const dns=require('dns/promises');
dns.setServers(["8.8.8.8","1.1.1.1"])

const express = require("express");
const connectDB=require("./config/database");
const User=require('./model/user');
const {validatesignup}=require('./utils/validation');
const { error } = require('console');
const bcrypt = require('bcrypt');
const cookieparser=require('cookie-parser');
const {userAuth}=require("./middlewares/auth")

const jwt =require('jsonwebtoken');

const app= express();
app.use(express.json());  //convert json=>js obj
app.use(cookieparser());

//sign up - addind user to db
app.post("/signup",async (req,res)=>{

     try{
          //validation
     validatesignup(req);

      const{firstName,lastName,emailID,password}=req.body;
     //encryption
          const passwordHash=await bcrypt.hash(password,10);

     //create new instance of user model
      const user=new User({firstName,lastName,emailID,password:passwordHash});
      
     await user.save();
     res.send("user added successfully");
     }
     catch(err){
          res.status(400).send("error: user not added : " + err.message);
     }
     
});

//LogIn
app.post("/Login",async(req,res) =>{
     try{
          const {emailID,password}=req.body;
         const user = await User.findOne({emailID:emailID}) ;
         if(!user){
          throw new Error("user not found");
         }
         const ispasswordValid = await bcrypt.compare(password,user.password);
         if(ispasswordValid){

          // create JWT Token
          // const token= await jwt.sign({_id: user._id},"DEV@Tinder$790");
          //console.log(token);
               //or
               const token = await user.getJWT()
          //Add Tooken to cookies and send back to user
          res.cookie("token",token);

          res.send("Login Successfully");
         }
         else{
          throw new Error("password Incorrect");
         }
     
     }
     catch(err){
          res.status(400).send("error: " + err.message);
     }

});

//profile
app.get("/profile",userAuth,async(req,res)=>{
          try {
     const user = req.user;
     res.send(user);} //attached user used
     catch(err){
          res.status(400).send("error: " + err.message);
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

   
