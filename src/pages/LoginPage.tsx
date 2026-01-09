/* eslint-disable @typescript-eslint/no-explicit-any */
import { Mail, Lock, ArrowRight, Github, Sparkles, Zap } from "lucide-react";
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

    useEffect(() => { dispatch(reset()); }, [dispatch]);

    const handleLogin = async (e: any) => {
        e.preventDefault();
        try {
            const result = await dispatch(loginUser({ email, password })).unwrap();
            if (result?.data?.accessToken) {
                toast.success("Welcome back!");
                localStorage.setItem("accessToken", result.data.accessToken);
                localStorage.setItem("refreshToken", result.data.refreshToken);
                localStorage.setItem("email", result.data.email);
                navigate("/habits");
            }
        } catch (err: any) { console.error("Login failed:", err); }
    };

    useEffect(() => { if (error) { toast.error(error); dispatch(reset()); } }, [error, dispatch]);

    const handleGoogleLogin = async (credentialResponse: any) => {
        try {
            const token = credentialResponse.credential;
            const res = await api.post("/auth/google", { token });
            toast.success("Logged in with Google");
            localStorage.setItem("accessToken", res.data.accessToken);
            localStorage.setItem("refreshToken", res.data.refreshToken);
            localStorage.setItem("email", res.data.email);
            navigate("/habits");
        } catch (err) { console.error(err); toast.error("Google login failed"); }
    };

    return (
        <div className="min-h-screen w-full flex bg-black font-sans selection:bg-indigo-500/30 overflow-hidden">
            
            {/* LEFT SIDE: Immersive Visuals */}
            <div className="hidden lg:flex w-1/2 relative items-center justify-center overflow-hidden bg-[#050505]">
                <div className="absolute top-[-20%] left-[-20%] w-[80%] h-[80%] bg-indigo-600/20 rounded-full blur-[150px] animate-pulse-slow" />
                <div className="absolute bottom-[-20%] right-[-20%] w-[80%] h-[80%] bg-fuchsia-600/10 rounded-full blur-[150px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />

                <div className="relative z-10 max-w-lg p-12">
                    <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md mb-8 shadow-2xl">
                        <Sparkles className="w-4 h-4 text-indigo-400" />
                        <span className="text-xs font-medium tracking-widest text-white/80 uppercase">System Access</span>
                    </div>
                    
                    <h1 className="text-6xl font-medium text-white mb-6 tracking-tight leading-tight">
                        Optimize your <br />
                        <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-300 to-white">daily protocol.</span>
                    </h1>
                    
                    <p className="text-lg text-white/40 mb-12 leading-relaxed font-light">
                        Track, analyze, and refine your habits with neural-engine precision.
                    </p>

                    {/* Feature Card */}
                    <div className="group relative bg-white/5 border border-white/10 p-6 rounded-3xl backdrop-blur-xl hover:bg-white/10 transition-colors duration-500">
                        <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-fuchsia-500/20 rounded-3xl blur opacity-0 group-hover:opacity-100 transition duration-500" />
                        <div className="relative flex items-center gap-5">
                            <div className="p-3.5 rounded-2xl bg-indigo-500/20 text-indigo-300">
                                <Zap className="w-6 h-6" />
                            </div>
                            <div>
                                <div className="text-xs font-bold text-white/30 uppercase tracking-widest mb-1">Current Streak</div>
                                <div className="text-2xl font-medium text-white">12 Days <span className="text-sm text-emerald-400 ml-2 font-normal">+24%</span></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            {/* RIGHT SIDE: Auth Form */}
            <div className="w-full lg:w-1/2 flex items-center justify-center p-8 relative bg-black">
                <div className="w-full max-w-md space-y-10">
                    
                    <div className="text-center lg:text-left space-y-2">
                        <h2 className="text-3xl font-medium text-white tracking-tight">Welcome back</h2>
                        <p className="text-white/40 text-sm">Enter your credentials to access the terminal.</p>
                    </div>

                    <form onSubmit={handleLogin} className="space-y-6">
                        <div className="space-y-5">
                            {/* Email */}
                            <div className="group space-y-2">
                                <label className="text-xs font-medium text-white/40 uppercase tracking-wide ml-1">Email Address</label>
                                <div className="relative">
                                    <Mail className="absolute left-4 top-3.5 h-5 w-5 text-white/20 group-focus-within:text-white transition-colors" />
                                    <input
                                        type="email"
                                        value={email}
                                        onChange={(e) => setEmail(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all font-sans"
                                        placeholder="name@example.com"
                                        required
                                    />
                                </div>
                            </div>

                            {/* Password */}
                            <div className="group space-y-2">
                                <label className="text-xs font-medium text-white/40 uppercase tracking-wide ml-1">Password</label>
                                <div className="relative">
                                    <Lock className="absolute left-4 top-3.5 h-5 w-5 text-white/20 group-focus-within:text-white transition-colors" />
                                    <input
                                        type="password"
                                        value={password}
                                        onChange={(e) => setPassword(e.target.value)}
                                        className="w-full bg-white/5 border border-white/10 rounded-xl py-3 pl-12 pr-4 text-white placeholder-white/20 focus:outline-none focus:bg-white/10 focus:border-white/20 transition-all font-sans"
                                        placeholder="••••••••"
                                        required
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex items-center justify-between pt-2">
                            <label className="flex items-center cursor-pointer group">
                                <input type="checkbox" className="w-4 h-4 rounded border-white/10 bg-white/5 text-indigo-500 focus:ring-offset-black focus:ring-indigo-500 transition-colors" />
                                <span className="ml-2 text-sm text-white/40 group-hover:text-white/60 transition-colors">Remember me</span>
                            </label>
                            <a href="#" className="text-sm font-medium text-indigo-400 hover:text-indigo-300 transition-colors">
                                Forgot password?
                            </a>
                        </div>

                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full group relative overflow-hidden bg-white text-black py-3.5 rounded-xl font-medium text-sm transition-all hover:bg-white/90 active:scale-[0.98] disabled:opacity-50 disabled:cursor-not-allowed"
                        >
                            <span className="relative z-10 flex items-center justify-center gap-2">
                                {isLoading ? "Authenticating..." : <>Sign In <ArrowRight className="w-4 h-4 group-hover:translate-x-0.5 transition-transform" /></>}
                            </span>
                        </button>
                    </form>

                    <div className="relative">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-white/10"></div>
                        </div>
                        <div className="relative flex justify-center">
                            <span className="px-4 bg-black text-xs text-white/20 uppercase tracking-widest">Or continue with</span>
                        </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center px-4 py-3 border border-white/10 rounded-xl bg-white/5 text-white/60 hover:bg-white/10 hover:text-white hover:border-white/20 transition-all gap-2">
                            <Github className="h-5 w-5" />
                            <span className="text-sm font-medium">GitHub</span>
                        </button>
                        
                        <div className="flex items-center justify-center h-[48px] border border-white/10 rounded-xl bg-white/5 overflow-hidden hover:bg-white/10 hover:border-white/20 transition-all relative">
                            <div className="opacity-0 absolute inset-0 z-20 pointer-events-none" /> {/* Overlay for style consistency if needed */}
                            <GoogleLogin
                                onSuccess={handleGoogleLogin}
                                onError={() => toast.error("Login Failed")}
                                theme="filled_black"
                                shape="rectangular"
                                text="signin_with"
                                size="large"
                                width="100%"
                                // locale="en"
                            />
                        </div>
                    </div>

                    <p className="text-center text-sm text-white/40">
                        Don't have an account?{" "}
                        <Link to="/signup" className="font-medium text-white hover:underline decoration-white/30 underline-offset-4 transition-all">
                            Create an account
                        </Link>
                    </p>
                </div>
            </div>
            
            <style>{`
                .animate-pulse-slow {
                    animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </div>
    );
};

export default LoginPage;