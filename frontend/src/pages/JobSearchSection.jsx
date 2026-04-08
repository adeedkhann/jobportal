import React from 'react';

const JobSearchSection = () => {
  const jobs = [
    { title: "Senior Software Engineer", company: "Stripe", location: "San Francisco, CA", tags: ["Node.js", "PostgreSQL"], salary: "$185k - $240k" },
    { title: "Senior Content Strategist", company: "Airbnb", location: "Remote", tags: ["Storytelling", "Localization"], salary: "$140k - $190k" },
    { title: "Full-Stack Engineer", company: "Linear", location: "Remote, Europe", tags: ["TypeScript", "Rust"], salary: "$130k - $180k" },
    { title: "DevRel Manager", company: "Vercel", location: "San Francisco, CA", tags: ["Next.js", "Community"], salary: "$170k - $220k" },
  ];

  return (
    <section className="bg-[#f8faff] min-h-screen py-12 px-4 md:px-8">
      <div className="max-w-7xl mx-auto flex flex-col lg:flex-row gap-8">
        
        {/* Sidebar Filters - Hidden on very small screens or scrollable */}
        <div className="w-full lg:w-64 flex-shrink-0 space-y-8 bg-white p-6 rounded-2xl border border-gray-100 h-fit shadow-sm">
          <div className="flex justify-between items-center">
            <h3 className="font-bold text-slate-900">Filters</h3>
            <button className="text-blue-600 text-xs font-semibold uppercase tracking-wider">Clear All</button>
          </div>

          {/* Filter Groups */}
          <div className="space-y-6">
            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Job Title</label>
              <div className="relative">
                <input type="text" placeholder="Design, Engineering..." className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-10 text-sm focus:ring-2 focus:ring-blue-500" />
                <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" /></svg>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Location</label>
              <div className="relative">
                <input type="text" placeholder="Remote, New York..." className="w-full bg-gray-50 border-none rounded-xl py-2.5 pl-10 text-sm focus:ring-2 focus:ring-blue-500" />
                <svg className="w-4 h-4 text-gray-400 absolute left-3 top-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" /></svg>
              </div>
            </div>

            <div>
              <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Salary Range ($K)</label>
              <input type="range" className="w-full h-1.5 bg-blue-100 rounded-lg appearance-none cursor-pointer accent-blue-600" />
              <div className="flex justify-between text-[10px] font-bold text-gray-400 mt-2">
                <span>$40k</span>
                <span>$300k+</span>
              </div>
            </div>

            <div>
               <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Job Type</label>
               <div className="space-y-3">
                  {['Full-time', 'Remote', 'Contract'].map((type) => (
                    <label key={type} className="flex items-center gap-3 cursor-pointer group">
                      <input type="checkbox" className="w-4 h-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500" />
                      <span className="text-sm text-gray-600 group-hover:text-slate-900">{type}</span>
                    </label>
                  ))}
               </div>
            </div>
          </div>
        </div>

        {/* Main Content Area */}
        <div className="flex-grow">
          {/* Header */}
          <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
            <div>
              <h2 className="text-2xl md:text-3xl font-bold text-slate-900">Recommended <span className="text-blue-700">Opportunities</span></h2>
              <p className="text-gray-400 text-sm mt-1">Showing 1,240 curated openings matching your profile.</p>
            </div>
            <div className="flex bg-white rounded-xl p-1 border border-gray-100 shadow-sm">
              <button className="px-4 py-2 rounded-lg bg-blue-50 text-blue-700 text-xs font-bold flex items-center gap-2">
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path d="M5 3a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2V5a2 2 0 00-2-2H5zM5 11a2 2 0 00-2 2v2a2 2 0 002 2h2a2 2 0 002-2v-2a2 2 0 00-2-2H5zM11 5a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V5zM11 13a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /></svg>
                Grid
              </button>
              <button className="px-4 py-2 rounded-lg text-gray-400 text-xs font-bold flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" /></svg>
                List
              </button>
            </div>
          </div>

          {/* Featured Large Job Card */}
          <div className="bg-white rounded-3xl p-6 md:p-8 border border-gray-100 shadow-sm mb-6 relative overflow-hidden group">
            <div className="flex flex-col md:flex-row justify-between items-start gap-6">
              <div className="flex flex-col md:flex-row gap-6">
                <div className="w-16 h-16 bg-emerald-500 rounded-2xl flex items-center justify-center flex-shrink-0 shadow-lg shadow-emerald-100">
                  <div className="w-8 h-8 border-4 border-white rounded-full opacity-40" />
                </div>
                <div>
                  <div className="flex flex-wrap gap-2 mb-3">
                    <span className="px-3 py-1 bg-blue-50 text-blue-600 text-[10px] font-bold rounded-full uppercase tracking-tight">Remote Priority</span>
                    <span className="px-3 py-1 bg-indigo-50 text-indigo-600 text-[10px] font-bold rounded-full uppercase tracking-tight">Featured</span>
                  </div>
                  <h3 className="text-xl md:text-2xl font-bold text-slate-900 group-hover:text-blue-700 transition-colors">Lead Product Designer, Design Systems</h3>
                  <p className="text-gray-500 text-sm mt-1">Spotify • Stockholm / Remote</p>
                  
                  <div className="flex flex-wrap gap-2 mt-4">
                    {["Figma Expert", "React/CSS", "Accessibility"].map(tag => (
                      <span key={tag} className="px-3 py-1 bg-gray-50 border border-gray-100 rounded-lg text-xs text-gray-600">{tag}</span>
                    ))}
                    <span className="px-3 py-1 text-xs text-gray-400">+4 more</span>
                  </div>
                </div>
              </div>
              <div className="w-full md:w-auto flex flex-col items-end justify-between self-stretch">
                <button className="p-2 text-gray-300 hover:text-blue-600 transition-colors">
                  <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" /></svg>
                </button>
                <div className="mt-4 md:mt-0 text-right">
                   <p className="text-[10px] font-bold text-gray-400 uppercase mb-1">Salary</p>
                   <p className="font-bold text-slate-900 text-lg">$160k - $210k</p>
                </div>
                <button className="mt-4 w-full md:w-auto px-10 py-3 bg-slate-900 text-white rounded-xl font-bold hover:bg-blue-700 transition-colors">Apply Now</button>
              </div>
            </div>
          </div>

          {/* Grid Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {jobs.map((job, idx) => (
              <div key={idx} className="bg-white p-6 rounded-3xl border border-gray-100 shadow-sm group hover:border-blue-100 transition-all">
                <div className="flex justify-between items-start mb-6">
                  <div className="w-12 h-12 bg-blue-50 rounded-xl flex items-center justify-center">
                    <div className="w-6 h-6 border-2 border-blue-200 rounded-full" />
                  </div>
                  <button className="text-gray-300 hover:text-blue-600"><svg className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20"><path d="M5 4a2 2 0 012-2h6a2 2 0 012 2v14l-5-2.5L5 18V4z" /></svg></button>
                </div>
                <h4 className="font-bold text-slate-900 group-hover:text-blue-700 transition-colors">{job.title}</h4>
                <p className="text-gray-400 text-xs mt-1 mb-4">{job.company} • {job.location}</p>
                <div className="flex gap-2 mb-6">
                  {job.tags.map(t => <span key={t} className="px-2 py-1 bg-gray-50 rounded-md text-[10px] text-gray-500 font-medium">{t}</span>)}
                </div>
                <div className="flex justify-between items-center pt-4 border-t border-gray-50">
                  <span className="font-bold text-slate-900 text-sm">{job.salary}</span>
                  <button className="text-blue-600 text-xs font-bold flex items-center gap-1">Details <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg></button>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination */}
          <div className="flex justify-center items-center mt-12 gap-2">
            <button className="p-2 text-gray-400 hover:text-blue-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg></button>
            {[1, 2, 3, '...', 12].map((p, i) => (
              <button key={i} className={`w-10 h-10 rounded-xl font-bold text-sm transition-all ${p === 1 ? 'bg-blue-600 text-white shadow-lg shadow-blue-100' : 'text-gray-400 hover:bg-gray-100'}`}>
                {p}
              </button>
            ))}
            <button className="p-2 text-gray-400 hover:text-blue-600"><svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg></button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default JobSearchSection;