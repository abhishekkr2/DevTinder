const adminAuth=(req,res,next)=>{
    const token="abhi";
    const isauthorized=token==="abhi";
    
    if(!isauthorized){
        res.status(401).send("unauthorized request");
    }
    next();
    };

    module.exports={adminAuth};
