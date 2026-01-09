/* eslint-disable @typescript-eslint/no-explicit-any */
import { Moon, Sun, Zap, Trophy, TrendingUp, Sparkles, Brain, ArrowUpRight, Activity } from 'lucide-react';

function SleepAnalysis(props: any) {
    // 1. SAFELY PARSE DATA
    let data: any = null;
    try {
        if (typeof props.analysis === 'string') {
            const cleaned = props.analysis.replace(/```json/g, '').replace(/```/g, '').trim();
            data = JSON.parse(cleaned);
        } else {
            data = props.analysis;
        }
    } catch (e) { console.error("Failed to parse", e); }

    // 2. LOADING STATE
    if (!data || !data.overview) {
        return (
            <div className="min-h-[400px] flex flex-col items-center justify-center bg-black/40 backdrop-blur-xl rounded-[2rem] border border-white/5">
                <div className="relative">
                    <div className="w-12 h-12 rounded-full border-t-2 border-r-2 border-indigo-500 animate-spin" />
                    <div className="absolute inset-0 w-12 h-12 rounded-full border-2 border-indigo-500/20" />
                </div>
                <p className="mt-4 text-sm font-medium text-white/40 tracking-widest uppercase">Synthesizing Neural Data...</p>
            </div>
        );
    }

    const { overview, consistency, strengths, improvements, tips } = data;
    const scoreVal = (consistency.averageScore * 50).toFixed(0);

    return (
        <div className="relative w-full overflow-hidden bg-black font-sans text-white selection:bg-indigo-500/30 rounded-[2.5rem] border border-white/5 shadow-2xl">
            
            {/* AMBIENT AURORA BACKGROUND */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[600px] h-[600px] bg-indigo-600/20 rounded-full blur-[120px] mix-blend-screen animate-pulse-slow" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-fuchsia-600/10 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            </div>

            <div className="relative z-10 p-6 md:p-10">
                
                {/* --- HEADER --- */}
                <div className="flex flex-col md:flex-row justify-between items-end mb-10 pb-8 border-b border-white/5">
                    <div className="space-y-2">
                        <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/5 border border-white/10 backdrop-blur-md">
                            <Brain className="w-3.5 h-3.5 text-indigo-400" />
                            <span className="text-[10px] font-medium tracking-widest text-white/60 uppercase">AI Analysis Protocol</span>
                        </div>
                        <h1 className="text-4xl md:text-5xl font-medium tracking-tight text-white">
                            Sleep Intelligence
                        </h1>
                        <p className="text-white/40 text-sm">Data analysis for {overview.bestDay}</p>
                    </div>

                    <div className="text-right mt-6 md:mt-0">
                        <div className="text-[10px] font-bold text-white/30 uppercase tracking-[0.2em] mb-1">Recovery Score</div>
                        <div className="relative inline-flex items-baseline">
                            <span className="text-7xl font-medium tracking-tighter text-transparent bg-clip-text bg-gradient-to-b from-white to-white/50">
                                {scoreVal}
                            </span>
                            <span className="text-2xl text-indigo-400 font-light ml-1">%</span>
                        </div>
                    </div>
                </div>

                {/* --- BENTO GRID --- */}
                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4">

                    {/* 1. METRICS ROW */}
                    <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                        
                        {/* Bedtime Card */}
                        <div className="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 rounded-3xl p-6 transition-all duration-500">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 rounded-xl bg-indigo-500/20 text-indigo-300"><Moon size={20} /></div>
                                <span className="text-[10px] font-medium text-white/30 uppercase tracking-widest">Target</span>
                            </div>
                            <div>
                                <div className="text-xs text-white/40 mb-1">Average Bedtime</div>
                                <div className="text-2xl font-medium text-white tracking-tight">{overview.averageSleepTime}</div>
                            </div>
                        </div>

                        {/* Wake Time Card */}
                        <div className="group relative bg-white/[0.03] hover:bg-white/[0.06] border border-white/5 rounded-3xl p-6 transition-all duration-500">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 rounded-xl bg-amber-500/20 text-amber-300"><Sun size={20} /></div>
                                <span className="text-[10px] font-medium text-white/30 uppercase tracking-widest">Target</span>
                            </div>
                            <div>
                                <div className="text-xs text-white/40 mb-1">Average Wake Up</div>
                                <div className="text-2xl font-medium text-white tracking-tight">{overview.averageWakeTime}</div>
                            </div>
                        </div>

                        {/* XP Card */}
                        <div className="relative bg-gradient-to-br from-indigo-900/40 to-purple-900/40 border border-indigo-500/20 rounded-3xl p-6">
                            <div className="flex justify-between items-start mb-4">
                                <div className="p-2 rounded-xl bg-indigo-400 text-black"><Trophy size={20} fill="currentColor" /></div>
                            </div>
                            <div>
                                <div className="text-xs text-indigo-200/60 mb-1">Total Experience</div>
                                <div className="text-2xl font-medium text-white tracking-tight">{overview.totalPoints} XP</div>
                            </div>
                        </div>
                    </div>

                    {/* 2. RHYTHM / CONSISTENCY (Vertical Pill) */}
                    <div className="md:col-span-3 lg:col-span-1 lg:row-span-2 bg-[#0a0a0a]/60 backdrop-blur-xl border border-white/5 rounded-3xl p-6 flex flex-col justify-between">
                        <div>
                            <div className="flex items-center gap-2 mb-6">
                                <Activity size={16} className="text-emerald-400" />
                                <h3 className="text-sm font-medium text-white/80 uppercase tracking-widest">Circadian Rhythm</h3>
                            </div>

                            <div className="space-y-6">
                                {/* Bedtime Bar */}
                                <div>
                                    <div className="flex justify-between text-xs mb-2">
                                        <span className="text-white/40">Sleep Consistency</span>
                                        <span className="font-mono text-white">{consistency.sleepWindowHits}/{consistency.totalLogs}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-to-r from-indigo-500 to-purple-500 shadow-[0_0_10px_rgba(99,102,241,0.5)]" 
                                            style={{ width: `${(consistency.sleepWindowHits / consistency.totalLogs) * 100}%` }} 
                                        />
                                    </div>
                                </div>

                                {/* Wake Bar */}
                                <div>
                                    <div className="flex justify-between text-xs mb-2">
                                        <span className="text-white/40">Wake Consistency</span>
                                        <span className="font-mono text-white">{consistency.wakeWindowHits}/{consistency.totalLogs}</span>
                                    </div>
                                    <div className="h-1.5 w-full bg-white/5 rounded-full overflow-hidden">
                                        <div 
                                            className="h-full bg-gradient-to-r from-amber-300 to-orange-500 shadow-[0_0_10px_rgba(251,191,36,0.5)]" 
                                            style={{ width: `${(consistency.wakeWindowHits / consistency.totalLogs) * 100}%` }} 
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="mt-8 pt-6 border-t border-white/5">
                            <div className="flex gap-3">
                                <TrendingUp className="w-8 h-8 text-white/20 shrink-0" />
                                <p className="text-xs text-white/40 leading-relaxed">
                                    Your biological clock is syncing. Consistent light exposure will further optimize deep sleep phases.
                                </p>
                            </div>
                        </div>
                    </div>

                    {/* 3. INSIGHTS GRID */}
                    <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4">
                        
                        {/* Strengths */}
                        <div className="bg-emerald-950/10 border border-emerald-500/10 rounded-3xl p-6 backdrop-blur-md">
                            <h3 className="text-emerald-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                <Zap size={14} /> Optimization Detected
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {strengths.map((item: string, i: number) => (
                                    <span key={i} className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-200 text-xs font-medium">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>

                        {/* Improvements */}
                        <div className="bg-rose-950/10 border border-rose-500/10 rounded-3xl p-6 backdrop-blur-md">
                            <h3 className="text-rose-400 text-xs font-bold uppercase tracking-widest mb-4 flex items-center gap-2">
                                <ArrowUpRight size={14} /> Optimization Required
                            </h3>
                            <div className="flex flex-wrap gap-2">
                                {improvements.map((item: string, i: number) => (
                                    <span key={i} className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-200 text-xs font-medium">
                                        {item}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* 4. AI COACH TERMINAL */}
                    <div className="md:col-span-3 lg:col-span-4 bg-[#0A0A0A] border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
                        {/* Terminal Gradient */}
                        <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-indigo-900/20 rounded-full blur-[80px] group-hover:bg-indigo-900/30 transition-colors" />
                        
                        <div className="relative z-10">
                            <h3 className="text-lg font-medium text-white mb-6 flex items-center gap-3">
                                <Sparkles className="w-5 h-5 text-indigo-400" /> 
                                AI Neural Recommendations
                            </h3>
                            
                            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                {tips.map((tip: string, i: number) => (
                                    <div key={i} className="bg-white/5 border border-white/5 p-5 rounded-2xl hover:bg-white/10 transition-colors cursor-default">
                                        <div className="text-indigo-400 text-xs font-mono mb-2">0{i + 1} // ADVICE</div>
                                        <p className="text-white/70 text-sm leading-relaxed font-light">
                                            "{tip}"
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>

                </div>
            </div>
            
            <style>{`
                .animate-pulse-slow {
                    animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </div>
    );
}

export default SleepAnalysis;