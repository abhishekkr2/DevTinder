const express = require("express");

const requestRouter = express.Router();
const {userAuth} = require("../middlewares/auth");
const ConnectionRequest = require("../model/connectionRequest");
const User = require("../model/user");
const sendEmail = require("../utils/sendEmail");

// api for status-> interested or ignored 
requestRouter.post("/request/send/:status/:toUserId",userAuth,async(req,res)=>{    // here userauth verify
//  the log in user and attah that user with req like (req.user = user) and that log in user is attached to req means 
// as it store the login user and  id is fetched from (req.user._id) 


   try{
    const fromUserId = req.user._id;  
    const toUserId = req.params.toUserId;
    const status = req.params.status;

    
    const allowedStatus = ["ignored","interested"];
    if(!allowedStatus.includes(status)){
        return res. status(400).json({message :"Invalid status type : "  + status});
    }

    // touserId is present in DB or not
        const toUser = await User.findById(toUserId);
        if(!toUser){
            return res.status(400).send ({message : "user not found"});
        }

    // if there is existing connection request
    const existingConnectionRequest = await ConnectionRequest.findOne({
        $or : [{fromUserId,toUserId}, // means wether user has sent req before or not if sent not allowed to send again
            {fromUserId : toUserId, toUserId : fromUserId}, // other user is sending to me 
            ]
    });
    if(existingConnectionRequest){
        return res .status(400).send({message : "Connection Request already exist"});
    }

    // creating instance 
    const connectionRequest = new ConnectionRequest({
        fromUserId,
        toUserId,
        status,
    });

    const data = await connectionRequest.save();

    const emailRes = await sendEmail.run(
          "New connection request!",                          // subject
  `${req.user.firstName} is interested in you`,      // body
  toUser.emailId  
    );
    console.log(emailRes);

    res.json({
        message : req.user.firstName + " is " + status +" in "+ toUser.firstName,
        data ,
    });

   }
   catch(err){
        res.status(400).send("Error :" + err. message);
   }
});

// api for status -> accepted or rejected
requestRouter.post("/request/review/:status/:requestId", userAuth, async(req,res) => {
    try{
      const loggedinuser = req.user; 
      const {status,requestId} = req.params;
      
      const allowedStatus = ["accepted","rejected"];
      if(!allowedStatus.includes(status)){
        return res.status(400).json({message : "status not allowed"});
      }

      const connectionRequest=await ConnectionRequest.findOne({
        _id : requestId,
        toUserId : loggedinuser._id,
        status : "interested",
      })

      if(!connectionRequest){
        return res.status(404).json({message : "connection request not found"});
      }
      connectionRequest.status=status;
    
      const data = await connectionRequest.save();

      res.json({ message : " connection request " + status ,data});


    }
    catch(err){
        console.error(err);
        res.status(400).send("ERROR :" + err.message);
    }
   

});

module.exports = requestRouter;