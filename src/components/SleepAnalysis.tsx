/* eslint-disable @typescript-eslint/no-explicit-any */
import { Moon, Sun, Zap, Trophy, TrendingUp, Sparkles, Brain, ArrowUpRight } from 'lucide-react';

function SleepAnalysis(props: any) {
    // 1. SAFELY PARSE DATA (Keeping the fix from before)
    let data: any = null;
    try {
        if (typeof props.analysis === 'string') {
            const cleaned = props.analysis
                .replace(/```json/g, '')
                .replace(/```/g, '')
                .trim();
            data = JSON.parse(cleaned);
        } else {
            data = props.analysis;
        }
    } catch (e) {
        console.error("Failed to parse sleep analysis data", e);
    }

    // 2. LOADING STATE
    if (!data || !data.overview) {
        return (
            <div className="min-h-[400px] flex items-center justify-center text-violet-300 animate-pulse bg-slate-950 rounded-3xl">
                <Sparkles className="animate-spin mr-2" /> Syncing Neural Sleep Data...
            </div>
        );
    }

    const { overview, consistency, strengths, improvements, tips } = data;

    // Helper for calculation
    const scoreVal = (consistency.averageScore * 50).toFixed(0);

    return (
        <div className="w-full max-w-6xl mx-auto p-4 sm:p-8 bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-slate-900 via-purple-900 to-slate-900 min-h-screen text-white rounded-3xl shadow-2xl overflow-hidden font-sans">
            
            {/* TOP HEADER */}
            <div className="flex flex-col md:flex-row justify-between items-end mb-8 border-b border-white/10 pb-6">
                <div>
                    <h1 className="text-4xl md:text-5xl font-bold tracking-tight mb-2 bg-gradient-to-r from-white to-purple-200 bg-clip-text text-transparent">
                        Sleep <span className="font-thin">Sync</span>
                    </h1>
                    <p className="text-purple-200/60 font-medium flex items-center gap-2">
                        <Brain size={16} /> AI Analysis for {overview.bestDay}
                    </p>
                </div>
                <div className="text-right mt-4 md:mt-0">
                    <div className="text-sm text-purple-200/50 uppercase tracking-widest font-semibold">Your Score</div>
                    <div className="text-6xl font-black text-white flex items-start justify-end leading-none">
                        {scoreVal}
                        <span className="text-2xl text-purple-400 mt-2">%</span>
                    </div>
                </div>
            </div>

            {/* BENTO GRID LAYOUT */}
            <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-4 gap-4 md:gap-6">
                
                {/* 1. KEY METRICS ROW */}
                <div className="md:col-span-3 grid grid-cols-1 sm:grid-cols-3 gap-4">
                    {/* Sleep Time */}
                    <div className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-md transition-all hover:bg-white/10">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Moon size={64} />
                        </div>
                        <p className="text-purple-200/50 text-xs font-bold uppercase tracking-wider mb-1">AVG Bedtime</p>
                        <h3 className="text-3xl font-bold text-white">{overview.averageSleepTime}</h3>
                    </div>

                    {/* Wake Time */}
                    <div className="group relative overflow-hidden rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-md transition-all hover:bg-white/10">
                        <div className="absolute top-0 right-0 p-4 opacity-10 group-hover:opacity-20 transition-opacity">
                            <Sun size={64} />
                        </div>
                        <p className="text-purple-200/50 text-xs font-bold uppercase tracking-wider mb-1">AVG Wake time</p>
                        <h3 className="text-3xl font-bold text-white">{overview.averageWakeTime}</h3>
                    </div>

                    {/* XP Points */}
                    <div className="group relative overflow-hidden rounded-3xl bg-gradient-to-br from-purple-600/80 to-blue-600/80 border border-white/20 p-6 backdrop-blur-md shadow-lg shadow-purple-900/50">
                        <div className="absolute top-0 right-0 p-4 text-white opacity-20">
                            <Trophy size={64} />
                        </div>
                        <p className="text-white/70 text-xs font-bold uppercase tracking-wider mb-1">XP Gained</p>
                        <h3 className="text-3xl font-bold text-white flex items-center gap-2">
                            {overview.totalPoints} <span className="text-sm opacity-60 font-normal">pts</span>
                        </h3>
                    </div>
                </div>

                {/* 2. CONSISTENCY PILLS (Right Column on large screens) */}
                <div className="md:col-span-3 lg:col-span-1 lg:row-span-2 rounded-3xl bg-white/5 border border-white/10 p-6 backdrop-blur-md flex flex-col justify-center gap-6">
                    <h3 className="text-lg font-semibold flex items-center gap-2 text-purple-100">
                        <TrendingUp size={18} className="text-purple-400" /> Rhythm
                    </h3>
                    
                    {/* Sleep Window Circular-ish Indicator */}
                    <div>
                        <div className="flex justify-between text-sm mb-2 text-purple-200/70">
                            <span>Bedtime Goal</span>
                            <span className="text-white font-mono">{consistency.sleepWindowHits}/{consistency.totalLogs}</span>
                        </div>
                        <div className="h-3 w-full bg-slate-900/50 rounded-full overflow-hidden p-[2px]">
                            <div 
                                className="h-full bg-gradient-to-r from-purple-500 to-indigo-400 rounded-full shadow-[0_0_10px_rgba(168,85,247,0.5)]" 
                                style={{ width: `${(consistency.sleepWindowHits / consistency.totalLogs) * 100}%` }} 
                            />
                        </div>
                    </div>

                    {/* Wake Window Indicator */}
                    <div>
                        <div className="flex justify-between text-sm mb-2 text-purple-200/70">
                            <span>Wake Goal</span>
                            <span className="text-white font-mono">{consistency.wakeWindowHits}/{consistency.totalLogs}</span>
                        </div>
                        <div className="h-3 w-full bg-slate-900/50 rounded-full overflow-hidden p-[2px]">
                            <div 
                                className="h-full bg-gradient-to-r from-amber-200 to-amber-500 rounded-full shadow-[0_0_10px_rgba(251,191,36,0.5)]" 
                                style={{ width: `${(consistency.wakeWindowHits / consistency.totalLogs) * 100}%` }} 
                            />
                        </div>
                    </div>

                    <div className="mt-auto pt-6 border-t border-white/5">
                        <p className="text-xs text-purple-200/40 text-center leading-relaxed">
                            Consistent timing regulates your circadian rhythm, improving deep sleep cycles.
                        </p>
                    </div>
                </div>

                {/* 3. INSIGHTS GRID */}
                <div className="md:col-span-3 grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
                    {/* Strengths */}
                    <div className="rounded-3xl bg-emerald-900/20 border border-emerald-500/20 p-6 backdrop-blur-sm">
                        <h3 className="text-emerald-300 font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                            <Zap size={16} /> Superpowers
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {strengths.map((item: string, i: number) => (
                                <span key={i} className="px-3 py-1.5 rounded-lg bg-emerald-500/10 border border-emerald-500/20 text-emerald-100 text-sm">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Improvements */}
                    <div className="rounded-3xl bg-rose-900/20 border border-rose-500/20 p-6 backdrop-blur-sm">
                        <h3 className="text-rose-300 font-bold mb-4 flex items-center gap-2 text-sm uppercase tracking-wider">
                            <ArrowUpRight size={16} /> Level Up Needed
                        </h3>
                        <div className="flex flex-wrap gap-2">
                            {improvements.map((item: string, i: number) => (
                                <span key={i} className="px-3 py-1.5 rounded-lg bg-rose-500/10 border border-rose-500/20 text-rose-100 text-sm">
                                    {item}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>

                {/* 4. AI COACH TIPS */}
                <div className="md:col-span-3 lg:col-span-4 rounded-3xl bg-gradient-to-r from-indigo-900/40 to-purple-900/40 border border-indigo-500/30 p-6 md:p-8 backdrop-blur-md">
                    <h3 className="text-xl font-bold text-white mb-6 flex items-center gap-2">
                        <Sparkles className="text-yellow-300" /> AI Coach Recommendations
                    </h3>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                        {tips.map((tip: string, i: number) => (
                            <div key={i} className="bg-slate-900/40 border border-white/5 p-4 rounded-2xl text-purple-100/90 text-sm leading-relaxed hover:bg-slate-900/60 transition-colors">
                                "{tip}"
                            </div>
                        ))}
                    </div>
                </div>

            </div>
        </div>
    );
}

export default SleepAnalysis;