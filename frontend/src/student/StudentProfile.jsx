import React, { useEffect, useState, useRef } from 'react';
import axios from 'axios';
import { useDispatch, useSelector } from 'react-redux';
import UpdateProfileDialog from '@/components/ui/UpdateProfileDialog';
import { setUser } from '@/store/authSlice';
import { toast } from 'sonner';
import { Loader2 } from 'lucide-react'; // Added Loader2 icon

const StudentProfile = () => {
  const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [profile, setProfile] = useState(user || {});
  const [uploading, setUploading] = useState(false); // New state for loading
  const fileInputRef = useRef(null);
  const dispatch = useDispatch();

  useEffect(() => {
    if (user) setProfile(user);
  }, [user]);

  // --- Resume Upload Logic (Same to Same) ---
  const resumeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (file.type !== "application/pdf") {
      return toast.error("Please upload a PDF file only");
    }

    const formData = new FormData();
    formData.append("file", file);

    try {
      setUploading(true);
      toast.loading("Uploading resume...", { id: 'upload-toast' });
      const res = await axios.post("https://jobportal-1-nhtb.onrender.com/api/v1/user/profile/update/resume", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });

      if (res.data.success) {
        dispatch(setUser(res.data.data));
        toast.success("Resume updated successfully!", { id: 'upload-toast' });
      }
    } catch (error) {
      toast.error(error.response?.data?.message || "Upload failed", { id: 'upload-toast' });
    } finally {
      setUploading(false);
      toast.dismiss('upload-toast');
    }
  };

  return (
    <div className="bg-[#f8faff] min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* --- REFINED CLEAN HEADER SECTION --- */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden relative p-8">
          <div className="flex flex-col md:flex-row justify-between items-center md:items-end gap-6">
            <div className="flex flex-col md:flex-row items-center md:items-end gap-6 text-center md:text-left">
              <div className="relative">
                {/* Bigger & Circle Profile Pic */}
                <img 
                  src={profile?.profile?.profilePhoto || "https://github.com/shadcn.png"} 
                  alt={profile.fullname} 
                  className="w-32 h-32 md:w-40 md:h-40 rounded-full border-4 border-white shadow-2xl object-cover ring-4 ring-slate-100"
                />
              </div>
              <div className="md:mb-2">
                <h1 className="text-3xl md:text-5xl font-extrabold text-slate-900 leading-tight">{profile.fullname}</h1>
                <p className="text-sm md:text-base text-blue-600 font-semibold mt-1.5">{profile.email}</p>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button onClick={() => setOpen(true)} className="flex-1 md:flex-none px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-slate-700 font-bold rounded-xl transition-colors text-sm">
                Edit Profile
              </button>
            </div>
          </div>
        </div>

        {/* --- ABOUT SECTION (Same to Same) --- */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-sm">
           <h2 className="text-xl font-bold text-slate-900 mb-4">About me</h2>
           <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              {profile?.profile?.bio || "No bio added yet"} 
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Resume Section (Same to Same Layout) */}
          <div className="bg-blue-50 rounded-3xl p-6 md:p-8 border border-blue-100 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900">Resume / CV</h2>
              </div>

              <div className="bg-white p-4 rounded-2xl flex items-center gap-4 mb-6 shadow-sm border border-blue-100">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 font-bold text-xs">PDF</div>
                <div className="flex-grow overflow-hidden">
                   {profile?.profile?.resume ? (
                     <a href={profile.profile.resume} target='_blank' rel='noopener noreferrer' className="text-sm font-bold text-blue-600 truncate hover:underline">
                        {profile.profile.resumeOriginalName || "View Resume"}
                     </a>
                   ) : (
                     <p className="text-sm font-bold text-slate-400">Not uploaded</p>
                   )}
                </div>
              </div>
            </div>

            <input 
                type="file" 
                ref={fileInputRef} 
                className="hidden" 
                accept="application/pdf" 
                onChange={resumeHandler} 
            />

            <button 
              onClick={() => fileInputRef.current.click()}
              disabled={uploading}
              className="w-full py-4 bg-blue-600 hover:bg-blue-700 disabled:bg-blue-300 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200"
            >
               {uploading ? (
                 <Loader2 className="w-5 h-5 animate-spin" />
               ) : (
                 <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
               )}
               {uploading ? "Uploading..." : "Update Resume"}
            </button>
          </div>

          {/* Skills Section (Same to Same) */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
             <h2 className="text-xl font-bold text-slate-900 mb-6">Core skills</h2>
             <div className="flex flex-wrap gap-2">
               {profile?.profile?.skills?.length > 0 ? (
                 profile.profile.skills.map(skill => (
                   <span key={skill} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 transition-colors">
                     {skill}
                   </span>
                 ))
               ) : (
                 <p className="text-gray-400 text-sm">No skills added</p>
               )}
             </div>
          </div>
        </div>
        <UpdateProfileDialog open={open} setOpen={setOpen}/>
      </div>
    </div>
  );
};

export default StudentProfile;