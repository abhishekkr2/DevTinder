
        // created user schema and usermodel

const mongoose=require('mongoose');
var validator = require('validator');


const userSchema=mongoose.Schema({
    firstName : {
        type:String,
        required:true,
        minLength:2,
        maxLength:15,
    }  ,

    lastName:{
          type:String,
          maxLength:15,
    } ,

    emailID : {
          type:String,
          lowercase:true,
          required:true,
          unique:true,
          trim:true,
         validate(value){
            if(!validator.isEmail(value)){
                  throw new Error("invalid email: "+ value);
            }
          },
         
    },

    password : { 
          type:String,
          required:true,
    },

    age:{
          type:Number,
          default:25,
          min:18,
    },

    gender : {
          type:String,
          validate(value){
            if(!["male","female","others"].includes(value)){
                  throw new Error("gender not valid")
            }
          },
    },

    skills : {
      type:[String],
    }
  
},
{
      timestamp:true,
});

const User=mongoose.model("user",userSchema);

module.exports=User;