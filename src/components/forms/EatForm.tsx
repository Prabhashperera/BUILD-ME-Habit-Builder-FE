import { Salad } from "lucide-react"

function EatForm() {
    return (
        <>
            <div className="space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    {['Breakfast', 'Lunch', 'Dinner'].map((meal) => (
                        <div key={meal} className="p-4 rounded-2xl bg-slate-950/50 border border-white/5 hover:border-orange-500/30 cursor-pointer group transition-all">
                            <div className="flex items-center justify-between mb-2">
                                <span className="text-sm font-bold text-slate-300 group-hover:text-white">{meal}</span>
                                <div className="w-5 h-5 rounded-full border-2 border-slate-700 group-hover:border-orange-500 group-hover:bg-orange-500 transition-all"></div>
                            </div>
                            <div className="text-xs text-slate-500">Not logged</div>
                        </div>
                    ))}
                </div>

                <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/5 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="p-2 rounded-lg bg-orange-500/10">
                            <Salad className="w-6 h-6 text-orange-400" />
                        </div>
                        <div>
                            <div className="text-sm font-bold text-white">Calorie Goal</div>
                            <div className="text-xs text-slate-500">1200 / 2200 kcal</div>
                        </div>
                    </div>
                    <div className="w-16 h-16 relative flex items-center justify-center">
                        <svg className="w-full h-full transform -rotate-90">
                            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-800" />
                            <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="175.9" strokeDashoffset="80" className="text-orange-500" />
                        </svg>
                        <span className="absolute text-[10px] font-bold">54%</span>
                    </div>
                </div>
            </div>
        </>
    )
}

export default EatForm