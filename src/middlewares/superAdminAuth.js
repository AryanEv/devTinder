export const superAdminAuth= (req,res,next)=>{
    console.log("super admin auth getting checked")
    const token = "superadmintoken";
    const isSuperAdminAuthorised = token === "superadmintoken";
    if (!isSuperAdminAuthorised){
        return res.status(401).send("unauthorized Super Admin")
    }
    else{
        next();
    }
}


