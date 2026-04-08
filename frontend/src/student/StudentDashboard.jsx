import React from 'react';

const StudentDashboard = () => {
  const stats = [
    { label: "Applications sent", value: "24", trend: "+12%", icon: "📤", color: "bg-blue-50 text-blue-600" },
    { label: "Interviews", value: "5", tag: "New", icon: "🗓️", color: "bg-cyan-50 text-cyan-600" },
    { label: "Saved jobs", value: "18", icon: "🔖", color: "bg-emerald-50 text-emerald-600" },
  ];

  const applications = [
    { company: "Google", role: "Senior Product Designer", status: "INTERVIEW", date: "2 days ago", logo: "G" },
    { company: "Figma", role: "Systems Designer", status: "REVIEWED", date: "5 days ago", logo: "F" },
    { company: "Netflix", role: "UI Engineer", status: "APPLIED", date: "1 week ago", logo: "N" },
  ];

  return (
    <div className="bg-[#f4f7fe] min-h-screen flex">
      
      {/* Sidebar - Hidden on mobile (320px) */}
      <aside className="hidden lg:flex w-64 bg-white border-r border-gray-100 flex-col p-6 sticky top-0 h-screen">
        <h2 className="text-xl font-bold text-slate-900 mb-10">The Curated Career</h2>
        <nav className="flex-grow space-y-2">
          {['Dashboard', 'Applications', 'Saved Jobs', 'Messages', 'Settings'].map((item, i) => (
            <button key={i} className={`w-full text-left px-4 py-3 rounded-xl font-bold text-sm transition-all ${i === 0 ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-400 hover:bg-gray-50 hover:text-slate-900'}`}>
              {item}
            </button>
          ))}
        </nav>
        <div className="bg-blue-600 rounded-2xl p-4 text-center">
           <p className="text-white text-xs font-bold mb-3">Upgrade to Pro</p>
           <button className="w-full py-2 bg-white text-blue-600 rounded-lg text-[10px] font-bold uppercase tracking-wider">Unlock Premium</button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-grow p-4 md:p-8 lg:p-12">
        
        {/* Top Header */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10 gap-4">
          <div>
            <h1 className="text-3xl font-extrabold text-slate-900">Welcome back, <span className="text-blue-600">Alex</span></h1>
            <p className="text-gray-400 text-sm mt-1">You have 2 new interview requests this week.</p>
          </div>
          <div className="flex gap-3 w-full md:w-auto">
            <button className="flex-1 md:flex-none px-6 py-2.5 bg-white border border-gray-200 rounded-xl text-sm font-bold text-slate-700">Browse Jobs</button>
            <button className="flex-1 md:flex-none px-6 py-2.5 bg-blue-600 text-white rounded-xl text-sm font-bold shadow-lg shadow-blue-100">Update Resume</button>
          </div>
        </div>

        {/* Dashboard Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          
          {/* Left Column (Stats & Apps) */}
          <div className="lg:col-span-2 space-y-8">
            
            {/* Stats Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
              {stats.map((s, i) => (
                <div key={i} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm relative overflow-hidden">
                  <div className="flex justify-between items-start mb-4">
                    <span className="text-2xl">{s.icon}</span>
                    {s.trend && <span className="text-[10px] font-bold text-emerald-500 bg-emerald-50 px-2 py-0.5 rounded-full">{s.trend}</span>}
                    {s.tag && <span className="text-[10px] font-bold text-blue-500 bg-blue-50 px-2 py-0.5 rounded-full">{s.tag}</span>}
                  </div>
                  <p className="text-2xl font-black text-slate-900">{s.value}</p>
                  <p className="text-xs font-bold text-gray-400 uppercase tracking-tight">{s.label}</p>
                </div>
              ))}
            </div>

            {/* Recent Applications Table */}
            <div className="bg-white rounded-[2rem] p-6 md:p-8 border border-gray-100 shadow-sm">
              <div className="flex justify-between items-center mb-6">
                <h3 className="font-bold text-slate-900">Recent Applications</h3>
                <button className="text-blue-600 text-xs font-bold">View All</button>
              </div>
              <div className="overflow-x-auto">
                <table className="w-full text-left">
                  <thead>
                    <tr className="text-[10px] font-bold text-gray-400 uppercase tracking-widest border-b border-gray-50">
                      <th className="pb-4">Company</th>
                      <th className="pb-4">Role</th>
                      <th className="pb-4">Status</th>
                      <th className="pb-4 text-right">Applied</th>
                    </tr>
                  </thead>
                  <tbody className="text-sm">
                    {applications.map((app, i) => (
                      <tr key={i} className="group border-b border-gray-50 last:border-0">
                        <td className="py-4 flex items-center gap-3">
                          <div className="w-8 h-8 rounded-lg bg-gray-50 flex items-center justify-center font-bold text-gray-400 text-xs">{app.logo}</div>
                          <span className="font-bold text-slate-900">{app.company}</span>
                        </td>
                        <td className="py-4 text-gray-500">{app.role}</td>
                        <td className="py-4">
                          <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${app.status === 'INTERVIEW' ? 'bg-cyan-50 text-cyan-600' : app.status === 'REVIEWED' ? 'bg-gray-50 text-gray-500' : 'bg-blue-50 text-blue-600'}`}>
                            {app.status}
                          </span>
                        </td>
                        <td className="py-4 text-right text-gray-400 text-xs whitespace-nowrap">{app.date}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Saved for Later Section */}
            <div>
              <div className="flex justify-between items-center mb-6 px-2">
                 <h3 className="font-bold text-slate-900 text-lg">Saved for Later</h3>
                 <span className="text-gray-400 text-xs font-medium">18 total items</span>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {[1, 2].map(i => (
                  <div key={i} className="bg-white p-5 rounded-3xl border border-gray-100 shadow-sm flex items-center gap-4">
                    <div className="w-12 h-12 bg-orange-100 rounded-2xl flex-shrink-0" />
                    <div className="flex-grow">
                      <p className="font-bold text-slate-900 text-sm">Staff Product Designer</p>
                      <p className="text-gray-400 text-xs">Stripe • Remote</p>
                    </div>
                    <button className="text-blue-600">🔖</button>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Right Column (Profile & Progress) */}
          <div className="space-y-8">
            {/* Mini Profile Card */}
            <div className="bg-white rounded-[2rem] p-8 border border-gray-100 shadow-sm text-center">
              <img src="https://via.placeholder.com/100" className="w-24 h-24 rounded-3xl mx-auto mb-4 border-4 border-gray-50 shadow-lg" alt="Profile" />
              <h3 className="text-xl font-bold text-slate-900">Alex Rivera</h3>
              <p className="text-gray-400 text-xs font-bold uppercase mt-1">Product Designer • 6 yrs exp</p>
              
              <div className="mt-8 space-y-3 text-left">
                <div className="flex items-center gap-3 text-xs text-gray-500">📍 New York, NY</div>
                <div className="flex items-center gap-3 text-xs text-gray-500">📧 alex.design@email.com</div>
                <div className="flex items-center gap-3 text-xs text-blue-600 font-bold truncate">🔗 portfolio.com/arivera</div>
              </div>
              
              <button className="w-full mt-8 py-3 border border-gray-200 rounded-xl text-sm font-bold text-slate-700 hover:bg-gray-50 transition-colors">
                Edit Profile
              </button>
            </div>

            {/* Profile Strength Card */}
            <div className="bg-blue-50 rounded-[2rem] p-8 border border-blue-100">
               <h4 className="font-bold text-slate-900 mb-2">Profile Strength</h4>
               <div className="w-full bg-blue-100 h-2 rounded-full mt-4 overflow-hidden">
                 <div className="bg-blue-600 h-full w-[85%]" />
               </div>
               <p className="text-[11px] text-blue-800/70 mt-4 leading-relaxed font-medium">
                 85% Complete. Add your certifications to reach 100%.
               </p>
               <button className="mt-6 text-blue-700 text-xs font-bold flex items-center gap-2">
                 Complete now →
               </button>
            </div>
          </div>

        </div>
      </main>
    </div>
  );
};

export default StudentDashboard;