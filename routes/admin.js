const Router=require("express"); 
const adminRouter=Router(); 
const {adminModel,userModel, courseModel}=require("../db") 
const jwt=require("jsonwebtoken"); 
const {JWT_ADMIN_PASSWORD}=require("../config");  
const { adminMiddleware } = require("../middleware/admin");
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
                     },JWT_ADMIN_PASSWORD); 
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
    
    adminRouter.post("/course",adminMiddleware,async function(req,res){  
        const adminId=req.userId; 
        const {title,description,imageUrl,price}=req.body; 
         const course=await courseModel.create({ 
            title,
            description,
            imageUrl,
            price,
            creatorId:adminId       
         });
         res.json({ 
            msg:"course added", 
            courseId:course._id 
        })
    })
    adminRouter.put("/course",adminMiddleware, async function(req,res){ 
        const adminId=req.userId; 
        const {title,description,imageUrl,price,courseId}=req.body; 
         const course=await courseModel.updateOne({
            _id:courseId,
            creatorId:adminId // only the admin can change this only if creatorid is same as admin id 
         },{ 
            title,
            description,
            imageUrl,
            price
         });
         res.json({ 
            msg:"course updated", 
            courseId:course._id 
        })
    })
    adminRouter.get("/course/bulk",adminMiddleware,async function(req,res){  
        const adminId=req.userId; 
        const courses = await courseModel.find({ 
           creatorId:adminId
        })
         res.json({ 
            msg:"admin signin endpoint",
            courses:courses
        })
    })

module.exports={ 
    adminRouter:adminRouter
}

/// both JWT_ADMIN_PASSWORD for user and admin should be different 
/// bcoz these are diff databases their _id becomes then their token will be same
/// when this token is send to admin,some user can hit the admin end point with same token 