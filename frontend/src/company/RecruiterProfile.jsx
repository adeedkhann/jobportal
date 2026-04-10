import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import UpdateProfileDialog from '@/components/ui/UpdateProfileDialog';
import { Building2, Mail, MapPin, Briefcase, Users, Plus, Link as LinkIcon, Loader2 } from 'lucide-react';
import axios from 'axios';
import { toast } from 'sonner';

const RecruiterProfile = () => {
    const [open, setOpen] = useState(false);
    const { user } = useSelector((store) => store.auth);
    const [company, setCompany] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCompany = async () => {
            try {
                // Aapka 'getCompany' endpoint recruiter ki sari companies (jo ki ab ek hi hogi) return karta hai
                const res = await axios.get("http://localhost:8000/api/v1/company/get", {
                    withCredentials: true
                });
                if (res.data.success) {
                    // Kyunki user ki ek hi company hogi, hum array ka pehla element lenge
                    setCompany(res.data.data[0]);
                }
            } catch (error) {
                console.log("Error fetching company:", error);
            } finally {
                setLoading(false);
            }
        };
        fetchCompany();
    }, []);

    if (loading) {
        return <div className='flex items-center justify-center h-screen'><Loader2 className='animate-spin text-blue-600' /></div>
    }

    return (
        <div className="bg-[#f8faff] min-h-screen py-10 px-4 md:px-8">
            <div className="max-w-6xl mx-auto space-y-8">

                {/* --- HEADER SECTION --- */}
                <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden relative p-8">
                    <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
                        <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
                            <div className="relative">
                                <img
                                    src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"}
                                    alt={user?.fullname}
                                    className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl object-cover ring-4 ring-slate-100"
                                />
                                <div className="absolute bottom-2 right-2 bg-emerald-500 rounded-full p-2 border-4 border-white text-white shadow-lg">
                                    <Building2 size={16} />
                                </div>
                            </div>
                            <div className="md:mb-2">
                                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">{user?.fullname}</h1>
                                <div className="flex flex-wrap justify-center md:justify-start gap-4 mt-2">
                                    <p className="flex items-center gap-1.5 text-sm text-blue-600 font-semibold bg-blue-50 px-3 py-1 rounded-full">
                                        <Mail size={14} /> {user?.email}
                                    </p>
                                    <p className="flex items-center gap-1.5 text-sm text-slate-500 font-medium">
                                        <MapPin size={14} /> {user?.profile?.location || "India"}
                                    </p>
                                </div>
                            </div>
                        </div>
                        <div className="flex gap-2 w-full md:w-auto">
                            <button onClick={() => setOpen(true)} className="flex-1 md:flex-none px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-slate-700 font-bold rounded-xl transition-colors text-sm">
                                Edit Admin Profile
                            </button>
                        </div>
                    </div>
                </div>

                {/* --- BIO SECTION --- */}
                <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-sm">
                    <h2 className="text-xl font-bold text-slate-900 mb-4">Professional Bio</h2>
                    <p className="text-gray-500 text-sm md:text-base leading-relaxed">
                        {user?.profile?.bio || "No bio added yet."}
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

                    {/* Quick Stats / Company Info */}
                    <div className="bg-slate-900 rounded-3xl p-6 md:p-8 flex flex-col justify-between text-white">
                        <div>
                            <h2 className="text-xl font-bold mb-6">Recruitment Overview</h2>
                            <div className="grid grid-cols-2 gap-4">
                                <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                                    <Briefcase className="text-blue-400 mb-2" size={20} />
                                    <p className="text-2xl font-black">--</p>
                                    <p className="text-[10px] uppercase font-bold text-slate-400">Active Jobs</p>
                                </div>
                                <div className="bg-white/10 p-4 rounded-2xl border border-white/10">
                                    <Users className="text-emerald-400 mb-2" size={20} />
                                    <p className="text-2xl font-black">--</p>
                                    <p className="text-[10px] uppercase font-bold text-slate-400">Total Applicants</p>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate("/admin/jobs/create")}
                            className="w-full mt-8 py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-900"
                        >
                            <Plus size={20} />
                            Post a New Job
                        </button>
                    </div>

                    {/* Dynamic Company Identity Section */}
                    <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
                        <div className='flex justify-between items-center mb-6'>
                            <h2 className="text-xl font-bold text-slate-900">Company Identity</h2>
                            {company && (
                                <button 
                                    onClick={() => navigate(`/updatecompany/${company._id}`)}
                                    className='text-xs text-blue-600 font-bold hover:underline'
                                >
                                    Edit Company
                                </button>
                            )}
                        </div>
                        
                        {company ? (
                            <div className="space-y-4">
                                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm overflow-hidden">
                                        {company.logo ? (
                                            <img src={company.logo} alt="logo" className='w-full h-full object-cover' />
                                        ) : (
                                            <Building2 className="text-blue-600" />
                                        )}
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Company Name</p>
                                        <p className="text-sm font-bold text-slate-900">{company.name}</p>
                                    </div>
                                </div>

                                <div className="flex items-center gap-4 p-4 bg-slate-50 rounded-2xl border border-slate-100">
                                    <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center shadow-sm">
                                        <LinkIcon size={18} className="text-blue-600" />
                                    </div>
                                    <div>
                                        <p className="text-xs font-bold text-slate-400 uppercase tracking-wider">Website</p>
                                        <a href={company.website} target="_blank" className="text-sm font-bold text-blue-600 truncate hover:underline">
                                            {company.website || "No website added"}
                                        </a>
                                    </div>
                                </div>
                            </div>
                        ) : (
                            <div className='text-center py-10'>
                                <p className='text-slate-400 text-sm mb-4'>No company registered yet.</p>
                                <button 
                                    onClick={() => navigate("/registercompany")}
                                    className='px-4 py-2 bg-blue-50 text-blue-600 rounded-lg text-xs font-bold'
                                >
                                    Register Now
                                </button>
                            </div>
                        )}
                    </div>
                </div>

                <UpdateProfileDialog open={open} setOpen={setOpen} />
            </div>
        </div>
    );
};

export default RecruiterProfile;