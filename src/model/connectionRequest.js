const mongoose = require('mongoose');

const { equals } = require('validator');
const connectionRequestSchema = mongoose.Schema({

    fromUserId :{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "user",   // refrence relation to user schema
    },

    toUserId :{
        type: mongoose.Schema.Types.ObjectId,
        required : true,
        ref : "user",
    },

    status : {
        type : String,
        required : true,
        enum :{
            values : ["ignored", "interested", "accepted", "rejected"],
            message: `{VALUE} is incorrect status type`
        }
    }
},
{ timestamps : true});

// creating index
 connectionRequestSchema.index({fromUserId : 1, toUserId : 1});
// chech before saving
connectionRequestSchema.pre("save", async function () {
    
 
    // const connectionRequest=this;

    //check if fromUserId equals to toUserId 
    if(this.fromUserId.equals(this.toUserId)){
       throw new Error ("connot send request to yourself");
    
    }
    // next();
});

const ConnectionRequest = mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequest;