import {asyncHandler} from "../utils/asyncHandler.js"
import {ApiError} from "../utils/ApiError.js"
import {ApiResponse} from "../utils/ApiResponse.js"
import { Job } from "../models/job.model.js";






export const postJob = asyncHandler(async(req,res)=>{
console.log("Request Body:", req.body);
    const {title , description , requirements , sallery , location , jobType , position , experience , companyId} = req.body;
    const userId= req.id

    if(!title ||  !description || !requirements || !sallery || !location || !jobType || !position || !experience || !companyId){
        throw new ApiError(400,"all fields are required")
    }

    const job = await Job.create({
        title,
        description,
        requirements : requirements.split(","),
        sallery : Number(sallery),
        location ,
        jobType ,
        position ,
        experience ,
        company:companyId,
        created_by:userId
    })

    return res.status(200).json(
        new ApiResponse(200 , job,"new Job created successfully")
    )

})


export const getAllJobs = asyncHandler(async(req,res)=>{
    const keyword = req.query.keyword || ""
    const query ={
        $or:[
            {title:{$regex:keyword ,$options:"i"}},
            {description:{$regex:keyword, $options:"i"}}
        ]
    };

    const jobs = await Job.find(query).populate({
        path:"company"
    }).sort({createdAr:-1})

    if(!jobs){
        throw new ApiError(404,"jobs not found")
    }

    return res.status(200).json(
        new ApiResponse(200 , jobs, "jobs fetched successfully")
    )
})



export const getJobById = asyncHandler(async(req,res)=>{
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate("company").populate("applications")

    if(!job){
        throw new ApiError(400,"job not found")
    }

    return res.status(200).json(
        new ApiResponse(200,job,"job found successfully")
    )
})


export const getAdminJob = asyncHandler(async(req,res)=>{
    const adminId = req.id;
    const jobs = await Job.find({created_by:adminId})

    if(!jobs){
        throw new ApiError(404,"no job found")
    }

    return res.status(200).json(
        new ApiResponse(200,jobs,"jobs fetched successfully")
    )

})