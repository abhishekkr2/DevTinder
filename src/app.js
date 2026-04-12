const express = require("express");

const app= express();

app.use("/",(req,res) =>{
res.send("Welcome to dashbord");
});

app.use("/test",(req,res) =>{
res.send("no test cases");
});

app.listen(1000,()=>{
    console.log(" server stated");
});