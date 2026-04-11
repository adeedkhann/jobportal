import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { useSelector } from 'react-redux';
import { toast } from 'sonner';
import { 
  Briefcase, MapPin, DollarSign, Clock, 
  Building2, Users, Globe, ArrowLeft, Loader2, Bookmark, CheckCircle2,
  CalendarDays, Award
} from 'lucide-react';

const JobDetails = () => {
    const params = useParams();
    const jobId = params.id;
    const { user } = useSelector(store => store.auth);
    const navigate = useNavigate();

    const [singleJob, setSingleJob] = useState(null);
    const [loading, setLoading] = useState(true);
    const [applying, setApplying] = useState(false);
    const [isApplied, setIsApplied] = useState(false);

    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                const res = await axios.get(`https://jobportal-1-nhtb.onrender.com/api/v1/job/get/${jobId}`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    setSingleJob(res.data.data);
                    setIsApplied(res.data.data.applications.some(app => app.applicant === user?._id));
                }
            } catch (error) {
                console.log(error);
                toast.error("Job details not found");
            } finally {
                setLoading(false);
            }
        };
        fetchSingleJob();
    }, [jobId, user?._id]);

    const applyJobHandler = async () => {
        try {
            setApplying(true);
            const res = await axios.get(`https://jobportal-1-nhtb.onrender.com/api/v1/application/apply/${jobId}`, {
                withCredentials: true
            });
            if (res.data.success) {
                setIsApplied(true); 
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Internal server error");
        } finally {
            setApplying(false);
        }
    };

    if (loading) return <div className='h-screen flex items-center justify-center bg-[#f8faff]'><Loader2 className='animate-spin text-blue-600' /></div>;
    if (!singleJob) return <div className='h-screen flex items-center justify-center font-bold text-slate-500'>Job Not Found</div>;
    
    const company = singleJob.company;

    return (
        <div className="bg-[#f8faff] min-h-screen py-6 px-4 md:py-10 md:px-8">
            <div className="max-w-7xl mx-auto">
                
                {/* Back Button */}
                <button onClick={() => navigate(-1)} className='flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold text-[10px] md:text-xs uppercase tracking-widest mb-6 md:mb-8 transition-all'>
                    <ArrowLeft size={14} /> Back to Search
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">
                    
                    {/* LEFT COLUMN: Main Job Details */}
                    <div className="lg:col-span-2 space-y-6 md:space-y-8">
                        
                        {/* --- HEADER CARD --- */}
                        <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-12 border border-slate-100 shadow-sm">
                            <div className="flex flex-col gap-6">
                                <div className='flex flex-col md:flex-row items-start gap-5 md:gap-8'>
                                    {/* Company Logo */}
                                    <div className="w-16 h-16 md:w-20 md:h-20 bg-white rounded-2xl md:rounded-3xl flex items-center justify-center border-2 border-slate-100 overflow-hidden shadow-md p-2">
                                        {company?.logo ? (
                                            <img src={company.logo} alt="logo" className='w-full h-full object-contain' />
                                        ) : (
                                            <Building2 className="text-blue-600" size={28} />
                                        )}
                                    </div>

                                    <div className="flex-1">
                                        <div className='flex items-center flex-wrap gap-2 mb-2'>
                                            <h4 className='text-blue-600 font-bold text-xs md:text-sm tracking-tight'>{company?.name || "Company Name"}</h4>
                                            <div className="flex items-center gap-1">
                                                <CheckCircle2 size={14} className='text-emerald-500' />
                                                <span className="text-[9px] font-bold text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100 uppercase">Verified</span>
                                            </div>
                                        </div>
                                        <h1 className="text-2xl md:text-5xl font-black text-slate-900 leading-tight tracking-tight md:tracking-tighter">
                                            {singleJob.title}
                                        </h1>
                                        
                                        {/* Badges Container */}
                                        <div className="flex flex-wrap gap-2 md:gap-4 mt-6">
                                            <span className="flex items-center gap-1.5 px-3 py-2 md:px-5 md:py-2.5 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-bold text-slate-600">
                                                <DollarSign size={14} className='text-blue-600'/> ₹{singleJob.sallery} LPA
                                            </span>
                                            <span className="flex items-center gap-1.5 px-3 py-2 md:px-5 md:py-2.5 bg-slate-50 border border-slate-100 rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-bold text-slate-600">
                                                <MapPin size={14} className='text-blue-600'/> {singleJob.location}
                                            </span>
                                            <span className="flex items-center gap-1.5 px-3 py-2 md:px-5 md:py-2.5 bg-slate-900 rounded-xl md:rounded-2xl text-[10px] md:text-[11px] font-bold text-white shadow-lg shadow-slate-200">
                                                <Briefcase size={14}/> {singleJob.jobType}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons - Stacked on mobile */}
                                <div className='flex flex-col sm:flex-row gap-3 w-full lg:mt-4'>
                                    <button 
                                        onClick={isApplied || applying ? null : applyJobHandler}
                                        disabled={isApplied || applying}
                                        className={`flex-1 py-4 rounded-xl md:rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-[0.98] ${isApplied ? 'bg-emerald-500 text-white cursor-not-allowed shadow-emerald-100' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100'} disabled:opacity-70`}
                                    >
                                        {applying ? <Loader2 className="animate-spin" size={18} /> : isApplied ? "Applied Successfully!" : "Apply Now"}
                                    </button>
                                    <button className='sm:w-auto px-6 py-4 bg-slate-50 text-slate-500 rounded-xl md:rounded-2xl hover:text-slate-900 hover:bg-slate-100 transition-all border border-slate-100 flex items-center justify-center gap-2 font-bold text-sm'>
                                        <Bookmark size={18} /> <span className="sm:hidden lg:inline">Save Job</span>
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Full Job Description & Requirements */}
                        <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-5 md:p-12 border border-slate-100 shadow-sm">
                            <h2 className="text-lg md:text-xl font-bold text-slate-900 mb-4 md:mb-6 flex items-center gap-3">
                                <span className='w-1.5 h-6 bg-blue-600 rounded-full'/> Full Description
                            </h2>
                            <p className="text-slate-500 leading-relaxed font-medium whitespace-pre-line text-xs md:text-base">
                                {singleJob.description}
                            </p>

                            <h2 className="text-lg md:text-xl font-bold text-slate-900 mt-10 md:mt-14 mb-6 flex items-center gap-3">
                                <span className='w-1.5 h-6 bg-blue-600 rounded-full'/> Key Requirements
                            </h2>
                            <div className="flex flex-wrap gap-2">
                                {singleJob.requirements.map((item, i) => (
                                    <span key={i} className='px-4 py-2 bg-slate-50 border border-slate-100 rounded-lg md:rounded-2xl text-[10px] md:text-[11px] font-bold text-slate-600 uppercase tracking-tight hover:bg-blue-50 hover:text-blue-600 transition-colors'>
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Company Details & Activity */}
                    <div className="space-y-6 md:space-y-8 lg:sticky lg:top-8 lg:h-fit">
                        
                        {/* Company Card */}
                        <div className="bg-white rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 border border-slate-100 shadow-sm">
                            <h3 className="font-bold text-slate-400 mb-6 uppercase text-[9px] tracking-widest">About Company</h3>
                            <div className='flex items-center gap-4 mb-5'>
                                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center border border-slate-100 overflow-hidden p-2">
                                     {company?.logo ? <img src={company.logo} className='w-full h-full object-contain'/> : <Building2 size={20} className='text-blue-600'/>}
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-slate-900">{company?.name || "Company Name"}</h2>
                                    <p className="text-slate-400 text-[10px] font-bold uppercase tracking-tighter">Technology & SaaS</p>
                                </div>
                            </div>
                            <p className="text-slate-500 text-xs leading-relaxed mb-6">
                                {company?.description || "No company description available."}
                            </p>
                            
                            <div className="space-y-3 pt-5 border-t border-slate-50">
                                <div className="flex justify-between text-[10px] font-bold uppercase text-slate-900">
                                    <span className='text-slate-400'>Location</span>
                                    <span>{company?.location || "Remote"}</span>
                                </div>
                                <div className="flex justify-between text-[10px] font-bold uppercase text-slate-900">
                                    <span className='text-slate-400'>Website</span>
                                    <a href="#" className='text-blue-600 hover:underline flex items-center gap-1'><Globe size={12}/> Visit</a>
                                </div>
                            </div>
                        </div>

                        {/* Job Activity Card */}
                        <div className="bg-slate-900 rounded-[1.5rem] md:rounded-[2.5rem] p-6 md:p-8 text-white shadow-xl shadow-slate-200">
                            <h3 className="font-bold mb-6 text-[10px] uppercase tracking-widest opacity-50">Job Activity</h3>
                            <div className="space-y-5">
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold opacity-60 flex items-center gap-2 uppercase"><CalendarDays size={14}/> Posted</span>
                                    <span className="text-xs font-bold">{singleJob.createdAt?.split("T")[0]}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold opacity-60 flex items-center gap-2 uppercase"><Briefcase size={14}/> Applicants</span>
                                    <span className="text-xs font-bold text-blue-400">{singleJob.applications?.length || 0} Applied</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[10px] font-bold opacity-60 flex items-center gap-2 uppercase"><Award size={14}/> Experience</span>
                                    <span className="text-xs font-bold">{singleJob.experience} Years</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default JobDetails;