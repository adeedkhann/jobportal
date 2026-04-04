import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"


export const register = async(req , res)=>{
    try {
        const {fullname ,email,phoneNumber , password , role} = req.body;
        if(!fullname || !email || !phoneNumber || !password || !role){
            return res.status(400).json(
                {
                    message:"something is missing",
                    success:false
                }
            )
        }

        const user = await User.findOne({email})
        if(user){
            return res.status(400).json({
                message:"user already exists",
                success:false
            })
        }

        const hashPassword = await bcrypt.hash(password , 10)

        await User.create({
            fullname,
            email,
            phoneNumber,
            password:hashPassword,
            role,
        })

        return res.status(201).json({
            message:"account created successfully",
            success:true,
        })
    } catch (error) {
        console.log(error)
    }
}


export const login = async (req , res)=>{
    try {
        const {email , password , role} = req.body;
    
        if(!email || !password || !role){
            return res.status(400).json({
                message:"all fields are required",
                success:false
            })
        }
        
        let user = await User.findOne({email})
        if(!user){
            return res.status(400).json({
                message:"user doesnt exist",
                success:false
            })
        }

        const isPasswordCorrect = await bcrypt.compare(password , user.password)

        if(!isPasswordCorrect){
            return res.status(400).json({
                message:"wrong password",
                success:false
            })
        }

        //check role is correct or not 

        if(role !==user.role){
            return res.status(400).json({
                message:"account doesnt exist with current role",
                success:false
            })
        }

        const tokenData={
            userId:user._id
        }

        const token = await jwt.sign(tokenData ,process.env.SECRET_KEY ,{expiresIn:'1d'})

        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }


        return res.status(200).cookies("token", token, {maxAge:1*24*60*60*1000 , httpsOnly:true , sameSite:'strict'}).json({//for security
            message:`Welcome Back ${user.fullname}`,
            user,
            status:true
        })

    } catch (error) {
        console.log(error)
    }

}



export const logout = async(req  , res)=>{
     
    try {
        return res.status(200).cookie("token", "",{maxAge:0})
        .json({
            message:"logout successfully",
           success:true 
        })
    } catch (error) {
        console.log(error)

    }
}


export const updateProfile = async(req , res)=>{
    try {
        const {fullname , email , phoneNumber , bio , skills} = req.body;
        const file = req.file;
        if(!fullname || !email || !phoneNumber || !bio || !skills){
            return res.status(400).json(
                {
                    message:"something is missing",
                    success:false
                }
            )
        }


        //cloudinary aayega yaha par



        const skillsArray = skills.split(",");
        const userId=req.id // middleware auth

        let user = await User.findById(userId)

        if(!user){
            return res.status(400).json({
                message:"user not found",
                success:false
            })
        }

//updating data
        user.fullname = fullname,
        user.email = email,
        user.phoneNumber=phoneNumber,
        user.profile.bio=bio,
        user.profile.skills=skillsArray



        //resume yaha ayega
        await user.save();

        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }

        return res.status(200).json({
            message:"profile updated successfully",
            user,
            success:true
        })

    } catch (error) {
        console.log(error)
    }
}

