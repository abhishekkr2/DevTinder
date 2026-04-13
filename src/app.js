//MIDDDLEWARE

const express = require("express");

const app= express();
//one route can have multiple route handler

const {adminAuth}=require("./middlewares/auth")
  app.use("/admin",adminAuth);

    app.get("/admin/getalldata",(req,res)=>{
      res.send("All Data Fetched");  
    });

    app.get("/admin/deletedata",(req,res)=>{
        res.send("deleted a Data");
    });

app.listen(1000,()=>{
    console.log(" server stated");
});