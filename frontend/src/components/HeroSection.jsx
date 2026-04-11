import React from 'react';
import { useNavigate } from 'react-router-dom';
const HeroSection = () => {
  const navigate=useNavigate();
  return (
    <section className="bg-white text-[#111827]">
      <div className="max-w-7xl mx-auto px-6 py-16 md:py-24 grid md:grid-cols-2 gap-12 items-center">
        
        {/* Left Content Column */}
        <div className="space-y-8">
          <div className="space-y-4">
            <span className="text-sm font-semibold text-blue-600 uppercase tracking-widest">
              THE DIGITAL CURATOR
            </span>
            <h1 className="text-5xl md:text-6xl font-extrabold tracking-tight leading-tight">
              Your Career,<br />
              <span className="text-blue-600">Curated</span> for<br />
              Excellence.
            </h1>
            <p className="text-lg text-gray-600 max-w-lg">
              Move away from the cluttered job boards. Experience a gallery of premium opportunities tailored to your professional trajectory.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row gap-4">
            <button
              onClick={()=>(navigate("/jobs"))}
              className="inline-flex items-center justify-center px-8 py-3.5 border border-transparent text-base font-medium rounded-full shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Find Jobs →
            </button>
            <button
              onClick={()=>(navigate("/postjob"))}
              className="inline-flex items-center justify-center px-8 py-3.5 border border-gray-300 text-base font-medium rounded-full text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
            >
              Post a Job
            </button>
          </div>
        </div>

        {/* Right Image/Graphic Column */}
        <div className="relative">
          {/* Replace this div with your actual image or graphic component */}
         
             {/* This is a placeholder for your image/vector */}
             <img 
               src="https://lh3.googleusercontent.com/aida-public/AB6AXuCgQiUN1keNxDHyDgn2nzaXAHMZiNhcPNhLoUaWaXmrIAPHDQ9JXvkTHR-3I9BB5PqEF9lyCVaTl81S51GSZr3evzZEVJgjn1jTi4Npx4UtwernQySbKUT7UMKnWu0O7_5M7R9BkZKgs5ANmTZRCuZ3Kcu0IvVi8izc3YrT8puNbpWJiZzQE8tv9CodesWTmsC9_lKIOq1S26Y-aC_6O6OrI4hKSreu6KT1EHqqLHY4ILIn9gOXkQKhqANVRGOc9clrU38FyCVGyQKw" 
               alt="Abstract career curation graphic"
               className="object-cover rounded-2xl"
             />
          
          
          {/* Floating Card for 'Top Placement' */}
          <div className="absolute -top-12 -left-12 bg-white p-5 rounded-2xl shadow-xl border border-gray-100 max-w-[220px]">
            <div className="flex text-yellow-400 mb-2">
              {[...Array(5)].map((_, i) => (
                <svg key={i} className="w-5 h-5 fill-current" viewBox="0 0 20 20"><path d="M10 15l-5.878 3.09 1.123-6.545L.489 6.91l6.572-.955L10 0l2.939 5.955 6.572.955-4.756 4.635 1.123 6.545z"/></svg>
              ))}
            </div>
            <p className="font-semibold text-gray-900">Top Placement</p>
            <p className="text-sm text-gray-500 mt-1">
              450+ Designers placed this month
            </p>
          </div>
        </div>
      </div>

      
    </section>
  );
};

export default HeroSection;