import React from 'react';

const FeaturedOpportunities = () => {
  const jobs = [
    { title: "Growth Marketing Lead", company: "Stripe", location: "SF / Hybrid", salary: "$120k - $160k", isNew: true },
    { title: "Lead Backend Engineer", company: "Vercel", location: "Remote", salary: "$150k - $190k", isNew: false },
    { title: "Technical Content Writer", company: "Notion", location: "Remote", tag: "Hiring Now", tagColor: "bg-emerald-100 text-emerald-700" },
    { title: "Director of UX", company: "Airbnb", location: "San Francisco", tag: "Executive", tagColor: "bg-gray-100 text-gray-700" },
    { title: "Product Operations", company: "Ramp", location: "New York", tag: "Mid-Senior", tagColor: "bg-gray-100 text-gray-700" },
  ];

  return (
    <section className="bg-[#f0f2ff] py-12 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Header Section */}
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end mb-8 gap-4">
          <div>
            <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
              Featured <span className="text-blue-700">Opportunities</span>
            </h2>
            <p className="text-gray-500 mt-2 text-base md:text-lg">
              The most prestigious roles, refreshed daily.
            </p>
          </div>
          <div className="flex gap-2">
            <button className="p-2.5 rounded-xl bg-white border border-gray-200 shadow-sm">
              <svg className="w-5 h-5 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 19l-7-7 7-7" /></svg>
            </button>
            <button className="p-2.5 rounded-xl bg-blue-700 text-white shadow-md">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7" /></svg>
            </button>
          </div>
        </div>

        {/* Bento Grid - Mobile First */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 md:gap-6">
          
          {/* Main Featured Card - Full width on mobile/tablet */}
          <div className="md:col-span-2 bg-white rounded-[1.5rem] md:rounded-[2rem] p-6 md:p-10 flex flex-col justify-between relative overflow-hidden border border-gray-100">
            <div className="absolute top-4 right-4 md:top-6 md:right-6 bg-blue-50 text-blue-600 px-3 py-1 rounded-full text-[10px] md:text-xs font-bold uppercase">
              Remote
            </div>
            
            <div className="space-y-4 md:space-y-6">
              <div className="w-12 h-12 md:w-16 md:h-16 bg-slate-900 rounded-xl md:rounded-2xl flex items-center justify-center">
                <div className="w-6 h-6 md:w-8 md:h-8 border-2 border-white rounded-full opacity-80" />
              </div>
              
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-slate-900">Senior Product Designer</h3>
                <p className="text-gray-500 mt-2 md:mt-4 max-w-md leading-snug text-sm md:text-lg">
                  Lead the evolution of our design system and shape the future of digital workspaces.
                </p>
              </div>

              <div className="flex flex-wrap gap-2 md:gap-3">
                <span className="px-3 py-1.5 bg-gray-100 rounded-lg text-xs font-semibold text-gray-700">$140k - $180k</span>
                <span className="px-3 py-1.5 bg-gray-100 rounded-lg text-xs font-semibold text-gray-700">Full-time</span>
              </div>
            </div>

            <button className="mt-8 w-full bg-blue-700 text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 text-sm md:text-base">
              Apply Now 
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" /></svg>
            </button>
          </div>

          {/* Right/Bottom Cards */}
          <div className="grid grid-cols-1 gap-4 md:gap-6 md:col-span-2 lg:col-span-1 lg:flex lg:flex-col">
            {jobs.slice(0, 2).map((job, i) => (
              <div key={i} className="bg-white p-6 md:p-8 rounded-[1.5rem] md:rounded-[2rem] border border-gray-100 relative shadow-sm">
                {job.isNew && <span className="absolute top-4 right-4 text-blue-700 font-bold text-[10px] uppercase">New</span>}
                <div className="w-8 h-8 bg-blue-50 rounded-lg flex items-center justify-center mb-4 text-blue-600 font-bold italic">e</div>
                <h4 className="text-lg font-bold text-slate-900 leading-tight">{job.title}</h4>
                <p className="text-gray-400 text-xs mt-1">{job.company} • {job.location}</p>
                <div className="mt-4 flex justify-between items-center">
                  <span className="text-blue-700 font-bold text-sm">{job.salary}</span>
                  <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
                </div>
              </div>
            ))}
          </div>

          {/* Bottom Small Cards */}
          {jobs.slice(2).map((job, i) => (
            <div key={i} className="bg-white p-6 rounded-[1.5rem] border border-gray-100 flex flex-col justify-between shadow-sm">
              <div>
                <h4 className="text-base font-bold text-slate-900">{job.title}</h4>
                <p className="text-gray-400 text-xs">{job.company} • {job.location}</p>
              </div>
              <div className="mt-6 flex justify-between items-center">
                <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${job.tagColor}`}>
                  {job.tag}
                </span>
                <svg className="w-4 h-4 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path d="M17 8l4 4m0 0l-4 4m4-4H3" /></svg>
              </div>
            </div>
          ))}

        </div>
      </div>
    </section>
  );
};

export default FeaturedOpportunities;