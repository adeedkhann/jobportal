import React from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

const FeaturesAndCTA = () => {
  const navigate = useNavigate()
  const {user} = useSelector(store=>store.auth)
  const features = [
    {
      title: "Vetted Companies",
      desc: "We manually screen every employer to ensure they offer high-growth environments.",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
        </svg>
      ),
    },
    {
      title: "Salary Transparency",
      desc: "Every listing includes a clear salary range. No more guessing or wasted hours.",
      iconBg: "bg-blue-100",
      iconColor: "text-blue-600",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
        </svg>
      ),
    },
    {
      title: "AI Matching",
      desc: "Our semantic search understands your skills and career goals, not just keywords.",
      iconBg: "bg-emerald-100",
      iconColor: "text-emerald-600",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 10V3L4 14h7v7l9-11h-7z" />
        </svg>
      ),
    },
    {
      title: "Privacy First",
      desc: "Apply with confidence. Control exactly who sees your profile and remain anonymous.",
      iconBg: "bg-indigo-100",
      iconColor: "text-indigo-600",
      icon: (
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z" />
        </svg>
      ),
    },
  ];

  return (
    <div className=" px-4 py-16 md:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Top Header Section */}
        <div className="text-center mb-16 px-2">
          <h2 className="text-3xl md:text-4xl font-bold text-slate-900 leading-tight">
            Designed for the <span className="text-blue-700">Top 1% of Talent</span>
          </h2>
          <p className="text-gray-500 mt-4 max-w-2xl mx-auto text-sm md:text-base">
            We're not another job board. We're a talent accelerator that focuses on quality over quantity.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8 md:gap-12 mb-24">
          {features.map((item, index) => (
            <div key={index} className="flex flex-col items-start text-left">
              <div className={`${item.iconBg} ${item.iconColor} p-3 rounded-xl mb-5`}>
                {item.icon}
              </div>
              <h3 className="text-lg font-bold text-slate-900 mb-2">{item.title}</h3>
              <p className="text-gray-500 text-sm leading-relaxed">
                {item.desc}
              </p>
            </div>
          ))}
        </div>

        {/* Blue CTA Section */}
        <div className="bg-blue-600 rounded-4xl w- p-8 md:p-20 text-center text-white shadow-2xl relative overflow-hidden">
          {/* Subtle Background Glow */}
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-full h-full bg-gradient-to-b from-white/10 to-transparent pointer-events-none" />
          
          <div className="relative z-10">
            <h2 className="text-3xl md:text-5xl font-extrabold mb-6 leading-tight">
              Ready to Curate Your<br className="hidden md:block" /> Professional Future?
            </h2>
            <p className="text-blue-100 mb-10 text-sm md:text-lg max-w-xl mx-auto">
              Join 50,000+ professionals who found their dream roles through our platform.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
              {user && <button 
              onClick={()=>(navigate("/auth"))}
              className="w-full sm:w-auto bg-white text-blue-700 font-bold px-8 py-4 rounded-xl hover:bg-blue-50 transition-colors shadow-lg">
                Create Free Profile
              </button>}
              <button className="w-full sm:w-auto bg-blue-700 border border-blue-400 text-white font-bold px-8 py-4 rounded-xl hover:bg-blue-800 transition-colors">
                Learn More
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
  );
};

export default FeaturesAndCTA;