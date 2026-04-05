import { asyncHandler } from "../utils/asyncHandler.js";
import {ApiError} from "../utils/ApiError.js"
import {Company} from "../models/company.model.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import {User} from "../models/user.model.js"






export const registerCompany = asyncHandler(async(req,res)=>{


    const {companyName}=req.body

    if(!companyName){
        throw new ApiError(400,"company name is required")
    }

    let company = await Company.findOne({companyName})
    
    if(company){
        throw new ApiError(400,"company already exist")
    }

    const user = await User.findById(req.id);
    if (user.role !== 'recruiter') {
        throw new ApiError(403, "Only recruiters can register a company");
    }

    company = await Company.create({
        name:companyName,
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
    const updateData = {name , description , website , location}
    const file = req.file
    //cloudinary
    const companyId = req.params.id;

    const company = await Company.findByIdAndUpdate(companyId , updateData , {new:true})

    if(!company){
        throw new ApiError(404,"company not found")
    }

    return res.status(200).json(
        new ApiResponse(200,company,"company updated succesfull")
    )
    
})

