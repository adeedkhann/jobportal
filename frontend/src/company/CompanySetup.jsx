import React, { useEffect, useState } from 'react';
import { useNavigate, useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { ArrowLeft, Loader2, Globe, MapPin, Info, Building2 } from 'lucide-react';

const CompanySetup = () => {
    const params = useParams(); // URL se ID nikalne ke liye
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);
    
    const [input, setInput] = useState({
        name: "",
        description: "",
        website: "",
        location: "",
        file: null
    });

    const changeEventHandler = (e) => {
        setInput({ ...input, [e.target.name]: e.target.value });
    };

    const fileEventHandler = (e) => {
        const file = e.target.files?.[0];
        setInput({ ...input, file });
    };

    const submitHandler = async (e) => {
        e.preventDefault();
        const formData = new FormData();
        formData.append("name", input.name);
        formData.append("description", input.description);
        formData.append("website", input.website);
        formData.append("location", input.location);
        if (input.file) {
            formData.append("file", input.file);
        }

        try {
            setLoading(true);
            const res = await axios.put(`https://jobportal-1-nhtb.onrender.com/api/v1/company/update/${params.id}`, formData, {
                headers: { 'Content-Type': 'multipart/form-data' },
                withCredentials: true
            });

            if (res.data.success) {
                toast.success(res.data.message);
                navigate("/"); // Update ke baad list page par wapas
            }
        } catch (error) {
            toast.error(error.response?.data?.message || "Error updating company");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-[#f8faff] min-h-screen p-8">
            <div className="max-w-4xl mx-auto bg-white rounded-[2rem] shadow-sm border border-slate-100 overflow-hidden">
                
                {/* Header */}
                <div className="p-8 border-b border-slate-50 flex items-center justify-between bg-slate-900 text-white">
                    <div className="flex items-center gap-4">
                        <button onClick={() => navigate(-1)} className="p-2 hover:bg-white/10 rounded-full transition-all">
                            <ArrowLeft size={20} />
                        </button>
                        <h1 className="text-xl font-bold italic">Company <span className="font-normal not-italic text-slate-400">Setup</span></h1>
                    </div>
                    <Building2 className="text-blue-500 opacity-50" size={30} />
                </div>

                <form onSubmit={submitHandler} className="p-10">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                        
                        {/* Company Name */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Company Name</label>
                            <input 
                                type="text" name="name" value={input.name} onChange={changeEventHandler}
                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-blue-500 transition-all font-bold text-slate-700"
                                placeholder="e.g. TalentLoop Tech"
                            />
                        </div>

                        {/* Location */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><MapPin size={14}/> Location</label>
                            <input 
                                type="text" name="location" value={input.location} onChange={changeEventHandler}
                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-blue-500 transition-all text-sm font-medium"
                                placeholder="Mumbai, India"
                            />
                        </div>

                        {/* Website */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Globe size={14}/> Website</label>
                            <input 
                                type="text" name="website" value={input.website} onChange={changeEventHandler}
                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-blue-500 transition-all text-sm font-medium text-blue-600"
                                placeholder="https://company.com"
                            />
                        </div>

                        {/* Logo Upload */}
                        <div className="space-y-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest">Company Logo</label>
                            <input 
                                type="file" accept="image/*" onChange={fileEventHandler}
                                className="w-full p-3 bg-white border border-dashed border-slate-200 rounded-2xl text-xs"
                            />
                        </div>

                        {/* Description */}
                        <div className="space-y-2 md:col-span-2">
                            <label className="text-xs font-bold text-slate-400 uppercase tracking-widest flex items-center gap-2"><Info size={14}/> Description</label>
                            <textarea 
                                name="description" value={input.description} onChange={changeEventHandler} rows="4"
                                className="w-full p-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-blue-500 transition-all text-sm"
                                placeholder="Tell us about your company mission..."
                            />
                        </div>
                    </div>

                    <div className="mt-12 flex gap-4">
                        <button 
                            type="button" onClick={() => navigate("/admin/companies")}
                            className="flex-1 py-4 border border-slate-100 rounded-2xl text-sm font-bold text-slate-400 hover:bg-slate-50 transition-all"
                        >
                            Cancel
                        </button>
                        <button 
                            type="submit" disabled={loading}
                            className="flex-[2] py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-100 flex items-center justify-center gap-2 transition-all disabled:bg-blue-300"
                        >
                            {loading ? <Loader2 className="animate-spin" /> : "Update Company Details"}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default CompanySetup;