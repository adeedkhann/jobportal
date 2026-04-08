import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, Settings } from "lucide-react";
import { useNavigate, Link } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/store/authSlice'; // Import your setUser action
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [activeLink, setActiveLink] = useState("Home");
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  // Get user from Redux
  const { user } = useSelector((store) => store.auth);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Find Jobs", href: "/jobs" },
    { name: "Companies", href: "/companies" },
    { name: "Blog", href: "/blog" },
  ];

  const handleLogout = () => {
    dispatch(setUser(null));
    navigate("/auth");
  };

  return (
    <nav className="w-full border-b border-slate-100 bg-white px-6 py-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        {/* Logo and Links */}
        <div className="flex items-center gap-12">
          <Link to="/" className="text-[#002B7F] font-bold text-xl tracking-tight">
            TalentLoop
          </Link>

          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => {
              const isActive = activeLink === link.name;
              return (
                <Link
                  key={link.name}
                  to={link.href}
                  onClick={() => setActiveLink(link.name)}
                  className={`relative text-sm font-medium transition-all duration-200 pb-1 ${
                    isActive ? "text-[#0052CC]" : "text-slate-500 hover:text-slate-800"
                  }`}
                >
                  {link.name}
                  {isActive && (
                    <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0052CC]" />
                  )}
                </Link>
              );
            })}
          </div>
        </div>

        {/* Right Side: Auth or Profile */}
        <div className="flex items-center gap-4">
          <div className="hidden md:flex items-center gap-4">
            {!user ? (
              <>
                <button onClick={() => navigate("/auth")} className="text-sm font-medium text-slate-600 hover:text-black">
                  Login
                </button>
                <Button onClick={() => navigate("/auth")} className="bg-[#0052CC] hover:bg-[#0041a3] text-white px-6 py-2 rounded-md font-medium">
                  Join Now
                </Button>
              </>
            ) : (
              <div className="flex items-center gap-4">
                {/* RBAC: Only show Post a Job to Recruiters */}
                {user.role === 'recruiter' && (
                  <Button 
                    onClick={() => navigate("/postjob")}
                    variant="outline" 
                    className="border-[#0052CC] text-[#0052CC] hover:bg-blue-50"
                  >
                    Post a Job
                  </Button>
                )}
                
                <DropdownMenu>
                  <DropdownMenuTrigger className="focus:outline-none">
                    <Avatar className="h-10 w-10 border-2 border-slate-100 hover:border-[#0052CC] transition-all duration-300 cursor-pointer shadow-sm">
                      <AvatarImage src={user.profile?.profilePhoto} alt={user.fullname} />
                      <AvatarFallback className="bg-blue-50 text-[#0052CC] font-bold">
                        {user.fullname?.charAt(0)}
                      </AvatarFallback>
                    </Avatar>
                  </DropdownMenuTrigger>

                  <DropdownMenuContent align="end" sideOffset={10} className="w-64 p-2 shadow-xl border-slate-100 rounded-xl">
                    <div className="flex items-center gap-3 p-3 mb-1 bg-slate-50/50 rounded-lg">
                      <Avatar className="h-9 w-9">
                        <AvatarImage src={user.profile?.profilePhoto} />
                        <AvatarFallback>{user.fullname?.charAt(0)}</AvatarFallback>
                      </Avatar>
                      <div className="flex flex-col">
                        <p className="text-sm font-semibold text-slate-900 leading-none">{user.fullname}</p>
                        <p className="text-xs text-slate-500 mt-1 capitalize">{user.role}</p>
                      </div>
                    </div>

                    <DropdownMenuSeparator className="bg-slate-100" />

                    <div className="mt-1">
                      <DropdownMenuItem 
                        onClick={() => navigate(user.role === 'recruiter' ? "/admin/profile" : "/seekerprofile")} 
                        className="flex items-center gap-3 py-2.5 px-3 cursor-pointer rounded-md hover:bg-blue-50 focus:bg-blue-50 transition-colors"
                      >
                        <User className="h-4 w-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-700">My Profile</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem 
                        onClick={() => navigate("/settings")} 
                        className="flex items-center gap-3 py-2.5 px-3 cursor-pointer rounded-md hover:bg-blue-50 focus:bg-blue-50 transition-colors"
                      >
                        <Settings className="h-4 w-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-700">Settings</span>
                      </DropdownMenuItem>
                    </div>

                    <DropdownMenuSeparator className="bg-slate-100" />

                    <DropdownMenuItem 
                      onClick={handleLogout} 
                      className="flex items-center gap-3 py-2.5 px-3 cursor-pointer rounded-md text-red-600 hover:bg-red-50 focus:bg-red-50 focus:text-red-600 transition-colors mt-1"
                    >
                      <LogOut className="h-4 w-4" />
                      <span className="text-sm font-semibold">Log out</span>
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              </div>
            )}
          </div>

          {/* Mobile Menu Toggle */}
          <div className="md:hidden">
            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 p-2">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content (RBAC included here too) */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-slate-100 flex flex-col p-6 gap-4 md:hidden z-50 shadow-lg">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.href}
              onClick={() => {
                setActiveLink(link.name);
                setIsMenuOpen(false);
              }}
              className={`text-left text-lg font-medium ${
                activeLink === link.name ? "text-[#0052CC]" : "text-slate-500"
              }`}
            >
              {link.name}
            </Link>
          ))}
          <hr className="border-slate-100" />
          {!user ? (
            <div className="flex flex-col gap-4">
              <button onClick={() => navigate("/auth")} className="text-left text-lg font-medium text-slate-600">Login</button>
              <Button onClick={() => navigate("/auth")} className="bg-[#0052CC] w-full text-white">Join Now</Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <Link to={user.role === 'recruiter' ? "/admin/profile" : "/seekerprofile"} className="text-lg font-medium text-slate-600">Profile</Link>
              {user.role === 'recruiter' && <Button onClick={() => navigate("/postjob")} className="bg-[#0052CC] w-full text-white">Post a Job</Button>}
              <button onClick={handleLogout} className="text-left text-lg font-medium text-red-500">Logout</button>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;