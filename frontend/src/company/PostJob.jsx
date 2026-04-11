import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'sonner';
import { Loader2, AlertCircle, Send } from 'lucide-react';

const PostJob = () => {
  const navigate = useNavigate();
  const [checking, setChecking] = useState(true);
  const [loading, setLoading] = useState(false);
 
  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "", // Isse backend mein split(",") karenge
    sallery: "",
    location: "",
    jobType: "Full-time",
    position: 1,
    experience: "",
    companyId: "" // CheckCompany se set hoga
  });

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  // 2. Company Verification & setting companyId
  useEffect(() => {
    const checkCompany = async () => {
      try {
        const res = await axios.get("https://jobportal-1-nhtb.onrender.com/api/v1/company/get", {
          withCredentials: true
        });
        if (res.data.success && res.data.data.length > 0) {
          setInput(prev => ({ ...prev, companyId: res.data.data[0]._id }));
        } else {
          toast.error("Please register your company first.");
          navigate("/registercompany");
        }
      } catch (error) {
        navigate("/auth");
      } finally {
        setChecking(false);
      }
    };
    checkCompany();
  }, [navigate]);

  // 3. Submit Handler
  const submitHandler = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const res = await axios.post("https://jobportal-1-nhtb.onrender.com/api/v1/job/post", input, {
        headers: { 'Content-Type': 'application/json' },
        withCredentials: true
      });
      if (res.data.success) {
        toast.success(res.data.message);
        navigate("/recruiterdashboard");
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Internal server error");
    } finally {
      setLoading(false);
    }
  };

  if (checking) return <div className="h-screen flex items-center justify-center"><Loader2 className="animate-spin" /></div>

  return (
    <div className="bg-[#f8faff] min-h-screen py-10 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        <div className="mb-10 flex justify-between items-start">
          <div>
            <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900 italic">Post a <span className="text-blue-600 not-italic">New Job</span></h1>
            <p className="text-gray-500 mt-2 text-sm">Fill in the details to find your next great hire.</p>
          </div>
        </div>

        <form onSubmit={submitHandler} className="flex flex-col lg:flex-row gap-8">
          {/* Form Fields */}
          <div className="flex-grow bg-white rounded-[2.5rem] p-6 md:p-10 border border-gray-100 shadow-sm space-y-6">
            
            {/* Row 1: Title */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Professional Job Title</label>
              <input 
                type="text" name="title" value={input.title} onChange={changeEventHandler} required
                placeholder="e.g. Senior Frontend Developer" 
                className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Row 2: Type, Experience, Position */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Job Type</label>
                <select name="jobType" value={input.jobType} onChange={changeEventHandler} className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm">
                  <option value="Full-time">Full-time</option>
                  <option value="Part-time">Part-time</option>
                  <option value="Contract">Contract</option>
                  <option value="Remote">Remote</option>
                </select>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Exp (in years)</label>
                <input type="number" name="experience" value={input.experience} onChange={changeEventHandler} required className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm"/>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">No. of Positions</label>
                <input type="number" name="position" value={input.position} onChange={changeEventHandler} required className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm"/>
              </div>
            </div>

            {/* Row 3: Salary & Location */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Salary (LPA)</label>
                <input type="number" name="sallery" value={input.sallery} onChange={changeEventHandler} required placeholder="e.g. 12" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm"/>
              </div>
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Location</label>
                <input type="text" name="location" value={input.location} onChange={changeEventHandler} required placeholder="e.g. Bangalore, India" className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm"/>
              </div>
            </div>

            {/* Row 4: Requirements */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Requirements (Comma Separated)</label>
              <input 
                type="text" name="requirements" value={input.requirements} onChange={changeEventHandler} required
                placeholder="React, Node.js, MongoDB, Tailwind..." 
                className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-blue-500"
              />
            </div>

            {/* Row 5: Description */}
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Description</label>
              <textarea 
                name="description" value={input.description} onChange={changeEventHandler} required
                rows="6" placeholder="Describe the role and responsibilities..."
                className="w-full p-6 text-sm bg-gray-50 border-none rounded-[2rem] focus:ring-2 focus:ring-blue-500"
              ></textarea>
            </div>

            <div className="pt-6 flex gap-4">
               <button 
                 type="button" onClick={() => navigate(-1)}
                 className="flex-1 py-4 border border-gray-100 rounded-2xl text-sm font-bold text-slate-400 hover:bg-gray-50 transition-all"
               >
                 Cancel
               </button>
               <button 
                 type="submit" disabled={loading}
                 className="flex-[2] py-4 bg-blue-600 hover:bg-blue-700 text-white rounded-2xl text-sm font-bold shadow-lg shadow-blue-100 flex items-center justify-center gap-2 transition-all"
               >
                 {loading ? <Loader2 className="animate-spin" /> : <><Send size={18}/> Publish Job</>}
               </button>
            </div>
          </div>

          {/* Right Info Sidebar */}
          <div className="w-full lg:w-1/3 space-y-6">
             <div className="bg-slate-900 rounded-[2rem] p-8 text-white">
                <h4 className="font-bold text-lg mb-4">Job Preview Card</h4>
                <div className="bg-white/10 p-5 rounded-2xl border border-white/10">
                   <p className="text-blue-400 text-[10px] font-bold uppercase tracking-widest">Preview</p>
                   <h5 className="text-lg font-bold mt-1">{input.title || "Job Title"}</h5>
                   <p className="text-sm opacity-60 mt-1">{input.location || "Location"}</p>
                   <div className="mt-4 flex gap-2">
                      <span className="px-3 py-1 bg-blue-600 text-[9px] font-bold rounded-full">{input.jobType}</span>
                      <span className="px-3 py-1 bg-white/10 text-[9px] font-bold rounded-full">{input.experience} Yrs</span>
                   </div>
                </div>
             </div>
             
             <div className="bg-blue-50 rounded-[2rem] p-8 border border-blue-100">
                <div className="flex items-center gap-2 text-blue-700 mb-4">
                  <AlertCircle size={20}/>
                  <h4 className="font-bold">Important Notice</h4>
                </div>
                <p className="text-xs text-blue-800/70 leading-relaxed">
                   Once published, this job will be visible to all active candidates. Make sure the salary and requirements are accurate.
                </p>
             </div>
          </div>
        </form>
      </div>
    </div>
  );
};

export default PostJob;