//MIDDDLEWARE

const express = require("express");

const app= express();
// correct way

    app.use("/user",(req,res)=>{

    try{
        throw new Error("hjshd");
        res.send("user data sent");
    }
    catch{
         res.status(500).send("something went wrong");
    }
});

//or only used for all 


// app.use("/user",(err,req,res,next)=>{
//     if(err){
//         res.status(500).send("something went wrong");
//     }
// });

app.listen(1000,()=>{
    console.log(" server stated");
});