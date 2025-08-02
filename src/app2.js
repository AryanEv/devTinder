 const express = require("express");
 
 const app=express();

// app.use("/users",rh,[rh2,rh3],rh4,rh5);

app.use(
    "/user",
    [
    (req,res,next)=>{
        console.log("Handling the user route 1!");
        next();
        res.send("1st response");
    },
    (req,res,next)=>{
        console.log("Handling the user route 2!");
        next();
        res.send("2nd response");
    }],
    (req,res,next)=>{
        console.log("Handling the user route 3!");
        next();
        res.send("3rd response");
 
    },
    [(req,res)=>{
        console.log("Handling the user route 4!");
        res.send("4th response");
    }
]
)

 app.listen(3000,()=>{
    console.log("server is running on port 3000");
});