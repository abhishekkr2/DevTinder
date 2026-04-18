
const validator=require('validator');
// const { default: isEmail } = require('validator/lib/isEmail');
// const { default: isStrongPassword } = require('validator/lib/isStrongPassword');
validatesignup=(req)=>{
    const{firstName,lastName,emailID,password}=req.body;
    
    if(!firstName || !lastName){
        throw new Error("please enter valid name");

    }else if (!validator.isEmail(emailID)){
        throw new Error("enter valid email");
    }
    else if (!validator.isStrongPassword(password))
        {
        throw new Error("enter strong password");
    }
};

module.exports={validatesignup};