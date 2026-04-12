const express = require("express");

const app= express();

// routing creation 
//order of routes matter
// app.use("/test",(req,res) =>{
// res.send("no test cases");
// });

app.get("/user",(req,res) =>{
res.send({firstname:"abhishek",lastname:"kumar"});
});

app.post("/user",(req,res) =>{
res.send("data saved successfully to database");
});

app.delete("/user",(req,res) =>{
res.send("data deleted successfully from database");
});

app.listen(1000,()=>{
    console.log(" server stated");
});