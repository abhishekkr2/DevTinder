
const validator=require('validator');
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

const validateProfileEditData = (req)=>{
    const AllowedEditFields=["firstname","lastName","emailID","age","gender","skills"]

    const isEditAllowed =Object.keys(req.body).every(field =>
        AllowedEditFields.includes(field));

        return isEditAllowed;
};

module.exports={validatesignup,validateProfileEditData};