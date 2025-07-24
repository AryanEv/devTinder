const express = require("express");
const app=express();

app.get("/",(req,res)=>{
    res.send("hello world !");
});

app.use("/about",(req,res)=>{
    res.send("about page");
});

app.use("/contact",(req,res  )=>{
    res.send("contact page");
});

app.listen(3000,()=>{
    console.log("server is running on port 3000");
});

// order of rounting to write is matter a lot


