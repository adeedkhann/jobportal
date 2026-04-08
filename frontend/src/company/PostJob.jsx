import React from 'react';

const PostJob = () => {
  const steps = [
    { id: '01', title: 'Job Details', active: true },
    { id: '02', title: 'Salary & Location', active: false },
    { id: '03', title: 'Requirements', active: false },
    { id: '04', title: 'Preview', active: false },
  ];

  return (
    <div className="bg-[#f8faff] min-h-screen py-10 px-4 md:px-8 lg:px-16">
      <div className="max-w-6xl mx-auto">
        
        {/* Header Section */}
        <div className="mb-10">
          <h1 className="text-3xl md:text-4xl font-extrabold text-slate-900">
            Hire your next <span className="text-blue-600">visionary</span>
          </h1>
          <p className="text-gray-500 mt-2 max-w-lg text-sm md:text-base">
            Create a compelling job listing that attracts top-tier talent from around the globe. Follow our curated 4-step process.
          </p>
        </div>

        <div className="flex flex-col lg:flex-row gap-8">
          
          {/* Left Sidebar - Steps */}
          <div className="w-full lg:w-1/4 space-y-6">
            <div className="bg-white rounded-3xl p-4 border border-gray-100 shadow-sm space-y-2">
              {steps.map((step) => (
                <div 
                  key={step.id} 
                  className={`flex items-center gap-4 p-3 rounded-2xl transition-all ${
                    step.active ? 'bg-blue-50 border border-blue-100' : 'opacity-50'
                  }`}
                >
                  <div className={`w-10 h-10 rounded-xl flex items-center justify-center font-bold text-xs ${
                    step.active ? 'bg-blue-600 text-white' : 'bg-gray-100 text-gray-500'
                  }`}>
                    {step.id}
                  </div>
                  <div>
                    <p className="text-[10px] font-bold text-gray-400 uppercase leading-none mb-1">Step {step.id}</p>
                    <p className={`text-sm font-bold ${step.active ? 'text-blue-700' : 'text-slate-900'}`}>{step.title}</p>
                  </div>
                </div>
              ))}
            </div>

            {/* Curator's Tip Card */}
            <div className="bg-[#e0f7ff] rounded-3xl p-6 border border-blue-100">
               <h4 className="text-blue-700 font-bold text-sm mb-2">Curator's Tip</h4>
               <p className="text-blue-600/80 text-xs leading-relaxed">
                 Job titles that include specific levels (e.g., 'Senior') receive 40% more qualified applicants.
               </p>
            </div>
          </div>

          {/* Right Main Form Section */}
          <div className="flex-grow bg-white rounded-[2.5rem] p-6 md:p-10 border border-gray-100 shadow-sm">
            
            <div className="flex justify-between items-center mb-10">
              <h2 className="text-xl font-bold text-slate-900">Step 1: Job Details</h2>
              <span className="text-xs font-bold text-gray-400 uppercase tracking-widest">Progress 25%</span>
            </div>

            <form className="space-y-8">
              {/* Job Title */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Professional Job Title</label>
                <input 
                  type="text" 
                  placeholder="e.g. Senior Product Designer (UI/UX)" 
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>

              {/* Type and Experience Grid */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Employment Type</label>
                  <select className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-blue-500 appearance-none">
                    <option>Full-time</option>
                    <option>Contract</option>
                    <option>Freelance</option>
                  </select>
                </div>
                <div>
                  <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Experience Level</label>
                  <select className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-blue-500 appearance-none">
                    <option>Entry Level (0-2 years)</option>
                    <option>Mid-Senior (3-5 years)</option>
                    <option>Director / Lead</option>
                  </select>
                </div>
              </div>

              {/* Job Description (Simple Editor Mockup) */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Job Description</label>
                <div className="border border-gray-100 rounded-[2rem] overflow-hidden shadow-sm">
                  <div className="bg-gray-50 p-3 border-b border-gray-100 flex gap-4">
                     {['B', 'I', '≡', '🔗'].map((tool, i) => (
                       <button key={i} type="button" className="text-gray-400 hover:text-slate-900 font-bold px-2">{tool}</button>
                     ))}
                  </div>
                  <textarea 
                    rows="8" 
                    placeholder="Outline the role, responsibilities, and what makes your company unique..."
                    className="w-full p-6 text-sm border-none focus:ring-0 resize-none bg-white"
                  ></textarea>
                </div>
              </div>

              {/* Target Skills / Tags */}
              <div>
                <label className="text-[10px] font-bold text-gray-400 uppercase tracking-widest block mb-3">Target Skills (Tags)</label>
                <div className="flex flex-wrap gap-2 mb-4">
                  {['FIGMA', 'UI DESIGN', 'PROTOTYPING'].map(tag => (
                    <span key={tag} className="px-4 py-2 bg-blue-50 text-blue-600 rounded-full text-[10px] font-bold flex items-center gap-2">
                      {tag} <span className="opacity-50 cursor-pointer">✕</span>
                    </span>
                  ))}
                </div>
                <input 
                  type="text" 
                  placeholder="Add a skill and press enter..." 
                  className="w-full bg-gray-50 border-none rounded-2xl py-4 px-6 text-sm focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </form>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-10 pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <button className="text-gray-400 font-bold text-sm flex items-center gap-2 hover:text-slate-900">
            ← Back to Dashboard
          </button>
          <div className="flex gap-4 w-full md:w-auto">
             <button className="flex-1 md:flex-none px-10 py-4 bg-gray-100 text-slate-700 font-bold rounded-2xl hover:bg-gray-200 transition-all text-sm">
                Save Draft
             </button>
             <button className="flex-1 md:flex-none px-10 py-4 bg-blue-600 text-white font-bold rounded-2xl hover:bg-blue-700 transition-all shadow-lg shadow-blue-200 text-sm">
                Continue to Step 2
             </button>
          </div>
        </div>

      </div>
    </div>
  );
};

export default PostJob;