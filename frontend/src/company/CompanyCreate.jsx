import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { Building2, ArrowLeft } from 'lucide-react';

const CompanyCreate = () => {
    const navigate = useNavigate();
    const [companyName, setCompanyName] = useState("");

    const registerNewCompany = async () => {
       
        try {
            const res = await axios.post("https://jobportal-1-nhtb.onrender.com/api/v1/company/register", 
                { name:companyName }, 
                { withCredentials: true }
            );

            if (res.data.success) {
                toast.success(res.data.message);
                const companyId = res.data.data?._id;
                // Registration ke baad seedha Setup (Details) page par bhej rahe hain
                navigate(`/updatecompany/${companyId}`);
            }
        } catch (error) {
            console.log(error);
            toast.error(error.response?.data?.message || "Error creating company");
        }
    }

    return (
        <div className="bg-[#f8faff] min-h-screen flex items-center justify-center p-6">
            <div className="max-w-2xl w-full bg-white rounded-[2.5rem] p-10 shadow-sm border border-slate-100">
                <button 
                    onClick={() => navigate("/")} 
                    className="flex items-center gap-2 text-slate-400 hover:text-slate-900 font-bold text-xs uppercase tracking-widest mb-8 transition-all"
                >
                    <ArrowLeft size={16} /> Back to List
                </button>

                <div className="mb-10">
                    <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-600 mb-6">
                        <Building2 size={32} />
                    </div>
                    <h1 className="text-3xl font-black text-slate-900 leading-tight">
                        What's your <span className="text-blue-600">Company Name?</span>
                    </h1>
                    <p className="text-gray-400 text-sm mt-3 font-medium">
                        Give your company a professional name. Don't worry, you can always change the details like logo and location later.
                    </p>
                </div>

                <div className="space-y-6">
                    <div className="space-y-2">
                        <label className="text-[10px] font-bold text-slate-400 uppercase tracking-[0.2em]">Company Name</label>
                        <input 
                            type="text" 
                            value={companyName}
                            
                            className="w-full p-5 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-blue-500 font-bold text-slate-700 transition-all shadow-inner"
                            placeholder="e.g. TalentLoop, Microsoft, Google"
                            onChange={(e) => setCompanyName(e.target.value)}
                        />
                    </div>

                    <div className="flex gap-4 pt-4">
                        <button 
                            onClick={() => navigate("/")} 
                            className="flex-1 py-4 border border-slate-100 rounded-2xl text-sm font-bold text-slate-400 hover:bg-slate-50 transition-all"
                        >
                            Cancel
                        </button>
                        <button 
                            onClick={registerNewCompany} 
                            className="flex-[2] py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-100 transition-all active:scale-95"
                        >
                            Create & Continue
                        </button>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CompanyCreate;