import { asyncHandler } from "../utils/asyncHandler";
import {ApiError} from "../utils/ApiError.js"
import Company from "../models/company.model.js"
import {ApiResponse} from "../utils/ApiResponse.js"
export const registerCompany = asyncHandler(async(req,res)=>{


    const {companyName}=req.body

    if(!companyName){
        throw new ApiError(400,"company name is required")
    }

    let company = await Company.findOne({companyName})
    
    if(company){
        throw new ApiError(400,"company already exist")
    }

    company = await Company.create({
        name:companyName,
        userId:req.id
    })
    
    return res.status(200).json(
        new ApiResponse
    )

})