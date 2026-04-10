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

    // Initial Data Fetching (Ensuring Company Populate)
    useEffect(() => {
        const fetchSingleJob = async () => {
            try {
                // Backend controller check karein: router.route("/get/:id").get(isAuthenticated, getJobById);
                // Is getJobById controller mein `.populate("company")` zaroori hai.
                const res = await axios.get(`http://localhost:8000/api/v1/job/get/${jobId}`, {
                    withCredentials: true
                });
                if (res.data.success) {
                    setSingleJob(res.data.data);
                    // Check if user has already applied
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
            const res = await axios.get(`http://localhost:8000/api/v1/application/apply/${jobId}`, {
                withCredentials: true
            });
            if (res.data.success) {
                setIsApplied(res.data.data); // Update locally (applications populate nahi hai yahan)
                toast.success(res.data.message);
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Internal server error");
        } finally {
            setApplying(false);
        }
    };

    if (loading) return <div className='h-screen flex items-center justify-center bg-[#f8faff]'><Loader2 className='animate-spin text-blue-600' /></div>;
    if (!singleJob) return <div className='h-screen flex items-center justify-center'>Job Not Found</div>;
    const company = singleJob.company;

    return (
        <div className="bg-[#f8faff] min-h-screen py-10 px-4 md:px-8">
            <div className="max-w-7xl mx-auto">
                
                {/* Back Button */}
                <button onClick={() => navigate(-1)} className='flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold text-xs uppercase tracking-widest mb-8 transition-all'>
                    <ArrowLeft size={16} /> Back to Search
                </button>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                    
                    {/* LEFT COLUMN: Main Job Details */}
                    <div className="lg:col-span-2 space-y-8">
                        
                        {/* --- FIXED HEADER CARD (Exact Design) --- */}
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm relative">
                            <div className="flex flex-col md:flex-row justify-between items-start gap-8">
                                <div className='flex items-start gap-8'>
                                    {/* Company Logo (From Pi) */}
                                    <div className="w-20 h-20 bg-white rounded-3xl flex items-center justify-center border-2 border-slate-100 overflow-hidden shadow-lg p-3">
                                        {company?.logo ? (
                                            <img src={company.logo} alt="logo" className='w-full h-full object-cover' />
                                        ) : (
                                            <Building2 className="text-blue-600" size={32} />
                                        )}
                                    </div>
                                    <div>
                                        <div className='flex items-center gap-2.5 mb-2'>
                                            <h4 className='text-blue-600 font-bold text-sm tracking-tight'>{company?.name || "Company Name"}</h4>
                                            <CheckCircle2 size={15} className='text-emerald-500' />
                                            <span className="text-[10px] font-medium text-emerald-600 bg-emerald-50 px-2 py-0.5 rounded-full border border-emerald-100">Verified</span>
                                        </div>
                                        <h1 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight tracking-tighter">
                                            {singleJob.title}
                                        </h1>
                                        
                                        <div className="flex flex-wrap gap-4 mt-8">
                                            <span className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-bold text-slate-600">
                                                <DollarSign size={16} className='text-blue-600'/> ₹{singleJob.sallery} LPA
                                            </span>
                                            <span className="flex items-center gap-2 px-5 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-bold text-slate-600">
                                                <MapPin size={16} className='text-blue-600'/> {singleJob.location}
                                            </span>
                                            <span className="flex items-center gap-2 px-5 py-2.5 bg-slate-900 rounded-2xl text-[11px] font-bold text-white shadow-xl shadow-slate-300">
                                                <Briefcase size={16}/> {singleJob.jobType}
                                            </span>
                                        </div>
                                    </div>
                                </div>

                                {/* Action Buttons (Apply/Save) */}
                                <div className='flex flex-row md:flex-col gap-4 w-full md:w-auto md:min-w-[180px]'>
                                    <button 
                                        onClick={isApplied || applying ? null : applyJobHandler}
                                        disabled={isApplied || applying}
                                        className={`w-full py-4 rounded-2xl font-bold text-sm flex items-center justify-center gap-2 transition-all shadow-lg active:scale-95 ${isApplied ? 'bg-emerald-500 text-white cursor-not-allowed shadow-emerald-100' : 'bg-blue-600 text-white hover:bg-blue-700 shadow-blue-100'} disabled:opacity-70`}
                                    >
                                        {applying ? (
                                            <Loader2 className="animate-spin" size={18} />
                                        ) : isApplied ? (
                                            <>Applied Successfully!</>
                                        ) : (
                                            <>Apply Now</>
                                        )}
                                    </button>
                                    <button className='w-full p-4 bg-slate-50 text-slate-500 rounded-2xl hover:text-slate-900 hover:bg-slate-100 transition-all border border-slate-100 flex items-center justify-center gap-2 font-bold text-sm'>
                                        <Bookmark size={18} /> Save Job
                                    </button>
                                </div>
                            </div>
                        </div>

                        {/* Full Job Description & Requirements */}
                        <div className="bg-white rounded-[2.5rem] p-8 md:p-12 border border-slate-100 shadow-sm">
                            <h2 className="text-xl font-bold text-slate-900 mb-6 flex items-center gap-3">
                                <span className='w-1.5 h-6 bg-blue-600 rounded-full'/> Full Job Description
                            </h2>
                            <p className="text-slate-500 leading-relaxed font-medium whitespace-pre-line text-sm md:text-base">
                                {singleJob.description}
                            </p>

                            <h2 className="text-xl font-bold text-slate-900 mt-14 mb-8 flex items-center gap-3">
                                <span className='w-1.5 h-6 bg-blue-600 rounded-full'/> Key Requirements
                            </h2>
                            <div className="flex flex-wrap gap-2.5">
                                {singleJob.requirements.map((item, i) => (
                                    <span key={i} className='px-5 py-2.5 bg-slate-50 border border-slate-100 rounded-2xl text-[11px] font-bold text-slate-600 uppercase tracking-tight hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-colors'>
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* RIGHT COLUMN: Company Details & Activity */}
                    <div className="space-y-8 lg:sticky lg:top-8 lg:h-fit">
                        
                        {/* Company Card (Dynamic Data from Pi) */}
                        <div className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm">
                            <h3 className="font-bold text-slate-900 mb-8 uppercase text-[10px] tracking-widest text-slate-400">About Lumina Creative</h3>
                            <div className='flex items-center gap-4 mb-6'>
                                <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 overflow-hidden shadow-inner p-2">
                                     {company?.logo ? <img src={company.logo} className='w-full h-full object-cover'/> : <Building2 size={24} className='text-blue-600'/>}
                                </div>
                                <div>
                                    <h2 className="text-xl font-bold text-slate-900">{company?.name || "Lumina Creative"}</h2>
                                    <p className="text-slate-500 text-[10px] font-medium tracking-tight">Tech / SaaS</p>
                                </div>
                            </div>
                            <p className="text-slate-500 text-xs leading-relaxed mb-8 line-clamp-4">
                                {company?.description || "A design-first technology company building the next generation of creative productivity software."}
                            </p>
                            
                            <div className="space-y-4 pt-6 border-t border-slate-50">
                                <div className="flex justify-between text-xs font-bold uppercase tracking-tight text-slate-900">
                                    <span className='text-slate-400 font-medium'>Location</span>
                                    <span>{company?.location}</span>
                                </div>
                                <div className="flex justify-between text-xs font-bold uppercase tracking-tight text-slate-900">
                                    <span className='text-slate-400 font-medium'>Website</span>
                                    <a href="#" className='text-blue-600 hover:underline flex items-center gap-1'><Globe size={12}/> Visit Site</a>
                                </div>
                            </div>
                        </div>

                        {/* Job Activity (Professional Design) */}
                        <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-xl shadow-slate-200">
                            <h3 className="font-bold mb-8 text-xs uppercase tracking-widest opacity-60">Job Activity Overview</h3>
                            <div className="space-y-6 pt-2 border-t border-white/5">
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] font-medium opacity-70 flex items-center gap-2"><CalendarDays size={14}/> Posted on</span>
                                    <span className="text-sm font-bold">{singleJob.createdAt?.split("T")[0]}</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] font-medium opacity-70 flex items-center gap-2"><Briefcase size={14}/> Applicants</span>
                                    <span className="text-sm font-bold text-blue-400">{singleJob.applications?.length || 0} Applied</span>
                                </div>
                                <div className="flex justify-between items-center">
                                    <span className="text-[11px] font-medium opacity-70 flex items-center gap-2"><Award size={14}/> Required Exp</span>
                                    <span className="text-sm font-bold">{singleJob.experience} Years</span>
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