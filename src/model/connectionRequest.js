const mongoose = require('mongoose');
const { equals } = require('validator');
const connectionRequestSchema = mongoose.Schema({

    fromUserId :{
        type : mongoose.Schema.Types.ObjectId,
        required : true,
    },

    toUserId :{
        type: mongoose.Schema.Types.ObjectId,
        required : true,
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
connectionRequestSchema.pre("save", function(next) {
    const connectionRequest=this;

    //check if fromUserId equals to toUserId 
    if(connectionRequest.fromUserId.equals(connectionRequest.toUserId)){
       throw new Error ("connot send request to yourself");
    
    next();
    }
});

const ConnectionRequest = mongoose.model("ConnectionRequest",connectionRequestSchema);

module.exports = ConnectionRequest;