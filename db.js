const mongoose=require("mongoose"); 
const Schema=mongoose.Schema; 
const ObjectId=mongoose.ObjectId; 
mongoose.connect("mongodb+srv://ishratalikhan004:Ishratkhan22@cluster0.fzscbb3.mongodb.net/course-selling-app")
const userSchema=new Schema({ 
    email:{ type:String, unique:true}, 
    password:String, 
    firstName:String, 
    lastName:String
}) 

const courseSchema=new Schema({ 
     title:String, 
     description:String, 
     price:Number, 
     imageUrl:String, 
     creatorId:ObjectId

}) 

const adminSchema=new Schema({ 
     email:{ type:String, unique:true}, 
    password:String, 
    firstName:String, 
    lastName:String
})  


const purchasesSchema=new Schema({ 
    courseId:ObjectId,
    userId:ObjectId

}) 

const userModel=mongoose.model("user",userSchema); 
const courseModel=mongoose.model("course",courseSchema); 
const adminModel=mongoose.model("admin",adminSchema); 
const purchaseModel=mongoose.model("purchase",purchasesSchema);  

module.exports={ 
    userModel,courseModel,adminModel,purchaseModel
}
