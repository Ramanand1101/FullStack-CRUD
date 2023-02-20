const express=require("express")
const {UserModel}=require("../model/model")
const bcrypt=require("bcrypt")
var jwt = require('jsonwebtoken');
const userRouter=express.Router()

userRouter.post("/register",async(req,res)=>{
    const {name,email,pass}=req.body
   
    try{
        //here we use the bcrypt package to hashing the password
        bcrypt.hash(pass, 5, async(err, hash)=>{
            if(err) res.send({"msg":"Something went Wrong","error":err.message})
            else{
                const user = new UserModel({name,email,pass:hash})
                await user.save()
                res.send({"msg":"user has been registered"})
            }
        });

    }catch(err){
        res.send({"msg":"User not registered","error":err.message})

    }
})
userRouter.post("/login",async(req,res)=>{
    const{email,pass}=(req.body)
   
    try{
        const user=await UserModel.find({email})
        if(user.length>0){
            bcrypt.compare(pass,user[0].pass,(err,result)=>{
                if(result==true){
                    let token=jwt.sign({userID:user[0]._id},"masai")
                    res.send({"msg":"Logged in Successful","token":token})
                }
                else{
                    res.send({"msg":"Wrong Credientials"})
                }
          })
        }
          else{
            res.send ({"msg":"Wrong credientials"})
        }
    }
    catch(err){
        res.send({"msg":"Something went Wrong","error":err.message})
    }

  
})
module.exports={
    userRouter
}