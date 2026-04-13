//MIDDDLEWARE

const express = require("express");

const app= express();
//one route can have multiple route handler

    app.use("/user",
    (req,res,next)=>{
        console.log("handling 1");
        res.send("response!!!");
        next();
    },
    (req,res,next)=>{
         console.log("handling 2");
        res.send('response 2 !!!');
        
    })

app.listen(1000,()=>{
    console.log(" server stated");
});