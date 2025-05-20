const {Router}=require("express"); 
const courseRouter=Router(); 

    courseRouter.get("/purchase",(req,res)=>{ 
        res.json({ 
            msg:"course purchase  endpoints"
        })
    }); 

    courseRouter.get("/preview",(req,res)=>{
        res.json({ 
            msg:"course preview  endpoints"
        })
    }); 
module.exports={ 
    courseRouter:courseRouter
}