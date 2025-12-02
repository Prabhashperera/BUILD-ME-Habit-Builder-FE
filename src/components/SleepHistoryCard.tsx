import { Calendar, Sparkles, Zap, Clock, ArrowRight } from "lucide-react";

// Types for your data (Adjust based on your actual API response)
interface LogEntry {
    id: string | number;
    date: string;
    sleptAt: string;
    wokeAt: string;
    quality: number; // e.g., 85
    points: number;
    advice: string;
}

// --- 1. Single Card Component ---
const SleepHistoryCard = ({ log }: { log: LogEntry }) => {
    return (
        <div className="group relative bg-slate-900 border border-white/5 rounded-2xl p-6 hover:border-violet-500/30 transition-all duration-300 hover:shadow-xl hover:shadow-violet-500/10">

            {/* Header: Date & Points */}
            <div className="flex justify-between items-start mb-6">

                {/* Date Badge */}
                <div className="flex items-center gap-2 text-slate-400 bg-slate-950/50 px-3 py-1.5 rounded-lg border border-white/5">
                    <Calendar className="w-4 h-4" />
                    <span className="text-sm font-semibold">{log.date}</span>
                </div>

                {/* Gamified Points Badge */}
                <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-full bg-slate-950 border border-violet-500/20 shadow-inner group-hover:border-violet-500/50 transition-colors">
                    <Zap className="w-4 h-4 text-yellow-400 fill-yellow-400" />
                    <span className="text-base font-black text-transparent bg-clip-text bg-linear-to-r from-yellow-300 to-yellow-500">
                        +{log.points} XP
                    </span>
                </div>
            </div>

            {/* Main Content: Time & Advice */}
            <div className="space-y-4">

                {/* Time Stats Row */}
                <div className="flex items-center gap-4 text-sm text-slate-300">
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-violet-400" />
                        <span className="font-mono">{log.sleptAt}</span>
                    </div>
                    <ArrowRight className="w-4 h-4 text-slate-600" />
                    <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-indigo-400" />
                        <span className="font-mono">{log.wokeAt}</span>
                    </div>

                    {/* Optional: Quality Indicator */}
                    <div className="ml-auto text-xs font-bold text-slate-500 uppercase">
                        Quality: <span className="text-white">{log.quality}%</span>
                    </div>
                </div>

                {/* AI Advice Box */}
                <div className="relative bg-slate-950/80 rounded-xl p-4 border border-white/5">
                    {/* Decorative Icon */}
                    <div className="absolute -top-2 -left-2 bg-slate-900 p-1 rounded-full border border-white/10">
                        <Sparkles className="w-4 h-4 text-violet-400" />
                    </div>

                    <p className="text-slate-300 text-sm leading-relaxed">
                        {log.advice}
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SleepHistoryCard;