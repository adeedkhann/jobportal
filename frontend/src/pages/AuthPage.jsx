import React, { useEffect, useState } from "react";
import { Eye, EyeOff } from "lucide-react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { toast } from "sonner"
import { useDispatch, useSelector } from "react-redux";
import { setLoading ,setUser} from "@/store/authSlice";

const AuthPage = () => {
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState("student");
  const [showPassword, setShowPassword] = useState(false);

  const navigate = useNavigate()
  const dispatch = useDispatch();
  const {loading} = useSelector(store=>store.auth)

  const [authData, setAuthData] = useState({
    fullname: "",
    email: "",
    phoneNumber: "",
    password: "",
    role: role,
  });

  const handleChange = (e) => {
    setAuthData({ ...authData, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    setAuthData((prev) => ({ ...prev, role: role }));
  }, [role]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const apiToFetch = isLogin
      ? "http://localhost:8000/api/v1/user/login"
      : "http://localhost:8000/api/v1/user/register";

    try {
      dispatch(setLoading(true))

      const res = await axios.post(apiToFetch, authData, {
        headers: {
          "Content-Type": "application/json", // Header add kiya
        },
        withCredentials: true,
      });

      if (res.data.success) {
        console.log("Success:", res.data.message);
        
      }
      if(isLogin){
        dispatch(setUser(res.data.data));
        console.log(res.data.data)
        toast.success('Logged in Successfully')
        dispatch(setUser(res.data.data));
        navigate("/")
      }else{
        toast.success("Registered Successfully")
      }

    } catch (error) {
dispatch(setLoading(false))
  // Sabse pehle backend ka message check karo, fir axios ka message, fir fallback
  const errorMsg = error.response?.data?.message || error.message || "Server Error!";
  
  toast.error(errorMsg);
    }finally{
      dispatch(setLoading(false))
      
    }
  };
  return (
    <div className="flex h-screen w-full overflow-hidden bg-white font-sans">
      <div className="relative hidden md:flex md:w-1/2 bg-[#0047BB] p-10 lg:p-16 text-white flex-col justify-between overflow-hidden">
        <div className="absolute inset-0 opacity-10 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')]"></div>

        <div className="relative z-10">
          <span className="text-4xl font-bold tracking-tight">TalentLoop</span>
        </div>

        <div className="relative z-10 max-w-lg space-y-6">
          <h1 className="text-4xl lg:text-5xl font-bold leading-[1.1] tracking-tight">
            Elevate your professional journey with precision.
          </h1>
          <p className="text-base lg:text-lg text-blue-100/80 leading-relaxed">
            Join a community where career opportunities are curated for
            excellence, not just listed.
          </p>

          <div className="flex gap-4 pt-4">
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-xl border border-white/20 flex-1">
              <div className="text-3xl font-bold">12k+</div>
              <div className="text-[9px] uppercase tracking-[0.2em] font-semibold opacity-60 mt-1">
                Premium Roles
              </div>
            </div>
            <div className="rounded-2xl bg-white/10 p-5 backdrop-blur-xl border border-white/20 flex-1">
              <div className="text-3xl font-bold">98%</div>
              <div className="text-[9px] uppercase tracking-[0.2em] font-semibold opacity-60 mt-1">
                Match Rate
              </div>
            </div>
          </div>
        </div>

        <div className="relative z-10 flex items-center gap-3">
          <div className="flex -space-x-2">
            {[1, 2, 3].map((i) => (
              <img
                key={i}
                src={`https://i.pravatar.cc/150?u=${i}`}
                alt="User"
                className="h-8 w-8 rounded-full border-2 border-[#0047BB] shadow-lg"
              />
            ))}
          </div>
          <p className="text-xs italic text-blue-100/70 font-medium">
            Joined by the world's top talent
          </p>
        </div>
      </div>

      <div className="flex flex-1 flex-col items-center justify-center bg-gray-50 p-4 md:p-8 overflow-hidden">
        <div className="w-full max-w-[460px] bg-white rounded-[2.5rem] p-6 md:p-10 shadow-[0_8px_30px_rgb(0,0,0,0.02)] border border-gray-100 max-h-full overflow-y-auto no-scrollbar">
          <div className="mb-6">
            <h2 className="text-2xl md:text-3xl font-bold text-gray-900 tracking-tight">
              {isLogin ? "Welcome Back" : "Create Account"}
            </h2>
            <p className="text-gray-400 text-xs font-medium mt-1">
              {isLogin
                ? "Enter your credentials to access your account."
                : "Join the elite gallery of career growth."}
            </p>
          </div>

          <form className="space-y-4" onSubmit={handleSubmit}>
            <div className="space-y-2">
              <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">
                Select Role
              </label>
              <div className="flex bg-gray-100 p-1 rounded-2xl">
                <button
                  type="button"
                  onClick={() => setRole("student")}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${role === "student" ? "bg-white text-[#0047BB] shadow-sm" : "text-gray-400"}`}
                >
                  Student
                </button>
                <button
                  type="button"
                  onClick={() => setRole("recruiter")}
                  className={`flex-1 py-2.5 text-xs font-bold rounded-xl transition-all ${role === "recruiter" ? "bg-white text-[#0047BB] shadow-sm" : "text-gray-400"}`}
                >
                  Recruiter
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 gap-3.5">
              {!isLogin && (
                <div className="grid grid-cols-2 gap-3">
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">
                      Full Name
                    </label>
                    <input
                      type="text"
                      name="fullname"
                      value={authData.fullname}
                      onChange={handleChange}
                      placeholder="Alex Rivera"
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                  </div>
                  <div className="space-y-1.5">
                    <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">
                      Phone
                    </label>
                    <input
                      type="tel"
                      name="phoneNumber"
                      onChange={handleChange}
                      value={authData.phoneNumber}
                      placeholder="+91..."
                      className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                    />
                  </div>
                </div>
              )}

              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  onChange={handleChange}
                  value={authData.email}
                  placeholder="name@example.com"
                  className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                />
              </div>

              <div className="space-y-1.5">
                <label className="text-[9px] font-bold uppercase tracking-[0.2em] text-gray-400 ml-1">
                  Password
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    value={authData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className="w-full px-4 py-3 rounded-xl bg-gray-50 border-transparent text-sm focus:bg-white focus:ring-2 focus:ring-blue-100 outline-none transition-all"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-gray-300 hover:text-gray-500"
                  >
                    {showPassword ? <EyeOff size={16} /> : <Eye size={16} />}
                  </button>
                </div>
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-4 z-50 bg-[#0047BB] text-white text-sm font-bold rounded-2xl hover:bg-[#0037a0] active:scale-[0.98] transition-all shadow-xl shadow-blue-100 mt-2"
            >
              {isLogin ? "Sign In to TalentLoop" : "Create My Account"}
            </button>
          </form>

          <div className="mt-6 text-center text-xs font-medium text-gray-400">
            {isLogin ? "Don't have an account?" : "Already have an account?"}
            <button
              type="button"
              onClick={() => setIsLogin(!isLogin)}
              className="font-bold text-[#0047BB] hover:underline ml-1"
            >
              {loading? "loading": isLogin ? "Register Now" : "Log In"}
            </button>
          </div>
        </div>

        <footer className="mt-6 text-center space-y-3">
          <div className="flex justify-center gap-6 text-[9px] font-bold text-gray-400 uppercase tracking-widest">
            <a href="#" className="hover:text-gray-600">
              Privacy
            </a>
            <a href="#" className="hover:text-gray-600">
              Terms
            </a>
            <a href="#" className="hover:text-gray-600">
              Support
            </a>
          </div>
          <p className="text-[8px] tracking-[0.3em] text-gray-300 font-medium uppercase">
            © 2026 TalentLoop. Built for excellence.
          </p>
        </footer>
      </div>
    </div>
  );
};

export default AuthPage;
