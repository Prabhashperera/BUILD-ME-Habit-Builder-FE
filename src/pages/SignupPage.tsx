/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Mail,
  Lock,
  User,
  ArrowRight,
  Github,
  Rocket,
  CheckCircle,
  Trophy,
} from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { signupUser, reset } from "../store/slices/authSlice";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import api from "../api/axiosConfig";

const SignupPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch<any>();
  const { isLoading, data, error } = useSelector((state: any) => state.auth);
  
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // Reset state on mount
  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  const handleSignUp = async (e: any) => {
    e.preventDefault(); // Prevent default form submission
    dispatch(
      signupUser({
        userName,
        email,
        password,
      })
    );
  };

  // Google Login Handler
  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      const token = credentialResponse.credential;
      const res = await api.post("/auth/google", { token });
      
      toast.success("Account created with Google!");
      // Save tokens
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("email", res.data.email);
      
      navigate("/habits");
    } catch (err) {
      console.error(err);
      toast.error("Google signup failed");
    }
  };

  // After Successful Signup redirect to login
  useEffect(() => {
    if (data) {
      toast.success("Account created successfully! Please login.");
      navigate("/login");
      dispatch(reset()); // Clear the success state
    }
    if (error) {
      toast.error(error);
      dispatch(reset()); // Clear error after showing
    }
  }, [data, error, navigate, dispatch]);

  return (
    <div className="min-h-screen w-full flex bg-slate-950 font-sans selection:bg-emerald-500/30">
      
      {/* LEFT SIDE: Visuals (Hidden on mobile) */}
      <div className="hidden lg:flex w-1/2 relative bg-slate-900 items-center justify-center overflow-hidden">
        {/* Abstract Background */}
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_bottom_left,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-900 to-slate-950"></div>
        <div className="absolute top-1/4 left-1/4 w-[400px] h-[400px] bg-teal-500/10 rounded-full blur-[100px]"></div>
        <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px]"></div>
        
        {/* Noise Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>

        {/* Content */}
        <div className="relative z-10 p-12 max-w-lg">
          <div className="mb-8 inline-flex items-center justify-center p-3 bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-xl">
             <Rocket className="w-8 h-8 text-emerald-400" />
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Level up your <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              real life character.
            </span>
          </h1>
          
          <p className="text-slate-400 text-lg mb-12 leading-relaxed">
            Stop dreaming about consistency. Start building it. Join the community of achievers today.
          </p>

          {/* Floating 'Achievement' Card */}
          <div className="bg-slate-800/40 backdrop-blur-xl border border-emerald-500/20 p-5 rounded-2xl shadow-2xl flex items-center gap-5 transform rotate-[2deg] hover:rotate-0 transition-all duration-500">
            <div className="bg-gradient-to-br from-yellow-400 to-amber-600 p-3 rounded-xl shadow-lg shadow-amber-500/20">
              <Trophy className="w-6 h-6 text-white" />
            </div>
            <div className="flex-1">
              <div className="flex justify-between items-center mb-1">
                <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">New Achievement</p>
                <span className="text-emerald-400 text-xs font-bold">+500 XP</span>
              </div>
              <div className="text-lg font-bold text-white">Early Adopter</div>
            </div>
            <div className="h-8 w-8 bg-emerald-500/20 rounded-full flex items-center justify-center border border-emerald-500/30">
              <CheckCircle className="w-4 h-4 text-emerald-400" />
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Form */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <div className="w-full max-w-md space-y-8">
          
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-white tracking-tight">Create an account</h2>
            <p className="mt-2 text-slate-400">Start your journey in seconds. No credit card required.</p>
          </div>

          <form onSubmit={handleSignUp} className="space-y-5">
            
            {/* Username */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <User className="h-5 w-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
              </div>
              <input
                type="text"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="block w-full pl-11 pr-4 py-4 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                placeholder="Username"
                required
              />
            </div>

            {/* Email */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
              </div>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="block w-full pl-11 pr-4 py-4 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                placeholder="Email address"
                required
              />
            </div>

            {/* Password */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
              </div>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="block w-full pl-11 pr-4 py-4 bg-slate-900 border border-slate-800 rounded-xl text-slate-200 placeholder-slate-600 focus:outline-none focus:ring-2 focus:ring-emerald-500/50 focus:border-emerald-500 transition-all"
                placeholder="Create password"
                required
              />
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-emerald-900/20 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-emerald-500 transition-all transform hover:scale-[1.01]"
            >
              {isLoading ? (
                "Creating Account..."
              ) : (
                <>
                  Get Started <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </form>

          {/* Social Divider */}
          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-950 text-slate-500">Or join with</span>
            </div>
          </div>

          {/* Social Buttons */}
          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center px-4 py-3 border border-slate-800 rounded-xl bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white transition-all">
              <Github className="h-5 w-5 mr-2" />
              <span className="font-semibold text-sm">GitHub</span>
            </button>
            
            <div className="flex items-center justify-center h-[50px] border border-slate-800 rounded-xl bg-slate-900 overflow-hidden hover:bg-slate-800 transition-all">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => toast.error("Signup Failed")}
                theme="filled_black"
                shape="rectangular"
                text="signup_with"
                size="medium"
                logo_alignment="left"
                width="200"
              />
            </div>
          </div>

          <p className="text-center text-sm text-slate-500">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
              Log in
            </Link>
          </p>
        </div>
        
        <div className="absolute bottom-6 left-0 right-0 text-center">
             <p className="text-xs text-slate-700">© 2026 Build Me. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default SignupPage;