const express = require("express");
const app = express();

app.use("/",(err, req, res, next) => {
    if(err){
        res.status(500).send('Something went wrong!');
    }
});

app.get("/getUserData",(req,res)=>{
    throw new Error('fdcgfe');
    res.send("User Data");
});

app.use("/getUserData",(err, req, res, next) => {
    if(err){
        res.status(500).send('Something went wrong!');
    }
});

app.listen(3333,()=>{
    console.log("server is running on port 3333");
});