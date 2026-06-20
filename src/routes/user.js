const express =require("express");
const { userAuth } = require("../middlewares/auth");
const ConnectionRequest = require("../model/connectionRequest");
const { connection } = require("mongoose");
const userRouter = express.Router();
const User = require("../model/user");


// get all pending connection request
userRouter.get("/user/requests/received", userAuth, async (req,res) =>{
try{
    const loggedinuser = req.user;

    const connectionRequests = await ConnectionRequest.find({
        toUserId : loggedinuser._id,
        status : "interested"
    }).populate("fromUserId", ["firstName", "lastName","photoUrl","skills","gender","age"]);  // fetch the name from user schema

    res.json({message : " data fetched successfully",
        data: connectionRequests,
    });

}
catch(err){
    res.status(400).send("ERROR :" + err.message);
}

});

// get all connections - accepted
userRouter.get("/user/connections" , userAuth, async (req,res) => {
    try{
        const loggedinuser = req.user;

        const connectionRequest =await ConnectionRequest.find({
            $or : [
                {toUserId : loggedinuser._id, status :"accepted"},
                {fromUserId : loggedinuser._id, status : "accepted"},
            ],
        }).populate("fromUserId", ["firstName", "lastName","photoUrl"])
         .populate("toUserId", ["firstName", "lastName","photoUrl"]);


        const data = connectionRequest.map((row) => {
        if(row.fromUserId._id.toString() === loggedinuser._id.toString()){
            return row.toUserId;
        }
            return row.fromUserId
        });
        res.json ({data});
        
    }
    catch(err){
        res.status(400).send({message : err.message})
    }
})

//feed api
userRouter.get("/user/feed", userAuth, async(req,res) => {
    try{
       const loggedinuser = req.user;

       const page = parseInt(req.query.page) || 1;
       let limit = parseInt(req.query.limit) || 10;
         limit = limit > 50 ? 50 : limit;
         
       const skip = (page - 1 )* limit;

        const connectionRequests= await ConnectionRequest. find({
            $or: [{fromUserId : loggedinuser._id},{ toUserId: loggedinuser._id }],
        }).select("fromUserId  toUserId");
        
        const hideUserFromFeed = new Set();
        connectionRequests.forEach((req) => {
            hideUserFromFeed.add(req.fromUserId.toString());
            hideUserFromFeed.add(req.toUserId.toString());
        });
        
        const users = await User.find({
            $and : [
                {_id : { $nin : Array.from(hideUserFromFeed)}},
                {_id : { $ne : loggedinuser._id}}, ]
        }).select("firstName lastName age gender skills photoUrl").skip(skip).limit(limit);
        
        res.send(users);
    }
    catch(err){
        res.status(400).json({message : err.message});
    }
})

module.exports = userRouter;