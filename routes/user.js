const express=require('express'); 
const Router=express.Router;
const userRouter = Router(); 
const {adminModel,userModel, purchaseModel, courseModel}=require("../db") 
const jwt=require("jsonwebtoken"); 
const {JWT_USER_PASSWORD}=require("../config"); 
const { userMiddleware } = require('../middleware/user');


    userRouter.post("/signup",async (req,res)=>{ 
        const email=req.body.email; 
        const password=req.body.password; 
        const firstName=req.body.firstname; 
        const lastName=req.body.secondname;   
        // add try catch and add hashed pwd and add zod 
        const p=await userModel.create({ 
            email:email,
            password:password,
            firstName:firstName,
            lastName:lastName
        })
        res.json({ 
            msg:" signup done "
        })
    }); 

    userRouter.post("/signin",async (req,res)=>{  
        const {email,password}=req.body;
        //if u have stored hashed pwd then u cannot compare password  
        let user=await userModel.findOne({ 
            email:email,
            password:password
        })
       ////.findOne returns either that entry or undefined
       //// .find returns empty array it will be considered as true,u can check by user.length==1 
        if(user){ 
              const token=jwt.sign({ 
                id:user._id
              },JWT_USER_PASSWORD); 
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

    userRouter.get("/purchases",userMiddleware,async (req,res)=>{  
        const userId=req.userId; 
        const purchases=await purchaseModel.find({ 
            userId
        }); 
        let purchased_courses=[];
        for(let i=0;i<purchases.length;i++){ 
           purchased_courses.push(purchases[i].courseId); 
        } 
        const courseData=await courseModel.find({ 
            _id:{$in: purchased_courses }
        })
        res.json({ 
           purchases,
           courseData
        })
    });  

    module.exports={ 
        userRouter:userRouter
    }
