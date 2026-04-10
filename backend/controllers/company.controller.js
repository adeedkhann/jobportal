import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {Company} from "../models/company.model.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {User} from "../models/user.model.js"
import { uploadOnCloudinary } from "../utils/cloudinary.js";





export const registerCompany = asyncHandler(async(req,res)=>{


    const {name}=req.body
    const userId = req.id;
    if(!name){
        throw new ApiError(400,"company name is required")
    }

    let company = await Company.findOne({name})
    
    if(company){
        throw new ApiError(400,"company already exist")
    }

    const existingUserCompany = await Company.findOne({ userId });
    if (existingUserCompany) {
        throw new ApiError(400, "You have already registered a company. One user can only own one company.");
    }

    const user = await User.findById(req.id);
    if (user.role !== 'recruiter') {
        throw new ApiError(403, "Only recruiters can register a company");
    }

    company = await Company.create({
        name:name,
        userId:req.id
    })
    
    return res.status(200).json(
        new ApiResponse(200, company,"company created successfully")
    )

})


export const getCompany = asyncHandler(async(req,res)=>{


    const userId=req.id //log user ki id 
    const companies = await Company.find({userId});
    
    if(!companies){
        throw new ApiError(404,"Companise not found")
    }

    return res.status(200).json(
        new ApiResponse(200,companies,"companies fetched successfully")
    )


})


export const getCompanyById= asyncHandler(async(req,res)=>{
    const companyId = req.params.id;
    const company = await Company.findById(companyId);

    if(!company){
        throw new ApiError(404,"company not found")
    }

    return res.status(200).json(
        new ApiResponse(200,company,"company fetched")
    )
})


export const updateCompany = asyncHandler(async(req,res)=>{
    const {name , description , website , location}  = req.body
   
    const file = req.file
    const companylogo = await uploadOnCloudinary(file);
    if(!companylogo){
        throw new ApiError(400,"cannt upload logo on the cloudinary")
    }
    const logo = companylogo.secure_url;

    const updateData = {name , description , website , location , logo}
    const companyId = req.params.id;

    const company = await Company.findByIdAndUpdate(companyId , updateData , {new:true})

    if(!company){
        throw new ApiError(404,"company not found")
    }

    return res.status(200).json(
        new ApiResponse(200,company,"company updated succesfull")
    )
    
})

