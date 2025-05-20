const express=require('express'); 
const Router=express.Router;
const userRouter = Router(); 
    userRouter.post("/signup",(req,res)=>{ 
        res.json({ 
            msg:"user signup endpoints"
        })
    }); 

    userRouter.post("/signin",(req,res)=>{ 
        res.json({ 
            msg:"user signin endpoint"
        })
    });  

    userRouter.get("/purchases",(req,res)=>{ 
        res.json({ 
            msg:"user purchases endpoint"
        })
    });  

    module.exports={ 
        userRouter:userRouter
    }
