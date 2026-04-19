// const adminAuth=(req,res,next)=>{
    // const token="abhi";
    // const isauthorized=token==="abhi";



    
    // if(!isauthorized){
    //     res.status(401).send("unauthorized request");
    // }
    // next();
    // };

    // module.exports={adminAuth};


    
    const jwt = require("jsonwebtoken");
    const User=require("../model/user")

  
        const userAuth = async(req,res,next)=>{
        try{
    // read the token from req.cookies
    const {token}=req.cookies;
        if(!token){
            throw new Error("token not found");
        }
        //validate
     const decodeobj = await jwt.verify(token,"DEV@Tinder$790");
     const{_id}=decodeobj;

     const user = await User.findById(_id)
     if(!user){
        throw new Error("user not found");
     }
     req.user=user; //attach to user

     next();
    }
      
    catch(err){
       res.status(400).send("error :" + err.message);
    };
      
    }
     
     //find user
    
     module.exports={userAuth};
   

