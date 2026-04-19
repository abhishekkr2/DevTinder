const express = require('express');
const {userAuth}=require("../middlewares/auth")



const profileRouter = express.Router();

//profile
profileRouter.get("/profile",userAuth,async(req,res)=>{
          try {
     const user = req.user;
     res.send(user);} //attached user used
     catch(err){
          res.status(400).send("error: " + err.message);
     }
     
});

module.exports= profileRouter;