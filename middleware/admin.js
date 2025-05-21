const jwt=require("jsonwebtoken"); 
const {JWT_ADMIN_PASSWORD} =require("../config")
function adminMiddleware(req,res,next){ 
   const token=req.headers.token; 
   const decoded=jwt.verify(token,JWT_ADMIN_PASSWORD); 
   if(decoded){ 
    req.userId=decoded.id; /// may require to change userId to adminId
    next(); 
   }
   else{ 
    res.json({ 
        msg:"invalid"
    })
   }
} 


module.exports={ 
    adminMiddleware:adminMiddleware
}