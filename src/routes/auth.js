const express=require("express");
const bcrypt = require('bcrypt');
const {validatesignup}=require('../utils/validation');
const User=require("../model/user");
const {userAuth} = require("../middlewares/auth")




const authRouter = express.Router();

//sign up - addind user to db
authRouter.post("/signup",async (req,res)=>{

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
authRouter.post("/Login",async(req,res) =>{
     try{
          const {emailID,password}=req.body;
         const user = await User.findOne({emailID:emailID}) ;
         if(!user){
          throw new Error("user not found");
         }
         const ispasswordValid = await bcrypt.compare(password,user.password);
         if(ispasswordValid){

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

//Logout
authRouter.post("/Logout",async(req,res)=>{
    res.cookie("token",null,{ expires : new Date(Date.now()) });
    
    res.send("Loged out successfully");
});

module.exports = authRouter;