const Router=require("express"); 
const adminRouter=Router(); 
const {adminModel}=require("../db")
    adminRouter.post("/signup",(req,res)=>{ 
        res.json({ 
            msg:"user signup endpoints"
        })
    }); 

    adminRouter.post("/signin",(req,res)=>{ 
        res.json({ 
            msg:"user signin endpoint"
        })
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