const express = require('express');
const {userAuth}=require("../middlewares/auth")
const {validateProfileEditData}=require("../utils/validation")


const profileRouter = express.Router();

//profile
profileRouter.get("/profile/view",userAuth,async(req,res)=>{
          try {
     const user = req.user;
     res.send(user);} //attached user used
     catch(err){
          res.status(400).send("error: " + err.message);
     }
     
});

//Profile update
profileRouter.patch("/profile/edit",userAuth,async(req,res)=>{
     try{
     if(!validateProfileEditData(req)){
          throw new Error("invalid edit request");
          }
          const logedinuser=req.user;  // attached user
          console.log(logedinuser);

          Object.keys(req.body).forEach(key => logedinuser[key] = req.body[key]);
          console.log(logedinuser);
          await logedinuser.save();

          res.send("profile updated successfully");
     }
     catch(err){
          res.status(400).send("error: " + err.message);
     }

     
})

module.exports= profileRouter;