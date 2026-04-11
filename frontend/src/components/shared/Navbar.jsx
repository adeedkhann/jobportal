import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Menu, X, User, LogOut, Settings, LayoutDashboard } from "lucide-react";
import { useNavigate, Link, NavLink } from 'react-router-dom'; // NavLink add kiya
import { useDispatch, useSelector } from 'react-redux';
import { setUser } from '@/store/authSlice';
import axios from 'axios';
import { toast } from 'sonner';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { user } = useSelector((store) => store.auth);

  const navLinks = [
    { name: "Home", href: "/" },
    { name: "Find Jobs", href: "/jobs" },

  ];
const handleLogout = async () => {
    try {
        const res = await axios.get("https://jobportal-1-nhtb.onrender.com/api/v1/user/logout", {
            withCredentials: true // <--- Yeh sabse zaroori hai cookies clear karne ke liye
        });

        if (res.data.success) {
            dispatch(setUser(null));
            navigate("/auth"); // Redirect karein
            toast.success(res.data.message || "Logged out successfully");
        }
    } catch (error) {
        console.log("Logout Error:", error);
        toast.error("Failed to logout. Please try again.");
        
        // Error ke case mein bhi local state clear karna safe rehta hai
        dispatch(setUser(null));
        navigate("/auth");
    }
};

  return (
    <nav className="w-full border-b border-slate-100 bg-white px-6 py-4 relative">
      <div className="max-w-7xl mx-auto flex items-center justify-between">
        
        <div className="flex items-center gap-12">
          <Link to="/" className="text-[#002B7F] font-bold text-xl tracking-tight">
            TalentLoop
          </Link>

          {/* Desktop Links */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.href}
                className={({ isActive }) => 
                  `relative text-sm font-medium transition-all duration-200 pb-1 ${
                    isActive ? "text-[#0052CC]" : "text-slate-500 hover:text-slate-800"
                  }`
                }
              >
                {({ isActive }) => (
                  <>
                    {link.name}
                    {isActive && (
                      <span className="absolute bottom-0 left-0 w-full h-[2px] bg-[#0052CC]" />
                    )}
                  </>
                )}
              </NavLink>
            ))}
          </div>
        </div>

        {/* Right Side Logic (Same as before) */}
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
                      {/* Active State for Dropdown Profile Link */}
                      <DropdownMenuItem 
                        onClick={() => navigate(user.role === 'recruiter' ? "/recruiterprofile" : "/seekerprofile")} 
                        className="flex items-center gap-3 py-2.5 px-3 cursor-pointer rounded-md hover:bg-blue-50 transition-colors"
                      >
                        <User className="h-4 w-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-700">My Profile</span>
                      </DropdownMenuItem>
                      <DropdownMenuItem 
                        onClick={() => navigate(user.role === 'recruiter' ? "/recruiterdashboard" : "/studentdashboard")} 
                        className="flex items-center gap-3 py-2.5 px-3 cursor-pointer rounded-md hover:bg-blue-50 transition-colors"
                      >
                        <LayoutDashboard className="h-4 w-4 text-slate-500" />
                        <span className="text-sm font-medium text-slate-700">Dashboard</span>
                      </DropdownMenuItem>

                      <DropdownMenuItem 
                        onClick={() => navigate("/settings")} 
                        className="flex items-center gap-3 py-2.5 px-3 cursor-pointer rounded-md hover:bg-blue-50 transition-colors"
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

          <div className="md:hidden flex items-center gap-2">
            {user && (
              <DropdownMenu>
                <DropdownMenuTrigger className="focus:outline-none">
                  <Avatar className="h-9 w-9 border-2 border-slate-100 hover:border-[#0052CC] transition-all duration-300 cursor-pointer shadow-sm">
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
                      onClick={() => {
                        navigate(user.role === 'recruiter' ? "/recruiterprofile" : "/seekerprofile");
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-3 py-2.5 px-3 cursor-pointer rounded-md hover:bg-blue-50 transition-colors"
                    >
                      <User className="h-4 w-4 text-slate-500" />
                      <span className="text-sm font-medium text-slate-700">My Profile</span>
                    </DropdownMenuItem>
                    <DropdownMenuItem
                      onClick={() => {
                        navigate(user.role === 'recruiter' ? "/recruiterdashboard" : "/studentdashboard");
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-3 py-2.5 px-3 cursor-pointer rounded-md hover:bg-blue-50 transition-colors"
                    >
                      <LayoutDashboard className="h-4 w-4 text-slate-500" />
                      <span className="text-sm font-medium text-slate-700">Dashboard</span>
                    </DropdownMenuItem>

                    <DropdownMenuItem
                      onClick={() => {
                        navigate("/settings");
                        setIsMenuOpen(false);
                      }}
                      className="flex items-center gap-3 py-2.5 px-3 cursor-pointer rounded-md hover:bg-blue-50 transition-colors"
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
            )}

            <button onClick={() => setIsMenuOpen(!isMenuOpen)} className="text-slate-600 p-2">
              {isMenuOpen ? <X size={28} /> : <Menu size={28} />}
            </button>
          </div>
        </div>
      </div>

      {/* Mobile Menu Content */}
      {isMenuOpen && (
        <div className="absolute top-full left-0 w-full bg-white border-b border-slate-100 flex flex-col p-6 gap-4 md:hidden z-50 shadow-lg">
          {navLinks.map((link) => (
            <NavLink
              key={link.name}
              to={link.href}
              onClick={() => setIsMenuOpen(false)}
              className={({ isActive }) => 
                `text-left text-lg font-medium ${isActive ? "text-[#0052CC]" : "text-slate-500"}`
              }
            >
              {link.name}
            </NavLink>
          ))}
          <hr className="border-slate-100" />
          {!user ? (
            <div className="flex flex-col gap-4">
              <button onClick={() => navigate("/auth")} className="text-left text-lg font-medium text-slate-600">Login</button>
              <Button onClick={() => navigate("/auth")} className="bg-[#0052CC] w-full text-white">Join Now</Button>
            </div>
          ) : (
            <div className="flex flex-col gap-4">
              <NavLink 
                to={user.role === 'recruiter' ? "/recruiterprofile" : "/seekerprofile"} 
                className={({ isActive }) => `text-lg font-medium ${isActive ? "text-[#0052CC]" : "text-slate-600"}`}
                onClick={() => setIsMenuOpen(false)}
              >
                Profile
              </NavLink>
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