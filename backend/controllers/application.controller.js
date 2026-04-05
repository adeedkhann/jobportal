import { Job } from "../models/job.model.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import { Application } from "../models/application.model.js";

export const applyJob = asyncHandler(async(req,res)=>{
    const userId = req.id;
    const jobId = req.params.id
    if(!jobId){

        throw new ApiError(400,"job id is required")
    }
    const existApplication = await Application.findOne({ job:jobId ,applicant:userId})

    if(existApplication){
        throw new ApiError(400,"applicant already applied for the job")
    }

   const job= await Job.findById(jobId)
   if(!job){
    throw new ApiError(400,"Job not found")
   }

   const newApplication = await Application.create({
    job:jobId,
    applicant:userId
   })


   job.applications.push(newApplication._id)
   await job.save()
   return res.status(201).json(
    new ApiResponse(201,{},"Job applied successfully")
   )
})

export const getAppliedJobs = asyncHandler(async(req,res)=>{
    const userId=req.id
    const application = await Application.find({applicant:userId}).sort({createdAt:-1}).populate({
        path:'job',
        options:{sort:{createdAt:-1}},
        populate:{
            path:'company',
            options:{sort:{createdAt:-1}}
        }
    })
    if(!application){
        throw new ApiError(400,"No Applied Jobs")
    }

    return res.status(200).json(
        new ApiResponse(200,application,"Applied Job fetched successfully")
    )


})


export const getApplicant = asyncHandler(async(req,res)=>{
    const jobId = req.params.id;
    const job = await Job.findById(jobId).populate({
        path:"applications",
        sort:{createdAt:-1},
        populate:{
            path:"applicant"
        }
    })

    if(!job){
        throw new ApiError(404,"Job not found")
    }

    return res.status(200).json(
        new ApiResponse(200,job,"applicant fetched successfullly")
    )
})

export const updateStatus = asyncHandler(async(req,res)=>{
    const {status}=req.body
    const applicationId = req.params.id;
    
    
    if(!status){
        throw new ApiError(400,"status is required")
    }

const application = await Application.findOne({_id:applicationId})
    if(!application){
        throw new ApiError(404,"application not found")
    }

    application.status=status.toLowerCase();

    application.save();

    return res.status(200).json(
        new ApiResponse(200,{},"job status updated succesfull")
    )

})