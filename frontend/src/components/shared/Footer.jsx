import React from 'react';

const Footer = () => {
  return (
    <footer className=" pt-16 pb-8 px-4 md:px-6">
      <div className="max-w-7xl mx-auto">
        
        {/* Main Footer Content */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          {/* Brand Column */}
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-blue-700">TalentLoop</h2>
            <p className="text-gray-500 text-sm leading-relaxed max-w-xs">
              Redefining the job search for the modern era. Quality first, always.
            </p>
            
          </div>

          {/* Resources Column */}
          <div>
            <h3 className="font-bold text-slate-900 mb-6">Resources</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-blue-600 transition-colors">Find Jobs</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Career Advice</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Salary Tool</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Help Center</a></li>
            </ul>
          </div>

          {/* Company Column */}
          <div>
            <h3 className="font-bold text-slate-900 mb-6">Company</h3>
            <ul className="space-y-4 text-sm text-gray-500">
              <li><a href="#" className="hover:text-blue-600 transition-colors">About Us</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Privacy Policy</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Terms of Service</a></li>
              <li><a href="#" className="hover:text-blue-600 transition-colors">Press Kit</a></li>
            </ul>
          </div>

          {/* Newsletter Column */}
          <div className="space-y-6">
            <h3 className="font-bold text-slate-900">Newsletter</h3>
            <p className="text-sm text-gray-500">Get curated job alerts directly in your inbox.</p>
            <form className="space-y-3">
              <input 
                type="email" 
                placeholder="email@company.com" 
                className="w-full px-4 py-3 rounded-xl border border-gray-200 focus:ring-2 focus:ring-blue-500 outline-none text-sm"
              />
              <button className="w-full bg-blue-700 text-white font-bold py-3 rounded-xl hover:bg-blue-800 transition-all shadow-md">
                Subscribe
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Bar */}
        <div className="pt-8 border-t border-gray-200 flex flex-col md:flex-row justify-between items-center gap-6">
          <p className="text-gray-400 text-xs text-center md:text-left">
            © 2026 TalentLoop. All rights reserved.
          </p>
          <div className="flex gap-6 text-xs text-gray-400">
            <a href="#" className="hover:underline">Privacy</a>
            <a href="#" className="hover:underline">Cookies</a>
            <a href="#" className="hover:underline">Accessibility</a>
          </div>
        </div>

      </div>
    </footer>
  );
};

export default Footer;