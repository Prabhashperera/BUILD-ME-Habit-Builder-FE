import { Mail, Lock, Sprout, ChevronRight, Github, TrendingUp, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

const LoginPage = () => {
    // UI Only - No Logic
    return (
        <div className="min-h-screen bg-slate-950 flex items-center justify-center p-4 relative overflow-hidden font-sans">

            {/* --- Growth Theme Background Glows (Green/Teal) --- */}
            {/* Top Left Glow - Emerald */}
            <div className="absolute top-0 left-0 w-96 h-96 bg-emerald-500/20 rounded-full blur-3xl -translate-x-1/4 -translate-y-1/4 mix-blend-screen animate-pulse-slow" />
            {/* Bottom Right Glow - Lime/Teal */}
            <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-teal-500/10 rounded-full blur-3xl translate-x-1/4 translate-y-1/4 mix-blend-screen" />

            {/* Main Card Container */}
            <div className="relative w-full max-w-4xl bg-slate-900/80 backdrop-blur-xl border border-emerald-500/20 rounded-3xl shadow-[0_0_40px_-10px_rgba(16,185,129,0.3)] overflow-hidden grid lg:grid-cols-5">

                {/* --- Left Side Visuals (Habit/Growth Context) --- */}
                <div className="hidden lg:flex lg:col-span-2 flex-col justify-center items-center p-12 bg-gradient-to-br from-emerald-900/40 via-slate-900/80 to-teal-900/40 relative overflow-hidden">
                    {/* Pattern Overlay */}
                    <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/diagmonds-light.png')] opacity-10 mix-blend-overlay"></div>

                    <div className="relative z-10 text-center space-y-6">
                        {/* Icon - Sprout for Growth */}
                        <div className="inline-flex p-4 bg-emerald-950/40 rounded-2xl border border-emerald-500/30 backdrop-blur-md shadow-[0_0_15px_rgba(16,185,129,0.2)] mb-4">
                            <Sprout className="w-16 h-16 text-emerald-400" />
                        </div>

                        <h2 className="text-3xl font-extrabold text-white tracking-tight">
                            Keep The <br /> <span className="text-emerald-400">Streak Alive</span>
                        </h2>

                        <p className="text-emerald-100/60 text-sm max-w-xs mx-auto leading-relaxed">
                            Consistency is the key. Log in to track your daily wins and evolve your avatar.
                        </p>

                        {/* Gamified "Streak" Decoration Card */}
                        <div className="mt-10 p-3 bg-slate-950/60 rounded-xl border border-emerald-500/20 w-full max-w-[220px] flex items-center gap-4 shadow-lg transform hover:scale-105 transition-transform cursor-default">
                            <div className="bg-gradient-to-br from-orange-500 to-red-500 p-2.5 rounded-lg shadow-orange-500/20 shadow-lg">
                                <Zap className="w-5 h-5 text-white fill-white" />
                            </div>
                            <div className="text-left">
                                <div className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Current Streak</div>
                                <div className="text-lg font-mono text-white font-bold leading-none mt-1">
                                    12 Days <span className="text-emerald-500 text-xs ml-1">▲</span>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* --- Right Side Form --- */}
                <div className="p-8 md:p-12 lg:col-span-3 flex flex-col justify-center relative">

                    <div className="mb-8">
                        <h3 className="text-2xl font-bold text-white mb-2 flex items-center gap-2">
                            <TrendingUp className="w-6 h-6 text-emerald-500" />
                            Member Login
                        </h3>
                        <p className="text-slate-400 text-sm">Focus on the process. Trust the result.</p>
                    </div>

                    {/* The Form */}
                    <form className="space-y-5">

                        {/* Email Input */}
                        <div className="group">
                            <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider mb-2 group-focus-within:text-emerald-400 transition-colors">
                                Email
                            </label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                                <input
                                    type="email"
                                    placeholder="achiever@habitapp.com"
                                    className="w-full bg-slate-950/50 border border-slate-700 text-white rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-slate-600"
                                    autoComplete="off"
                                />
                            </div>
                        </div>

                        {/* Password Input */}
                        <div className="group">
                            <div className="flex justify-between items-center mb-2">
                                <label className="block text-xs font-bold text-slate-400 uppercase tracking-wider group-focus-within:text-emerald-400 transition-colors">
                                    Password
                                </label>
                                <a href="#" className="text-xs text-slate-500 hover:text-emerald-400 transition-colors">Forgot password?</a>
                            </div>
                            <div className="relative">
                                <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-slate-500 group-focus-within:text-emerald-400 transition-colors" />
                                <input
                                    type="password"
                                    placeholder="••••••••"
                                    className="w-full bg-slate-950/50 border border-slate-700 text-white rounded-lg py-3 pl-12 pr-4 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition-all placeholder-slate-600"
                                />
                            </div>
                        </div>

                        {/* Action Button - Green Gradient for "Go/Growth" */}
                        <button type="button" className="w-full bg-linear-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-bold py-4 rounded-lg shadow-[0_0_20px_-5px_rgba(16,185,129,0.4)] transform transition-all hover:scale-[1.02] active:scale-[0.98] flex items-center justify-center gap-2 group uppercase tracking-wider text-sm cursor-pointer">
                            <span>Log Workout / Habit</span>
                            <ChevronRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                        </button>
                    </form>

                    {/* Divider */}
                    <div className="relative my-6">
                        <div className="absolute inset-0 flex items-center">
                            <div className="w-full border-t border-slate-800"></div>
                        </div>
                        <div className="relative flex justify-center text-xs uppercase tracking-wider">
                            <span className="px-4 bg-slate-900 text-slate-500">Login with</span>
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
                    <Link to={"/signup"} >
                        <p className="mt-8 text-center text-slate-500 text-sm">
                            Ready to start growing? <a href="#" className="text-emerald-400 hover:text-emerald-300 font-bold hover:underline transition-colors">Start your journey</a>
                        </p>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default LoginPage;