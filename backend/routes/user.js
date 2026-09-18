const express=require("express")
const {zod}=require("zod")
const { User } = require("../models/User")
const { RequireApprovalAlways } = require("@openrouter/sdk/models")
const {jwt}=require("jsonwebtoken")
const { JWT_SECRET } = require("../config")

const router=express.Router()

const userSchema= zod.object({
    username:zod.string(),
    password:zod.string(),
    firstName:zod.string(),
    lastName:zod.string()
})

router.post('/signup',async (req,res)=>{
    const body=req.body;
    const {success}=userSchema.safeParse(req.body)
    if(!success){
        return req.statusCode(411).json({
            message:"Email already taken / Incorrect Inputs"
        })
    }
    const user=User.findOne({
        username:body.username
    }
    )
    if(user._id){
        return req.json({
            message:"Email already taken/ Incorrect credential"
        })
    }
    const dbUser=await User.create(body)
    const token=jwt.sign({userID:user._id},JWT_SECRET)

    res.json({
        message:"user created successfully",
        token:token
    })

})

const signinbody=zod.object({
    username:zod.string(),
    password:zod.string()
})
router.post('/signin',async (req,res)=>{
    const body=req.body;
    const {success}=signinbody.safeParse(req.body)
    if(!success){
        return res.statusCode(411).json({
            message:"user not exists/ Incorrect credential"
        })
    }
    const user=user.findOne(
        {
            username:req.body.username,
            password:req.body.password
        }
    )

    if(user){
        const token=jwt.sign({userid:user._id},JWT_SECRET)
        res.json(
            {token:token}
        )
        return
    }

    res.status(411).json({
        message:"error while logging in"
    })

})

module.exports={
    router
}