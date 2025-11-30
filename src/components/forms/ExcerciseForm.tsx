
function ExcerciseForm() {
    return (
        <>
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    <button className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-center hover:bg-emerald-500/20 transition-all">
                        Cardio
                    </button>
                    <button className="p-4 rounded-2xl bg-slate-950/50 border border-white/5 text-slate-400 font-bold text-center hover:bg-slate-900 transition-all hover:text-white">
                        Strength
                    </button>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/50 border border-white/5">
                    <label className="block text-xs font-bold text-slate-500 uppercase mb-3">Duration (Minutes)</label>
                    <div className="relative pt-6 pb-2">
                        <div className="absolute top-0 left-0 w-full h-1 bg-slate-800 rounded-full"></div>
                        <div className="absolute top-0 left-0 w-3/4 h-1 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                        <div className="absolute -top-1.5 left-[75%] w-4 h-4 bg-white rounded-full shadow-lg cursor-pointer transform hover:scale-125 transition-transform"></div>
                        <div className="text-center mt-4 text-3xl font-bold text-white">45 <span className="text-sm font-medium text-slate-500">min</span></div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ExcerciseForm