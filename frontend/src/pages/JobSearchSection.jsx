import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Search, MapPin, Briefcase, DollarSign, Loader2 } from 'lucide-react';
import { toast } from 'sonner';
import { useNavigate } from 'react-router-dom';

const JobSearchSection = () => {
    const [jobs, setJobs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [searchQuery, setSearchQuery] = useState("");
    const navigate = useNavigate();

    // 1. Fetch Jobs Function (Supports Search)
    const fetchJobs = async (keyword = "") => {
        try {
            setLoading(true);
            // Query parameter 'keyword' bhej rahe hain jaisa aapke backend mein hai
            const res = await axios.get(`https://jobportal-1-nhtb.onrender.com/api/v1/job/get?keyword=${keyword}`, {
                withCredentials: true
            });
            if (res.data.success) {
                setJobs(res.data.data);
            }
        } catch (error) {
            console.error(error);
            toast.error("Failed to fetch jobs");
        } finally {
            setLoading(false);
        }
    };

    // Initial Load
    useEffect(() => {
        fetchJobs();
    }, []);

    // 2. Search Handler
    const handleSearch = (e) => {
        e.preventDefault();
        fetchJobs(searchQuery);
    };

    return (
        <div className="bg-[#f8faff] min-h-screen pb-20">
            {/* Hero / Search Header */}
            <div className="bg-white border-b border-slate-100 py-16 px-6">
                <div className="max-w-4xl mx-auto text-center">
                    <h1 className="text-4xl md:text-5xl font-black text-slate-900 mb-6">
                        Find your <span className="text-blue-600">dream career</span> today.
                    </h1>
                    <form 
                        onSubmit={handleSearch}
                        className="flex flex-col md:flex-row gap-3 bg-white p-2 rounded-[2rem] shadow-xl shadow-blue-100 border border-slate-100"
                    >
                        <div className="flex-grow flex items-center px-6 gap-3">
                            <Search className="text-blue-600" size={20} />
                            <input 
                                type="text" 
                                placeholder="Search by job title or description..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                                className="w-full py-4 bg-transparent border-none focus:outline-none text-sm font-medium"
                            />
                        </div>
                        <button 
                            type="submit"
                            className="bg-blue-600 hover:bg-blue-700 text-white px-10 py-4 rounded-[1.5rem] font-bold transition-all"
                        >
                            Search Jobs
                        </button>
                    </form>
                </div>
            </div>

            {/* Jobs Grid */}
            <div className="max-w-7xl mx-auto px-6 mt-12">
                <div className="flex justify-between items-center mb-8">
                    <h2 className="text-xl font-bold text-slate-900">
                        {searchQuery ? `Search Results for "${searchQuery}"` : "Latest Job Openings"}
                        <span className="ml-3 text-sm font-medium text-slate-400">({jobs.length})</span>
                    </h2>
                </div>

                {loading ? (
                    <div className="flex flex-col items-center justify-center py-20">
                        <Loader2 className="animate-spin text-blue-600 mb-4" size={40} />
                        <p className="text-slate-400 font-bold uppercase tracking-widest text-xs">Fetching Opportunities...</p>
                    </div>
                ) : jobs.length > 0 ? (
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                        {jobs.map((job) => (
                            <div 
                                key={job._id}
                                className="bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm hover:shadow-md transition-all group cursor-pointer"
                                onClick={() => navigate(`/job/description/${job._id}`)}
                            >
                                <div className="flex justify-between items-start mb-6">
                                    <div className="w-14 h-14 bg-slate-50 rounded-2xl flex items-center justify-center border border-slate-100 overflow-hidden">
                                        {job.company?.logo ? (
                                            <img src={job.company.logo} alt="logo" className="w-full h-full object-cover" />
                                        ) : (
                                            <Briefcase className="text-blue-600" size={24} />
                                        )}
                                    </div>
                                    <span className="bg-emerald-50 text-emerald-600 text-[10px] font-bold px-3 py-1 rounded-full uppercase">
                                        {job.jobType}
                                    </span>
                                </div>

                                <h3 className="text-lg font-bold text-slate-900 group-hover:text-blue-600 transition-colors">
                                    {job.title}
                                </h3>
                                <p className="text-sm font-medium text-slate-400 mt-1">
                                    {job.company?.name || "Anonymous Company"}
                                </p>

                                <div className="mt-6 flex flex-wrap gap-4 border-t border-slate-50 pt-6">
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                        <MapPin size={14} className="text-blue-500" /> {job.location}
                                    </div>
                                    <div className="flex items-center gap-1.5 text-xs text-slate-500 font-medium">
                                        <DollarSign size={14} className="text-blue-500" /> {job.sallery} LPA
                                    </div>
                                </div>

                                <div className="mt-6 flex gap-2">
                                    {job.requirements.slice(0, 3).map((req, i) => (
                                        <span key={i} className="px-3 py-1 bg-slate-50 text-[9px] font-bold text-slate-500 rounded-md uppercase">
                                            {req}
                                        </span>
                                    ))}
                                </div>
                            </div>
                        ))}
                    </div>
                ) : (
                    <div className="text-center py-20 bg-white rounded-[3rem] border border-dashed border-slate-200">
                        <p className="text-slate-400 font-medium italic">No jobs match your current search criteria.</p>
                        <button 
                            onClick={() => {setSearchQuery(""); fetchJobs();}}
                            className="text-blue-600 font-bold mt-4 hover:underline"
                        >
                            Clear all filters
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default JobSearchSection;