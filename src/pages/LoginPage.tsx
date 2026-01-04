/* eslint-disable @typescript-eslint/no-explicit-any */
import {
  Mail,
  Lock,
  Sprout,
  ArrowRight,
  Github,
  Zap,
} from "lucide-react";
import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { loginUser, reset } from "../store/slices/authSlice";
import { toast } from "react-toastify";
import { GoogleLogin } from "@react-oauth/google";
import api from "../api/axiosConfig";

const LoginPage = () => {
  const dispatch = useDispatch<any>();
  const { isLoading, error } = useSelector((state: any) => state.auth);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(reset());
  }, [dispatch]);

  const handleLogin = async (e: any) => {
    e.preventDefault();
    try {
      const result = await dispatch(
        loginUser({ email, password })
      ).unwrap();

      if (result && result.data && result.data.accessToken) {
        toast.success("Welcome back!");
        localStorage.setItem("accessToken", result.data.accessToken);
        localStorage.setItem("refreshToken", result.data.refreshToken);
        localStorage.setItem("email", result.data.email);
        navigate("/habits");
      }
    } catch (err: any) {
      console.error("Login failed:", err);
    }
  };

  useEffect(() => {
    if (error) {
      toast.error(error);
      dispatch(reset());
    }
  }, [error, dispatch]);

  const handleGoogleLogin = async (credentialResponse: any) => {
    try {
      const token = credentialResponse.credential;
      const res = await api.post("/auth/google", { token });
      toast.success("Logged in with Google");
      localStorage.setItem("accessToken", res.data.accessToken);
      localStorage.setItem("refreshToken", res.data.refreshToken);
      localStorage.setItem("email", res.data.email);
      navigate("/habits");
    } catch (err) {
      console.error(err);
      toast.error("Google login failed");
    }
  };

  return (
    <div className="min-h-screen w-full flex bg-slate-950 font-sans selection:bg-emerald-500/30">
      
      {/* LEFT SIDE: Visuals (Full Height) */}
      <div className="hidden lg:flex w-1/2 relative bg-slate-900 items-center justify-center overflow-hidden">
        {/* Abstract Background Elements */}
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top_left,_var(--tw-gradient-stops))] from-emerald-900/20 via-slate-900 to-slate-950"></div>
        <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-emerald-500/10 rounded-full blur-[100px] -translate-y-1/2 translate-x-1/2"></div>
        <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-[100px] translate-y-1/2 -translate-x-1/2"></div>
        
        {/* Grid Pattern Overlay */}
        <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-soft-light"></div>

        {/* Content Container */}
        <div className="relative z-10 p-12 max-w-lg">
          <div className="mb-8 inline-flex items-center justify-center p-3 bg-slate-800/50 backdrop-blur-md rounded-2xl border border-slate-700/50 shadow-xl">
             <Sprout className="w-8 h-8 text-emerald-400" />
          </div>
          
          <h1 className="text-5xl font-bold text-white mb-6 leading-tight">
            Build habits that <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-400">
              actually stick.
            </span>
          </h1>
          
          <p className="text-slate-400 text-lg mb-12 leading-relaxed">
            Join thousands of achievers who are transforming their daily routines into powerful streaks.
          </p>

          {/* Floating 'Streak' Card */}
          <div className="bg-slate-800/40 backdrop-blur-xl border border-emerald-500/20 p-5 rounded-2xl shadow-2xl flex items-center gap-5 transform rotate-[-2deg] hover:rotate-0 transition-all duration-500">
            <div className="bg-gradient-to-br from-orange-500 to-red-600 p-3 rounded-xl shadow-lg shadow-orange-500/20">
              <Zap className="w-6 h-6 text-white" />
            </div>
            <div>
              <p className="text-xs text-slate-400 uppercase tracking-widest font-bold">Current Streak</p>
              <div className="text-2xl font-bold text-white flex items-center gap-2">
                12 Days 
                <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold border border-emerald-500/20">Top 5%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* RIGHT SIDE: Form (Full Height, Centered) */}
      <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative">
        <div className="w-full max-w-md space-y-8">
          
          <div className="text-center lg:text-left">
            <h2 className="text-3xl font-bold text-white tracking-tight">Welcome back</h2>
            <p className="mt-2 text-slate-400">Enter your details to access your dashboard.</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            
            <div className="space-y-4">
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
                  placeholder="Password"
                  required
                />
              </div>
            </div>

            <div className="flex items-center justify-between">
              <label className="flex items-center">
                <input type="checkbox" className="w-4 h-4 rounded border-slate-700 text-emerald-500 focus:ring-emerald-500 bg-slate-900" />
                <span className="ml-2 text-sm text-slate-400">Remember me</span>
              </label>
              <a href="#" className="text-sm font-medium text-emerald-400 hover:text-emerald-300 transition-colors">
                Forgot password?
              </a>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full flex items-center justify-center py-4 px-4 border border-transparent rounded-xl shadow-lg shadow-emerald-900/20 text-sm font-bold text-white bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-slate-900 focus:ring-emerald-500 transition-all transform hover:scale-[1.01]"
            >
              {isLoading ? (
                "Signing in..."
              ) : (
                <>
                  Sign In <ArrowRight className="ml-2 h-5 w-5" />
                </>
              )}
            </button>
          </form>

          <div className="relative">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-slate-800"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-4 bg-slate-950 text-slate-500">Or continue with</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <button className="flex items-center justify-center px-4 py-3 border border-slate-800 rounded-xl bg-slate-900 text-slate-300 hover:bg-slate-800 hover:text-white transition-all">
              <Github className="h-5 w-5 mr-2" />
              <span className="font-semibold text-sm">GitHub</span>
            </button>
            
            <div className="flex items-center justify-center h-[50px] border border-slate-800 rounded-xl bg-slate-900 overflow-hidden hover:bg-slate-800 transition-all">
              <GoogleLogin
                onSuccess={handleGoogleLogin}
                onError={() => toast.error("Login Failed")}
                theme="filled_black"
                shape="rectangular"
                text="signin_with"
                size="medium"
                logo_alignment="left"
                width="200" // Adjust based on your preference, or use CSS to force fit
              />
            </div>
          </div>

          <p className="text-center text-sm text-slate-500">
            Don't have an account?{" "}
            <Link to="/signup" className="font-bold text-emerald-400 hover:text-emerald-300 transition-colors">
              Sign up for free
            </Link>
          </p>
        </div>
        
        {/* Mobile footer area */}
        <div className="absolute bottom-6 left-0 right-0 text-center">
             <p className="text-xs text-slate-700">© 2026 Build Me. All rights reserved.</p>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;