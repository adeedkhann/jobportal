import { User } from "../models/user.model.js";
import bcrypt from "bcrypt"
import jwt from "jsonwebtoken"
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js";

export const register = asyncHandler(async (req, res) => {
    const { fullname, email, phoneNumber, password, role } = req.body;

    if (!fullname || !email || !phoneNumber || !password || !role) {
       throw new ApiError(400, "All fields are required");
    }

    const existedUser = await User.findOne({ email });

    if (existedUser) {
       throw new ApiError(409, "User with this email already exists");
    }

    const hashPassword = await bcrypt.hash(password, 10);

    const user = await User.create({
        fullname,
        email,
        phoneNumber,
        password: hashPassword,
        role,
    });
    const createdUser = await User.findById(user._id).select("-password");

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user");
    }

    return res.status(201).json(
        new ApiResponse(201, createdUser, "User created successfully")
    );
});

export const login = asyncHandler(async (req , res)=>{
    const {email , password , role} = req.body;
    
        if(!email || !password || !role){
            throw new ApiError(400,"all fields are required")
        }
        
        let user = await User.findOne({email})
        if(!user){
            throw new ApiError(400, "user doesnt exist")
        }

        const isPasswordCorrect = await bcrypt.compare(password , user.password)

        if(!isPasswordCorrect){
            throw new ApiError(400,"wrong password")
        }

        //check role is correct or not 

        if(role !==user.role){
            throw new ApiError(400,"account doesnt exist with current role")
        }

        const tokenData={
            userId:user._id
        }

        const token = jwt.sign(tokenData ,process.env.SECRET_KEY ,{expiresIn:'1d'})

        user = {
            _id:user._id,
            fullname:user.fullname,
            email:user.email,
            phoneNumber:user.phoneNumber,
            role:user.role,
            profile:user.profile
        }


        return res.status(200).cookie("token", token, {maxAge:1*24*60*60*1000 , httpOnly:true , sameSite:'lax'}).json(
            new ApiResponse(200 , user , "logged in successfully")
        )

})



export const logout = asyncHandler( async(req  , res)=>{
     
   return res.status(200).cookie("token", "",{maxAge:0})
        .json(
         new ApiResponse(200,{},"logout succesfully")
        )
})


export const updateProfile = asyncHandler(async(req , res)=>{
 const {fullname , email , phoneNumber , bio , skills} = req.body;
        const file = req.file;
        


        //cloudinary aayega yaha par

        const userId=req.id // middleware auth
        let avatar;
        let user = await User.findById(userId)
        if(file){
            avatar = await uploadOnCloudinary(file);
        }

        if(!user){
            throw new ApiError(400,"user not found")
        }

//updating data

if(fullname) user.fullname = fullname
if(email) user.email = email
if(file) user.profile.profilePhoto = avatar.url
if(phoneNumber) user.phoneNumber = phoneNumber
if (!user.profile) user.profile = {}; 
    
    if (bio) user.profile.bio = bio;
    
    if (skills) {
        // Convert "react, node, js" into ["react", "node", "js"]
        const skillsArray = skills.split(",").map(skill => skill.trim());
        user.profile.skills = skillsArray;
    }
        
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

        return res.status(200).json(
            new ApiResponse(200,user,"profile updated successfully")
        )
})

export const updateResume = asyncHandler(async(req,res)=>{
    const userId = req.id;
    const resume = req.file;

    if(!resume){
        throw new ApiError(404,"Resume file is required")
    }

    const resumeUrl = await uploadOnCloudinary(resume)
    if(!resumeUrl){
        throw new ApiError(404,"failed to upload on the cloudinary")
    }

    const user = await User.findByIdAndUpdate(
        userId,
        {
            $set: {
                "profile.resume": resumeUrl.secure_url,
                "profile.resumeOriginalName": resume.originalname // Option: Original name save karna helpful hota hai
            }
        },
        { new: true } // Taaki update hone ke baad naya data return ho
    ).select("-password")

    return res.status(200).json(
        new ApiResponse(200,user,"resume uploaded successfully")
    )
})


export const getProfile=asyncHandler(async(req,res)=>{
   const userId=req.id
   const user = await User.findById(userId).select('-password')
   if(!user){
    throw new ApiError(404 , "user not found log in again.")
   }

   return res.status(200).json(
    new ApiResponse(200,user,"user fetched successfully")
   )
})