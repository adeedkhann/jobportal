import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSelector } from 'react-redux';
import UpdateProfileDialog from '@/components/ui/UpdateProfileDialog';
const StudentProfile = () => {
const [open, setOpen] = useState(false);
  const { user } = useSelector((store) => store.auth);
  const [profile, setProfile] = useState(user || {});

  useEffect(() => {
    // If user was updated in Redux, update local state
    if (user) setProfile(user);
  }, [user]);



  return (
    <div className="bg-[#f8faff] min-h-screen py-10 px-4 md:px-8">
      <div className="max-w-6xl mx-auto space-y-8">
        
        {/* --- HEADER SECTION --- */}
        <div className="bg-white rounded-3xl border border-gray-100 shadow-sm overflow-hidden relative">
          <div className="h-32 md:h-48 bg-gradient-to-r from-slate-800 to-slate-900" />
          
          <div className="p-6 md:p-10 -mt-12 md:-mt-16 flex flex-col md:flex-row justify-between items-start md:items-end gap-6 relative z-10">
            <div className="flex flex-col md:flex-row items-start md:items-end gap-6">
              <div className="relative">
                <img 
                    src={profile.avatar} 
                    alt={profile.fullname} 
                    className="w-24 h-24 md:w-32 md:h-32 rounded-3xl border-4 border-white shadow-xl object-cover"
                />
                <div className="absolute -bottom-1 -right-1 bg-blue-600 rounded-full p-2 border-4 border-white text-white">
                  <svg className="w-4 h-4 md:w-5 md:h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7"></path></svg>
                </div>
              </div>
              <div className="md:mb-2">
                <h1 className="text-2xl md:text-4xl font-extrabold text-slate-900 leading-tight">{profile.fullname}</h1>
                <p className="text-sm md:text-base text-blue-600 font-semibold mt-1">{profile.email}</p>
              </div>
            </div>
            <div className="flex gap-2 w-full md:w-auto">
              <button onClick={() => setOpen(true)} className="flex-1 md:flex-none px-6 py-2.5 bg-gray-100 hover:bg-gray-200 text-slate-700 font-bold rounded-xl transition-colors text-sm">
                 Edit Profile
              </button>
              <button className="p-2.5 bg-gray-100 rounded-xl text-slate-500 hover:text-slate-900">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M8.684 13.342C8.886 12.938 9 12.482 9 12c0-.482-.114-.938-.316-1.342m0 2.684a3 3 0 110-2.684m0 2.684l6.632 3.316m-6.632-6l6.632-3.316m0 0a3 3 0 105.367-2.684 3 3 0 00-5.367 2.684zm0 9.316a3 3 0 105.368 2.684 3 3 0 00-5.368-2.684z"></path></svg>
              </button>
            </div>
          </div>
        </div>

        {/* --- ABOUT SECTION --- */}
        <div className="bg-white rounded-3xl p-6 md:p-10 border border-gray-100 shadow-sm">
           <h2 className="text-xl font-bold text-slate-900 mb-4">About me</h2>
           <p className="text-gray-500 text-sm md:text-base leading-relaxed">
              {profile?.profile?.bio}
           </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          <div className="bg-blue-50 rounded-3xl p-6 md:p-8 border border-blue-100 flex flex-col justify-between">
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900">Resume / CV</h2>
                <button className="text-blue-600 hover:text-blue-800">
                  <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
                </button>
              </div>

              <div className="bg-white p-4 rounded-2xl flex items-center gap-4 mb-6 shadow-sm border border-blue-100">
                <div className="w-12 h-12 bg-red-50 rounded-xl flex items-center justify-center text-red-500 font-bold text-xs">PDF</div>
                <div className="flex-grow overflow-hidden">
                   <p className="text-sm font-bold text-slate-900 truncate">{profile.resumeName}</p>
                   <p className="text-[10px] text-gray-400 font-medium uppercase mt-0.5">{profile.uploadDate}</p>
                </div>
              </div>
            </div>

            <button className="w-full py-4 bg-blue-600 hover:bg-blue-700 text-white font-bold rounded-2xl flex items-center justify-center gap-2 transition-all shadow-lg shadow-blue-200">
               <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 16v1a2 2 0 002 2h12a2 2 0 002-2v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path></svg>
               Update Resume
            </button>
          </div>

          {/* Skills Section */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm">
             <div className="flex justify-between items-center mb-6">
                <h2 className="text-xl font-bold text-slate-900">Core skills</h2>
                <button className="w-8 h-8 bg-gray-50 rounded-lg flex items-center justify-center text-gray-400 hover:text-blue-600">
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
                </button>
             </div>
             <div className="flex flex-wrap gap-2">
               {profile?.profile?.skills?.map(skill => (
                <span key={skill} className="px-4 py-2 bg-slate-50 border border-slate-100 rounded-xl text-xs font-bold text-slate-600 hover:bg-blue-50 hover:text-blue-600 hover:border-blue-100 transition-colors cursor-default">
                    {skill}
                </span>
               ))}
             </div>
          </div>

        </div>
               <UpdateProfileDialog open={open} setOpen={setOpen}/>
      </div>
    </div>
  );
};

export default StudentProfile;