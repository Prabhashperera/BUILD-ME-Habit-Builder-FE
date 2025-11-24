/* eslint-disable @typescript-eslint/no-explicit-any */
import { Mail, Lock, User, Rocket, ArrowRight, Github, Star, Crown } from 'lucide-react';
import { Link, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { signupUser } from '../store/slices/authSlice';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';



const SignupPage = () => {
    const navigate = useNavigate();

    const dispatch = useDispatch<any>()
    const { isLoading, data, error } = useSelector((state: any) => state.auth)
    const [userName, setUserName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleSignUp = () => {
        dispatch(
            signupUser({
                userName,
                email,
                password
            })
        )
    }

    // After Successfull Signup redirect to login page
    useEffect(() => {
        if (data) {
            toast.success("Account created successfully!");
            navigate("/login")
        }
        if (error) {
            toast.error(error);
        }
    }, [data, error, navigate])



    // -------------------------------------
    return (
        <div className="min-h-screen bg-[#0B0F19] flex items-center justify-center p-4 relative overflow-hidden font-sans">


            {/* --- Cosmic Theme Background Glows (Violet/Pink) --- */}
            {/* Top Right Glow - Violet */}
            <div className="absolute top-0 right-0 w-96 h-96 bg-violet-600/20 rounded-full blur-3xl translate-x-1/3 -translate-y-1/4 mix-blend-screen animate-pulse-slow" />
            {/* Bottom Left Glow - Fuchsia */}
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-fuchsia-600/10 rounded-full blur-3xl -translate-x-1/4 translate-y-1/4 mix-blend-screen" />

            {/* Main Card Container */}
            <div className="relative w-full max-w-4xl bg-[#111827]/80 backdrop-blur-xl border border-violet-500/20 rounded-3xl shadow-[0_0_40px_-10px_rgba(139,92,246,0.3)] overflow-hidden grid lg:grid-cols-5">

                {/* --- Left Side Visuals (Mastery Context) --- */}
                <div className="hidden lg:flex lg:col-span-2 flex-col justify-center items-center p-12 bg-linear-to-br from-violet-900/40 via-[#0F172A]/90 to-fuchsia-900/40 relative overflow-hidden">
                    {/* Pattern Overlay - Stars/Dots */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/stardust.png')] opacity-20 mix-blend-overlay"></div>

                    <div className="relative z-10 text-center space-y-6">
                        {/* Icon - Rocket for Launch */}
                        <div className="inline-flex p-4 bg-violet-950/50 rounded-2xl border border-violet-500/30 backdrop-blur-md shadow-[0_0_20px_rgba(139,92,246,0.4)] mb-4">
                            <Rocket className="w-16 h-16 text-violet-300" />
                        </div>

                        <h2 className="text-3xl font-extrabold text-white tracking-tight">
                            Build Me<br /> <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-fuchsia-400">Make Habits</span>
                        </h2>

                        <p className="text-violet-200/60 text-sm max-w-xs mx-auto leading-relaxed">
                            Join the elite circle of achievers. Master your routine and reach legendary status.
                        </p>

                        {/* Gamified "Rank" Decoration Card */}
                        <div className="mt-10 p-4 bg-[#0B0F19]/80 rounded-xl border border-fuchsia-500/20 w-full max-w-[220px] shadow-xl transform hover:scale-105 transition-transform cursor-default text-left">
                            <div className="flex justify-between items-center mb-3">
                                <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Current Rank</span>
                                <Crown className="w-4 h-4 text-amber-400" />
                            </div>
                            <div className="flex items-center gap-3 mb-3">
                                <div className="w-10 h-10 rounded-full bg-linear-to-tr from-violet-500 to-fuchsia-500 flex items-center justify-center text-white font-bold text-lg shadow-lg">
                                    1
                                </div>
                                <div>
                                    <div className="text-sm font-bold text-white">Habits</div>
                                    <div className="text-[10px] text-fuchsia-400">0 / 500 XP</div>
                                </div>
                            </div>
                            {/* Fake XP Bar */}
                            <div className="w-full bg-slate-800 rounded-full h-1.5 overflow-hidden">
                                <div className="bg-linear-to-r from-violet-500 to-fuchsia-400 h-1.5 w-[15%] shadow-[0_0_10px_rgba(232,121,249,0.5)]"></div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Right Side Form --- */}
                <div className="p-8 md:p-12 lg:col-span-3 flex flex-col justify-center relative">

                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                            <Star className="w-6 h-6 text-fuchsia-500 fill-fuchsia-500" />
                            New Player
                        </h3>
                        <p className="text-slate-400 text-sm">Design your avatar's future today.</p>
                    </div>

                    {/* The Form */}
                    <form className="space-y-4">

                        {/* Username Input */}
                        <div className="group">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 group-focus-within:text-fuchsia-400 transition-colors">
                                Username
                            </label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-fuchsia-400 transition-colors" />
                                <input
                                    type="text"
                                    placeholder="MasterMind"
                                    className="w-full bg-[#0B0F19]/50 border border-slate-700 text-white rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all placeholder-slate-600"
                                    autoComplete="off"
                                    value={userName}
                                    onChange={(e) => setUserName(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Email Input */}
                        <div className="group">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 group-focus-within:text-fuchsia-400 transition-colors">
                                Email Address
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-fuchsia-400 transition-colors" />
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full bg-[#0B0F19]/50 border border-slate-700 text-white rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all placeholder-slate-600"
                                    autoComplete="off"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="group">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 group-focus-within:text-fuchsia-400 transition-colors">
                                Password
                            </label>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-fuchsia-400 transition-colors" />
                                <input
                                    type="password"
                                    placeholder="Create a strong password"
                                    className="w-full bg-[#0B0F19]/50 border border-slate-700 text-white rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-fuchsia-500 focus:ring-1 focus:ring-fuchsia-500 transition-all placeholder-slate-600"
                                    value={password}
                                    onChange={(e) => setPassword(e.target.value)}
                                />
                            </div>
                        </div>

                        {/* Action Button - Violet to Pink Gradient */}
                        {/* <Link to={"/login"}> */}
                        <button onClick={handleSignUp} disabled={isLoading} type="button" className="w-full bg-linear-to-r from-violet-600 to-fuchsia-600 hover:from-violet-500 hover:to-fuchsia-500 text-white font-bold py-4 rounded-lg shadow-[0_0_20px_-5px_rgba(192,38,211,0.4)] transform transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group uppercase tracking-wider text-sm mt-7 cursor-pointer">
                            <span>Initialize Account</span>
                            <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                        {/* </Link> */}
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-800"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase tracking-wider">
                            <span className="px-4 bg-[#111827] text-slate-500">Or connect with</span>
                        </div>
                    </div>

                    {/* Social Login */}
                    <div className="grid grid-cols-2 gap-4">
                        <button className="flex items-center justify-center gap-2 p-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-lg text-slate-300 transition-all group cursor-pointer">
                            <Github className="w-5 h-5 group-hover:text-white transition-colors" />
                            <span className="text-sm font-semibold">Github</span>
                        </button>
                        <button className="flex items-center justify-center gap-2 p-3 bg-slate-800/50 hover:bg-slate-800 border border-slate-700 hover:border-slate-600 rounded-lg text-slate-300 transition-all group cursor-pointer">
                            <Mail className="w-5 h-5 text-sky-500/70 group-hover:text-sky-400 transition-colors" />
                            <span className="text-sm font-semibold">Google</span>
                        </button>
                    </div>

                    {/* Footer Link */}
                    <Link to={'/login'} >
                        <p className="mt-6 text-center text-slate-500 text-sm">
                            Already initialized? <span className="text-fuchsia-400 hover:text-fuchsia-300 font-bold hover:underline transition-colors">Login Account</span>
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;