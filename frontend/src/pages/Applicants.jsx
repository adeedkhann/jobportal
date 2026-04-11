import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { ArrowLeft, Loader2, MoreHorizontal, CheckCircle, XCircle } from 'lucide-react';
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

const Applicants = () => {
    const params = useParams();
    const navigate = useNavigate();
    const [applicants, setApplicants] = useState([]);
    const [loading, setLoading] = useState(true);

    const statusArray = ["Accepted", "Rejected"];

    // 1. Fetch Applicants for a specific job
// Applicants.jsx mein fetch logic
useEffect(() => {
    const fetchAllApplicants = async () => {
        try {
            const res = await axios.get(`https://jobportal-1-nhtb.onrender.com/api/v1/application/${params.id}/applicants`, {
                withCredentials: true
            });
            
            if (res.data.success) {
                // DHAYAN SE DEKHO: 
                // res.data.data poora "Job" object hai.
                // Humein uske andar ki "applications" array chahiye.
                setApplicants(res.data.data.applications); 
            }
        } catch (error) {
            console.log(error);
            toast.error("Could not fetch applicants");
        } finally {
            setLoading(false);
        }
    };
    fetchAllApplicants();
}, [params.id]);

    // 2. Update Status Handler
    const statusHandler = async (status, id) => {
        try {
            const res = await axios.post(`https://jobportal-1-nhtb.onrender.com/api/v1/application/status/${id}/update`, { status }, {
                withCredentials: true
            });
            if (res.data.success) {
                toast.success(res.data.message);
                // Refresh list locally
                setApplicants((prev) => 
                    prev.map(app => app._id === id ? { ...app, status } : app)
                );
            }
        } catch (error) {
            toast.error(error.response.data.message);
        }
    };

    if (loading) return <div className='h-screen flex items-center justify-center'><Loader2 className='animate-spin text-blue-600' /></div>

    return (
        <div className="bg-[#f8faff] min-h-screen p-8">
            <div className="max-w-7xl mx-auto">
                
                <button onClick={() => navigate(-1)} className='flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold text-xs uppercase tracking-widest mb-8 transition-all'>
                    <ArrowLeft size={16} /> Back to Dashboard
                </button>

                <div className="bg-white rounded-[2.5rem] p-10 border border-slate-100 shadow-sm">
                    <div className="flex justify-between items-center mb-10">
                        <h1 className="text-3xl font-black text-slate-900 italic">Job <span className="text-blue-600 not-italic">Applicants</span></h1>
                        <span className="bg-blue-50 text-blue-600 px-4 py-2 rounded-full text-xs font-bold uppercase tracking-widest border border-blue-100">
                            Total: {applicants?.length || 0}
                        </span>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left">
                            <thead>
                                <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-slate-50">
                                    <th className="pb-6">Full Name</th>
                                    <th className="pb-6">Email</th>
                                    <th className="pb-6">Resume</th>
                                    <th className="pb-6">Date Applied</th>
                                    <th className="pb-6">Status</th>
                                    <th className="pb-6 text-right">Action</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {applicants && applicants.map((app) => (
                                    <tr key={app._id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                                        <td className="py-6 flex items-center gap-3">
                                            <div className="w-10 h-10 rounded-xl bg-blue-50 flex items-center justify-center text-blue-600 font-bold">
                                                {app.applicant?.fullname?.charAt(0)}
                                            </div>
                                            <span className="font-bold text-slate-900">{app.applicant?.fullname}</span>
                                        </td>
                                        <td className="py-6 text-slate-500 font-medium">{app.applicant?.email}</td>
                                        <td className="py-6">
                                            {app.applicant?.profile?.resume ? (
                                                <a href={app.applicant.profile.resume} target="_blank" className="text-blue-600 font-bold hover:underline">View PDF</a>
                                            ) : <span className="text-slate-300">N/A</span>}
                                        </td>
                                        <td className="py-6 text-slate-400">{new Date(app.createdAt).toLocaleDateString()}</td>
                                        <td className="py-6">
                                            <span className={`px-3 py-1 rounded-full text-[10px] font-bold uppercase ${
                                                app.status === 'Accepted' ? 'bg-emerald-50 text-emerald-600' : 
                                                app.status === 'Rejected' ? 'bg-red-50 text-red-600' : 'bg-gray-100 text-gray-500'
                                            }`}>
                                                {app.status || "Pending"}
                                            </span>
                                        </td>
                                        <td className="py-6 text-right">
                                            <DropdownMenu>
                                                <DropdownMenuTrigger className="focus:outline-none">
                                                    <MoreHorizontal className="text-slate-400 cursor-pointer" />
                                                </DropdownMenuTrigger>
                                                <DropdownMenuContent align="end" className="w-40 rounded-xl p-1 shadow-xl border-slate-100">
                                                    {statusArray.map((status, i) => (
                                                        <DropdownMenuItem 
                                                            key={i} 
                                                            onClick={() => statusHandler(status, app._id)}
                                                            className={`flex items-center gap-2 p-2.5 cursor-pointer rounded-lg font-bold text-xs ${status === 'Accepted' ? 'text-emerald-600' : 'text-red-600'}`}
                                                        >
                                                            {status === 'Accepted' ? <CheckCircle size={14}/> : <XCircle size={14}/>}
                                                            {status}
                                                        </DropdownMenuItem>
                                                    ))}
                                                </DropdownMenuContent>
                                            </DropdownMenu>
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                        {applicants.length === 0 && (
                            <div className="py-20 text-center text-slate-400 font-medium italic">No applicants for this job yet.</div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Applicants;