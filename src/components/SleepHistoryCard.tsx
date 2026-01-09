import { Calendar, Sparkles, Zap, ArrowRight } from "lucide-react";

// Types for your data
interface LogEntry {
    id: string | number;
    date: string;
    sleptAt: string;
    wokeAt: string;
    pointsAwarded: number;
    aiAdvice: string;
}

const SleepHistoryCard = ({ log }: { log: LogEntry }) => {
    return (
        <div className="group relative w-full h-full">
            {/* Ambient Hover Glow */}
            <div className="absolute -inset-0.5 bg-gradient-to-r from-indigo-500/20 to-fuchsia-500/20 rounded-[1.7rem] blur opacity-0 group-hover:opacity-100 transition duration-500" />
            
            {/* Glass Container */}
            <div className="relative h-full bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/5 rounded-3xl p-6 transition-all duration-300 hover:bg-[#0a0a0a]/90 flex flex-col justify-between">
                
                {/* --- Top Row: Date & XP Chip --- */}
                <div className="flex justify-between items-start mb-6">
                    <div className="flex items-center gap-2 text-white/40">
                        <Calendar className="w-3.5 h-3.5" />
                        <span className="text-xs font-medium font-mono tracking-wide">{log.date.split("T")[0]}</span>
                    </div>

                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-indigo-500/10 border border-indigo-500/20 shadow-[0_0_10px_rgba(99,102,241,0.1)]">
                        <Zap className="w-3 h-3 text-indigo-400 fill-indigo-400" />
                        <span className="text-[10px] font-bold text-indigo-200 tracking-wider">
                            +{log.pointsAwarded} XP
                        </span>
                    </div>
                </div>

                {/* --- Middle Row: Timeline Visualization --- */}
                <div className="flex items-center justify-between gap-4 mb-6">
                    <div>
                        <span className="block text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Bedtime</span>
                        <span className="text-xl font-medium text-white tracking-tight">{log.sleptAt}</span>
                    </div>

                    {/* Timeline Line */}
                    <div className="flex-1 h-px bg-gradient-to-r from-transparent via-white/20 to-transparent relative">
                        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 p-1.5 rounded-full bg-[#0a0a0a] border border-white/10">
                            <ArrowRight className="w-3 h-3 text-white/40" />
                        </div>
                    </div>

                    <div className="text-right">
                        <span className="block text-[10px] font-bold text-white/20 uppercase tracking-widest mb-1">Wake Up</span>
                        <span className="text-xl font-medium text-white tracking-tight">{log.wokeAt}</span>
                    </div>
                </div>

                {/* --- Bottom Row: AI Insight --- */}
                <div className="relative mt-auto">
                    <div className="p-4 rounded-2xl bg-white/[0.03] border border-white/5 group-hover:border-white/10 transition-colors">
                        <div className="flex gap-3 items-start">
                            <Sparkles className="w-4 h-4 text-indigo-400 shrink-0 mt-0.5 animate-pulse-slow" />
                            <p className="text-sm text-white/60 font-light leading-relaxed line-clamp-3">
                                {log.aiAdvice}
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </div>
    );
};

export default SleepHistoryCard;