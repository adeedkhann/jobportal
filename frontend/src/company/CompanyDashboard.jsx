import React, { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import { 
  LayoutDashboard, Briefcase, Bookmark, MessageSquare, 
  Settings, TrendingUp, Users, Calendar, 
  MoreHorizontal, Globe, MapPin, Loader2 ,Plus
} from 'lucide-react';
import { BarChart, Bar, ResponsiveContainer, Cell } from 'recharts';

const CompanyDashboard = () => {
  const { user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const [adminJobs, setAdminJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [company, setCompany] = useState(null);

  // 1. Fetch Admin Jobs & Company Info
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        // Fetch Jobs created by this admin
        const jobsRes = await axios.get("https://jobportal-1-nhtb.onrender.com/api/v1/job/getadminjobs", {
          withCredentials: true
        });
        
        // Fetch Company details
        const companyRes = await axios.get("https://jobportal-1-nhtb.onrender.com/api/v1/company/get", {
          withCredentials: true
        });

        if (jobsRes.data.success) setAdminJobs(jobsRes.data.data);
        if (companyRes.data.success) setCompany(companyRes.data.data[0]);
        
      } catch (error) {
        console.error("Dashboard error:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchDashboardData();
  }, []);

  // Total Applicants calculate karna
  const totalApplicants = adminJobs.reduce((acc, job) => acc + (job.applications?.length || 0), 0);

  const stats = [
    { label: "Total Openings", value: adminJobs.length, detail: "Live", color: "text-blue-500" },
    { label: "Total Applicants", value: totalApplicants, detail: "Across all jobs", color: "text-emerald-500" },
    { label: "New Interviews", value: "0", detail: "Upcoming", color: "text-orange-500" },
    { label: "Closing Soon", value: "2", detail: "Next 48h", color: "text-indigo-500" },
  ];
  const sidebarItems = [
    { icon: <LayoutDashboard size={18}/>, label: 'Dashboard', path: '/recruiterdashboard' },
    { icon: <Briefcase size={18}/>, label: 'My Jobs', path: '/recruiterdashboard' }, 
    { icon: <Users size={18}/>, label: 'Applicants', path: '#' }, // Ispe click karne par table highlight kar sakte hain
    { icon: <Plus size={18}/>, label: 'Post Job', path: '/postjob' },
    { icon: <Settings size={18}/>, label: 'Settings', path: '#' },
];

  if (loading) return <div className='h-screen flex items-center justify-center'><Loader2 className='animate-spin text-blue-600' /></div>

  return (
    <div className="bg-[#f4f7fe] min-h-screen flex">
      
      {/* Sidebar (Same as before) */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-gray-100 flex-col p-6 sticky top-0 h-screen">
        <div className="flex items-center gap-3 mb-10 cursor-pointer" onClick={() => navigate('/recruiterprofile')}>
          <img src={user?.profile?.profilePhoto || "https://github.com/shadcn.png"} className="w-8 h-8 rounded-lg object-cover" alt="" />
          <div>
            <p className="text-xs font-bold text-slate-900 leading-none">{user?.fullname}</p>
            <p className="text-[10px] text-gray-400 font-medium mt-1 capitalize">{user?.role}</p>
          </div>
        </div>
        <nav className="flex-grow space-y-1">
    {sidebarItems.map((item, i) => (
      <button 
        key={i} 
        onClick={() => item.path !== '#' && navigate(item.path)}
        className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl font-bold text-sm transition-all ${
          window.location.pathname === item.path ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-400 hover:bg-gray-50 hover:text-slate-900'
        }`}
      >
        {item.icon} {item.label}
      </button>
    ))}
  </nav>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8 lg:p-10">
        <div className="flex justify-between items-center mb-8">
          <div>
            <h1 className="text-3xl font-black text-slate-900 italic">Company <span className="font-normal not-italic text-blue-600">Dashboard</span></h1>
            <p className="text-gray-400 text-sm mt-1 font-medium">Monitoring performance for {company?.name || "Your Company"}.</p>
          </div>
          <button onClick={() => navigate('/postjob')} className="bg-blue-600 text-white px-5 py-2.5 rounded-xl text-xs font-bold uppercase tracking-wider flex items-center gap-2 hover:bg-blue-700 transition-all">
            <Plus size={16}/> Post New Job
          </button>
        </div>

        {/* Charts Section */}
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-6 mb-8">
          <div className="lg:col-span-3 bg-white p-8 rounded-[2rem] border border-gray-100 shadow-sm">
            <div className="flex justify-between items-center mb-6">
              <h3 className="font-bold text-slate-900">Application Flow</h3>
              <div className="flex gap-4 text-[10px] font-bold uppercase">
                <span className="flex items-center gap-1.5"><div className="w-2 h-2 rounded-full bg-blue-600"/> Responses</span>
              </div>
            </div>
            <div className="h-48 w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={adminJobs.slice(0, 8)}>
                  <Bar dataKey="applications.length" radius={[4, 4, 0, 0]} fill="#2563eb" />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>

          <div className="bg-slate-900 rounded-[2rem] p-8 text-white flex flex-col justify-between shadow-xl">
             <TrendingUp size={24} className="text-blue-500" />
             <div>
               <p className="text-xs font-bold opacity-70 uppercase tracking-widest">Global Reach</p>
               <h2 className="text-4xl font-black mt-2">Active</h2>
             </div>
             <button onClick={() => navigate('/jobs')} className="w-full py-2 bg-white/10 hover:bg-white/20 rounded-lg text-[10px] font-bold uppercase">View Live Listings</button>
          </div>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((s, i) => (
            <div key={i} className="bg-white p-5 rounded-2xl border border-gray-100 shadow-sm">
              <p className="text-[10px] font-bold text-gray-400 uppercase tracking-widest mb-1">{s.label}</p>
              <div className="flex items-end justify-between">
                <h4 className="text-2xl font-black text-slate-900">{s.value}</h4>
                <span className={`text-[10px] font-bold px-2 py-0.5 rounded-full bg-slate-50 ${s.color}`}>{s.detail}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Dynamic Jobs Table */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2 bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
             <h3 className="font-bold text-slate-900 mb-8">Your Active Listings</h3>
             <div className="overflow-x-auto">
                <table className="w-full text-left">
                   <thead>
                      <tr className="text-[10px] font-bold text-gray-300 uppercase tracking-widest border-b border-slate-50">
                        <th className="pb-4">Job Title</th>
                        <th className="pb-4">Applications</th>
                        <th className="pb-4">Date</th>
                        <th className="pb-4 text-right">Action</th>
                      </tr>
                   </thead>
                   <tbody>
                      {adminJobs.map((job) => (
                        <tr onClick={()=>(navigate(`admin/jobs/${job._id}/applicants`))} key={job._id} className="border-b border-slate-50 last:border-0 hover:bg-slate-50/50 transition-colors">
                          <td className="py-5">
                             <p className="text-sm font-bold text-slate-900">{job.title}</p>
                             <p className="text-[10px] text-gray-400 font-medium">{job.jobType} • {job.location}</p>
                          </td>
                          <td className="py-5">
                             <span className="bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] font-bold">
                               {job.applications?.length} Applicants
                             </span>
                          </td>
                          <td className="py-5 text-xs text-gray-400">{new Date(job.createdAt).toLocaleDateString()}</td>
                          <td className="py-5 text-right">
                             <button onClick={() => navigate(`/admin/jobs/${job._id}/applicants`)} className="text-slate-400 hover:text-blue-600 transition-colors">
                                <Users size={18}/>
                             </button>
                          </td>
                        </tr>
                      ))}
                   </tbody>
                </table>
             </div>
             
             {/* Dynamic Company Footer */}
             {company && (
               <div className="mt-10 p-6 bg-slate-50 rounded-2xl flex items-center justify-between border border-slate-100">
                  <div className="flex items-center gap-4">
                     <div className="w-16 h-16 bg-white rounded-2xl flex items-center justify-center shadow-sm overflow-hidden">
                        {company.logo ? <img src={company.logo} className='w-full h-full object-cover' /> : <span className='font-bold'>{company.name?.charAt(0)}</span>}
                     </div>
                     <div>
                        <div className="flex items-center gap-2">
                          <h4 className="font-bold text-slate-900">{company.name}</h4>
                          <button onClick={() => navigate(`/updatecompany/${company._id}`)} className="bg-white px-2 py-0.5 border border-gray-100 rounded text-[8px] font-bold text-blue-600 uppercase">Edit Profile</button>
                        </div>
                        <div className="flex gap-4 mt-2 text-[9px] font-bold text-gray-400 uppercase">
                           <span className="flex items-center gap-1"><Globe size={10}/> {company.website}</span>
                           <span className="flex items-center gap-1"><MapPin size={10}/> {company.location}</span>
                        </div>
                     </div>
                  </div>
               </div>
             )}
          </div>

          {/* This part can be mapped to Recent Applications from your App Model later */}
          <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm">
             <h3 className="font-bold text-slate-900 mb-8">Recent Activity</h3>
             <div className="text-center py-20 text-gray-400 text-xs italic">
                Integration with Application Model pending...
             </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default CompanyDashboard;