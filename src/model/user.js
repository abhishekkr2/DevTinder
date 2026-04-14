
        // created user schema and usermodel

const mongoose=require('mongoose');

const userSchema=mongoose.Schema({
    firstName : {
        type:String
    }  ,

    lastName:{
          type:String
    } ,

    emailID : {
          type:String
    },

    password : { 
          type:String
    },

    age:{
          type:Number
    },

    gender : {
          type:String
    }
  
})

const User=mongoose.model("user",userSchema);

module.exports=User;