const {Router}=require("express"); 
const { userMiddleware } = require("../middleware/user");
const { courseModel, purchaseModel } = require("../db");
const courseRouter=Router(); 

    courseRouter.get("/purchase",userMiddleware,async (req,res)=>{ 
        const userId=req.userId; 
        const courseId=req.body.courseId; 
        await purchaseModel.create({ 
            userId,courseId
        })
        res.json({ 
            msg:"user purchases endpoint"
        })
    }); 

    courseRouter.get("/preview",async  (req,res)=>{ 
        const courses=await courseModel.find({}); 
        res.json({ 
            courses
        })
    }); 
module.exports={ 
    courseRouter:courseRouter
}