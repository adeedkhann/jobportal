import React, { useEffect, useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useLocation } from 'react-router-dom';
import axios from 'axios';
import { setUser } from '@/store/authSlice';
import { toast } from 'sonner';
import { 
  Loader2, Send, Calendar, Bookmark, MapPin, Mail, 
  Link as LinkIcon, LayoutDashboard, Briefcase, MessageSquare, Settings, LogOut 
} from "lucide-react";
import { useRef } from 'react';
const StudentDashboard = () => {
  const { user } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const fileInputRef = useRef(null);
  
  const [uploading, setUploading] = useState(false);
  const [appliedJobs, setAppliedJobs] = useState([]);
  const [fetchingJobs, setFetchingJobs] = useState(true);

  // 1. Sidebar Navigation Items
  const navItems = [
    { icon: <LayoutDashboard size={18}/>, label: 'Dashboard', path: '/studentdashboard' },
    { icon: <Briefcase size={18}/>, label: 'Browse Jobs', path: '/jobs' },
    { icon: <Send size={18}/>, label: 'Applications', path: '/studentdashboard' }, // Isi page par anchor link de sakte ho
    { icon: <MessageSquare size={18}/>, label: 'Messages', path: '#' },
    { icon: <Settings size={18}/>, label: 'Settings', path: '/seekerprofile' },
  ];

  // 2. Fetch Applied Jobs on Mount
  useEffect(() => {
    const fetchAppliedJobs = async () => {
      try {
        setFetchingJobs(true);
        const res = await axios.get("https://jobportal-1-nhtb.onrender.com/api/v1/application/get", {
          withCredentials: true
        });
        if (res.data.success) {
          setAppliedJobs(res.data.data);
        }
      } catch (error) {
        console.log("Error fetching applied jobs", error);
      } finally {
        setFetchingJobs(false);
      }
    };
    fetchAppliedJobs();
  }, []);

  // 3. Stats Calculation (Dynamic)
  const stats = [
    { label: "Applications sent", value: appliedJobs.length, trend: "+2", icon: <Send size={20}/>, color: "bg-blue-50 text-blue-600" },
    { label: "Pending Reviews", value: appliedJobs.filter(app => app.status === 'pending').length, tag: "Wait", icon: <Calendar size={20}/>, color: "bg-cyan-50 text-cyan-600" },
    { label: "Shortlisted", value: appliedJobs.filter(app => app.status === 'Accepted').length, icon: <Bookmark size={20}/>, color: "bg-emerald-50 text-emerald-600" },
  ];

  const resumeHandler = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const formData = new FormData();
    formData.append("file", file);
    try {
      setUploading(true);
      const res = await axios.post("https://jobportal-1-nhtb.onrender.com/api/v1/user/profile/update", formData, {
        headers: { 'Content-Type': 'multipart/form-data' },
        withCredentials: true
      });
      if (res.data.success) {
        dispatch(setUser(res.data.data));
        toast.success("Resume updated successfully!");
      }
    } catch (error) {
      toast.error("Upload failed");
    } finally {
      setUploading(false);
    }
  };

  return (
    <div className="bg-[#f4f7fe] min-h-screen flex">
      
      {/* --- SIDEBAR WORKING --- */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-gray-100 flex-col p-6 sticky top-0 h-screen">
        <h2 onClick={() => navigate('/')} className="text-2xl font-black text-blue-700 mb-10 tracking-tighter italic cursor-pointer">TalentLoop.</h2>
        
        <nav className="flex-grow space-y-1">
          {navItems.map((item, i) => (
            <button 
              key={i} 
              onClick={() => item.path !== '#' && navigate(item.path)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
                location.pathname === item.path && i === 0 ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-400 hover:bg-gray-50 hover:text-slate-900'
              }`}
            >
              {item.icon} {item.label}
            </button>
          ))}
        </nav>

        <div className="mt-auto pt-6 border-t border-gray-50">
            <button className="w-full flex items-center gap-3 px-4 py-3 text-red-400 font-bold text-sm hover:bg-red-50 rounded-xl transition-all">
                <LogOut size={18}/> Logout
            </button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8 lg:px-12">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-black text-slate-900 italic">
              Hello, <span className="text-blue-600 not-italic">{user?.fullname?.split(" ")[0]}!</span>
            </h1>
            <p className="text-gray-400 text-sm mt-1 font-medium">You have <span className='text-slate-900 font-bold'>{appliedJobs.length}</span> active applications this month.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button onClick={() => navigate('/jobs')} className="flex-1 md:flex-none px-6 py-3 bg-white border border-gray-100 rounded-2xl text-xs font-bold text-slate-500 uppercase tracking-widest hover:shadow-sm transition-all">Browse Jobs</button>
            <input type="file" ref={fileInputRef} className="hidden" accept=".pdf" onChange={resumeHandler} />
            <button 
              onClick={() => fileInputRef.current.click()}
              disabled={uploading}
              className="flex-1 md:flex-none px-6 py-3 bg-slate-900 text-white rounded-2xl text-xs font-bold uppercase tracking-widest shadow-xl shadow-slate-200 flex items-center justify-center gap-2 transition-all hover:bg-slate-800"
            >
              {uploading ? <Loader2 size={16} className="animate-spin" /> : "Update Resume"}
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          <div className="lg:col-span-2 space-y-8">
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-[2rem] border border-gray-100 shadow-sm">
                  <div className="flex justify-between items-start mb-4">
                    <div className={`p-3 rounded-2xl ${s.color}`}>{s.icon}</div>
                    {s.trend && <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-1 rounded-lg">{s.trend}</span>}
                  </div>
                  <p className="text-3xl font-black text-slate-900 leading-none">{s.value}</p>
                  <p className="text-[10px] font-bold text-gray-400 uppercase mt-2 tracking-widest">{s.label}</p>
                </div>
              ))}
            </div>

            {/* --- RECENT APPLICATIONS DYNAMIC --- */}
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm">
              <div className='flex justify-between items-center mb-8'>
                <h3 className="font-bold text-slate-900">Recent Applications</h3>
                <button onClick={() => navigate('/seekerprofile')} className='text-xs font-bold text-blue-600 hover:underline'>History</button>
              </div>
              
              <div className="space-y-4">
                {fetchingJobs ? (
                  <div className='flex justify-center py-10'><Loader2 className='animate-spin text-blue-600'/></div>
                ) : appliedJobs.length > 0 ? (
                  appliedJobs.slice(0, 3).map((app, i) => (
                    <div key={i} className='flex items-center justify-between p-5 bg-slate-50 rounded-[1.5rem] border border-slate-100'>
                        <div className='flex items-center gap-4'>
                            <div className='w-12 h-12 bg-white rounded-xl flex items-center justify-center border border-slate-100'>
                                <img src={app.job?.company?.logo} className='w-8 h-8 object-contain' alt="" />
                            </div>
                            <div>
                                <h4 className='font-bold text-sm text-slate-900'>{app.job?.title}</h4>
                                <p className='text-[10px] text-gray-400 font-bold uppercase tracking-tight'>{app.job?.company?.name} • {app.job?.location}</p>
                            </div>
                        </div>
                        <span className={`px-3 py-1 rounded-full text-[9px] font-bold uppercase ${app.status === 'Accepted' ? 'bg-emerald-100 text-emerald-600' : 'bg-blue-100 text-blue-600'}`}>
                            {app.status}
                        </span>
                    </div>
                  ))
                ) : (
                  <div className='text-center py-10'>
                     <p className="text-gray-400 text-sm italic">You haven't applied to any jobs yet.</p>
                     <button onClick={() => navigate('/jobs')} className='mt-4 text-blue-600 font-bold text-xs'>Find Jobs →</button>
                  </div>
                )}
              </div>
            </div>
          </div>

          {/* Right Column Profile Card */}
          <div className="space-y-8">
            <div className="bg-white rounded-[2.5rem] p-8 border border-gray-100 shadow-sm text-center">
              <div className='relative w-28 h-28 mx-auto mb-6'>
                <img 
                  src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} 
                  className="w-full h-full rounded-[2rem] border-4 border-white shadow-xl object-cover" 
                  alt="Profile" 
                />
                <div className='absolute -bottom-2 -right-2 bg-emerald-500 w-8 h-8 rounded-xl border-4 border-white flex items-center justify-center text-white'>
                    <CheckCircle size={16}/>
                </div>
              </div>
              
              <h3 className="text-xl font-black text-slate-900">{user?.fullname}</h3>
              <p className="text-blue-600 text-[10px] font-black uppercase mt-1 tracking-widest">{user?.role}</p>
              
              <div className="mt-8 space-y-4 text-left bg-slate-50 p-6 rounded-2xl border border-slate-100">
                <div className="flex items-center gap-3 text-xs font-bold text-slate-500 uppercase tracking-tighter"><MapPin size={14} className="text-blue-500"/> {user?.profile?.location || "Not Set"}</div>
                <div className="flex items-center gap-3 text-xs font-bold text-slate-500 uppercase tracking-tighter"><Mail size={14} className="text-blue-500"/> {user?.email}</div>
              </div>
              
              <button onClick={() => navigate('/seekerprofile')} className="w-full mt-6 py-4 bg-white border border-slate-100 rounded-2xl text-xs font-bold text-slate-900 shadow-sm hover:bg-slate-50 transition-all">
                Edit Profile Settings
              </button>
            </div>

            {/* Profile Progress */}
            <div className="bg-slate-900 rounded-[2.5rem] p-8 text-white shadow-2xl shadow-blue-100">
               <h4 className="font-bold text-sm mb-2 opacity-80 uppercase tracking-widest">Profile Strength</h4>
               <div className='flex items-end gap-2 mt-4'>
                    <span className='text-4xl font-black'>85%</span>
                    <span className='text-[10px] font-bold text-emerald-400 mb-2'>Excellent</span>
               </div>
               <div className="w-full bg-white/10 h-1.5 rounded-full mt-4 overflow-hidden">
                 <div className="bg-blue-500 h-full w-[85%]" />
               </div>
               <p className="text-[10px] text-white/40 mt-6 leading-relaxed font-medium">
                 Your profile visibility is high. Keep your skills updated to get better matches.
               </p>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

// Helper for check icon
const CheckCircle = ({size}) => (
    <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round"><path d="M20 6L9 17l-5-5"/></svg>
);

export default StudentDashboard;