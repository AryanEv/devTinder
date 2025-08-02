export const adminAuth = (req,res,next)=>{
    console.log("Admin auth is getting checked");
    const token = "zaqwsxcderfv";
    const isAuthorised = token === "zaqwsxcderfv";
    if(!isAuthorised){
        return res.status(401).send("Unauthorized");
    }
    else{
        next();
    }   
}

export const userAuth = (req,res,next)=>{
    console.log("User auth is getting checked");
    const token = "zaqWsXcderfu";
    const isAuthorised = token === "zaqwsxcderfv";
    if(!isAuthorised){
        return res.status(401).send("Unauthorized");
    }
    else{
        next();
    }   
}