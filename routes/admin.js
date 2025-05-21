const Router=require("express"); 
const adminRouter=Router(); 
const {adminModel,userModel}=require("../db") 
const jwt=require("jsonwebtoken"); 
const JWT_SECRET="admincsa";  
    adminRouter.post("/signup",async(req,res)=>{  
        const email=req.body.email; 
        const password=req.body.password; 
        const firstName=req.body.firstname; 
        const lastName=req.body.secondname;   
        // add try catch and add hashed pwd and add zod 
        const p=await adminModel.create({ 
            email:email,
            password:password,
            firstName:firstName,
            lastName:lastName
        })
        res.json({ 
            msg:" signup done "
        })
    }); 

    adminRouter.post("/signin",async(req,res)=>{ 
        const {email,password}=req.body;
               //if u have stored hashed pwd then u cannot compare password  
               let admin=await adminModel.findOne({ 
                   email:email,
                   password:password
               })
              ////.findOne returns either that entry or undefined
              //// .find returns empty array it will be considered as true,u can check by admin.length==1 
               if(admin){ 
                     const token=jwt.sign({ 
                       id:admin._id
                     },JWT_SECRET); 
                     /// cookie based auth can be added here 
                     res.json({ 
                       token:token,
                       msg:"sign up successfully "
                     })
               }else{ 
               res.status(403).json({ 
                   msg:"Invalid cred"
               }) 
              }
       
    }); 
    
    adminRouter.post("/course",function(req,res){ 
         res.json({ 
            msg:"admin signin endpoint"
        })
    })
    adminRouter.put("/course",function(req,res){ 
         res.json({ 
            msg:"admin signin endpoint"
        })
    })
    adminRouter.get("/course/bulk",function(req,res){ 
         res.json({ 
            msg:"admin signin endpoint"
        })
    })

module.exports={ 
    adminRouter:adminRouter
}