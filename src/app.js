const express = require("express");
const app=express();

const data = [
    {
        name:"John",
        age:30,
        city:"New York"
    },
    {
        name:"Jane",
        age:25,
        city:"Los Angeles"
    },
    {
        name:"Bob",
        age:35,
        city:"Chicago"
    }
]

app.get("/",(req,res)=>{
    res.send(data);
});

app.post("/create",(req,res)=>{
    res.send("create page");
});

app.put("/update",(req,res  )=>{
    res.send("update page");
});

app.delete("/delete",(req,res  )=>{
    res.send("delete page");
});

app.get(['/ac', '/abc'], (req, res) => {
    res.send("Matches /ac or /abc");
});

app.get(/^\/ab+c$/, (req, res) => {
    res.send("Matches one or more 'b' characters: /abc, /abbc, /abbbc, etc.");
});         

app.get(/ab*cd/,(req,res)=>{
    res.send("Matches zero or more 'b' characters: /acd, /abcd, /abbbcd, etc.");
});

app.get(/a(bc)?c/,(req,res)=>{
    res.send("Matches zero or one 'b' characters: /ac, /abc");
});

app.get(/a/,(req,res)=>{
    res.send("Matches 'a'");
});

app.get(/.*fly$/,(req,res)=>{
    res.send("Matches 'fly', 'highfly', 'superfly', etc.");
});

app.get("/user",(req,res)=>{
    console.log(req.query);
    res.send("user page query");
});

app.get("/user/:id",(req,res)=>{
    console.log(req.params);
    res.send("user page params");
});

app.listen(3000,()=>{
    console.log("server is running on port 3000");
});


