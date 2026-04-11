import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Loader2, ArrowRight, ArrowLeft, Briefcase, ExternalLink } from 'lucide-react';

const FeaturedOpportunities = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchFeaturedJobs = async () => {
            try {
                // Latest jobs fetch kar rahe hain
                const res = await axios.get("https://jobportal-1-nhtb.onrender.com/api/v1/job/get", {
                    withCredentials: true
                });
                if (res.data.success) {
                    // Sirf pehli 6 jobs dikhayenge featured section mein
                    setJobs(res.data.data.slice(0, 6));
                }
            } catch (error) {
                console.log(error);
            } finally {
                setLoading(false);
            }
        };
        fetchFeaturedJobs();
    }, []);

    if (loading) return (
        <div className='flex justify-center py-20 bg-[#f0f2ff]'>
            <Loader2 className='animate-spin text-blue-700' />
        </div>
    );

    // Agar koi job nahi mili
    if (jobs.length === 0) return null;

    // Destructure jobs for Bento Layout
    const [mainJob, ...otherJobs] = jobs;

    return (
        <section className="bg-[#f0f2ff] py-16 px-4 md:px-6">
            <div className="max-w-7xl mx-auto">
                
                {/* Header Section */}
                <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-10 gap-4">
                    <div>
                        <h2 className="text-3xl md:text-5xl font-black text-slate-900 leading-tight">
                            Featured <span className="text-blue-700 italic font-serif">Opportunities</span>
                        </h2>
                        <p className="text-gray-500 mt-2 text-sm md:text-lg font-medium">
                            The most prestigious roles, refreshed daily.
                        </p>
                    </div>
                    {/* Navigation Buttons */}
                    <div className="flex gap-2">
                        <button onClick={() => navigate("/jobs")} className="p-3 rounded-2xl bg-white border border-slate-200 shadow-sm hover:bg-slate-50 transition-all">
                            <ArrowLeft size={20} className="text-slate-600" />
                        </button>
                        <button onClick={() => navigate("/jobs")} className="p-3 rounded-2xl bg-blue-700 text-white shadow-lg shadow-blue-200 hover:bg-blue-800 transition-all">
                            <ArrowRight size={20} />
                        </button>
                    </div>
                </div>

                {/* Bento Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                    
                    {/* MAIN FEATURED CARD (Index 0) */}
                    <div 
                        onClick={() => navigate(`/job/description/${mainJob._id}`)}
                        className="md:col-span-2 bg-white rounded-[2.5rem] p-8 md:p-12 flex flex-col justify-between relative overflow-hidden border border-slate-100 shadow-sm hover:shadow-xl transition-all group cursor-pointer"
                    >
                        <div className="absolute top-6 right-8 bg-blue-50 text-blue-700 px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest">
                            {mainJob.jobType}
                        </div>
                        
                        <div className="space-y-6">
                            <div className="w-16 h-16 bg-slate-900 rounded-2xl flex items-center justify-center overflow-hidden border-4 border-slate-50 shadow-lg">
                                {mainJob.company?.logo ? (
                                    <img src={mainJob.company.logo} alt="logo" className='w-full h-full object-cover' />
                                ) : (
                                    <Briefcase className="text-white" size={28} />
                                )}
                            </div>
                            
                            <div>
                                <h3 className="text-2xl md:text-4xl font-black text-slate-900 group-hover:text-blue-700 transition-colors">
                                    {mainJob.title}
                                </h3>
                                <p className="text-slate-500 mt-4 max-w-lg leading-relaxed text-sm md:text-lg font-medium line-clamp-2">
                                    {mainJob.description}
                                </p>
                            </div>

                            <div className="flex flex-wrap gap-3">
                                <span className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700">₹{mainJob.sallery} LPA</span>
                                <span className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-700">{mainJob.location}</span>
                            </div>
                        </div>

                        <button className="mt-10 w-full bg-blue-700 text-white font-bold py-5 rounded-2xl flex items-center justify-center gap-2 text-sm md:text-base hover:bg-blue-800 transition-all shadow-lg shadow-blue-100">
                            View Opportunity <ExternalLink size={18} />
                        </button>
                    </div>

                    {/* SMALLER SIDE CARDS (Index 1 & 2) */}
                    <div className="flex flex-col gap-6 lg:col-span-1">
                        {otherJobs.slice(0, 2).map((job) => (
                            <div 
                                key={job._id}
                                onClick={() => navigate(`/job/description/${job._id}`)}
                                className="bg-white p-8 rounded-[2rem] border border-slate-100 relative shadow-sm hover:shadow-md transition-all cursor-pointer group"
                            >
                                <div className="w-10 h-10 bg-blue-50 rounded-xl flex items-center justify-center mb-4 overflow-hidden">
                                     {job.company?.logo ? <img src={job.company.logo} className='w-full h-full object-cover'/> : <Briefcase className="text-blue-600" size={18} />}
                                </div>
                                <h4 className="text-lg font-black text-slate-900 group-hover:text-blue-700 transition-colors leading-tight">{job.title}</h4>
                                <p className="text-slate-400 text-xs font-bold mt-1 uppercase tracking-wider">{job.company?.name} • {job.location}</p>
                                <div className="mt-6 flex justify-between items-center border-t border-slate-50 pt-4">
                                    <span className="text-blue-700 font-black text-sm">₹{job.sallery} LPA</span>
                                    <ArrowRight size={16} className="text-slate-300 group-hover:text-blue-700 group-hover:translate-x-1 transition-all" />
                                </div>
                            </div>
                        ))}
                    </div>

                    {/* BOTTOM ROW CARDS (Index 3, 4, 5) */}
                    {otherJobs.slice(2, 5).map((job) => (
                        <div 
                            key={job._id}
                            onClick={() => navigate(`/job/description/${job._id}`)}
                            className="bg-white p-6 rounded-[2rem] border border-slate-100 flex flex-col justify-between shadow-sm hover:shadow-md transition-all cursor-pointer group"
                        >
                            <div>
                                <h4 className="text-base font-black text-slate-900 group-hover:text-blue-700 transition-colors">{job.title}</h4>
                                <p className="text-slate-400 text-[10px] font-bold uppercase mt-1 tracking-widest">{job.company?.name}</p>
                            </div>
                            <div className="mt-8 flex justify-between items-center">
                                <span className={`px-3 py-1 rounded-full text-[9px] font-black uppercase tracking-tighter bg-slate-100 text-slate-600`}>
                                    {job.experience} Yrs Exp
                                </span>
                                <ArrowRight size={14} className="text-slate-300 group-hover:text-blue-700" />
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
};

export default FeaturedOpportunities;