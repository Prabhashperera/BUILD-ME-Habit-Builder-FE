import { ChevronRight, Star } from 'lucide-react';
import habits from '../data/HabitsListForHomePage';


function SelectedHabbits() {
    return (
        <div>
            <section>
                <div className="flex items-center justify-between mb-6 px-2">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Your Journey</h2>
                    <button className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                        View All <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                    {habits.map((habit) => (
                        <div
                            key={habit.id}
                            className={`
                                    group relative p-5 rounded-3xl border bg-slate-900/40 backdrop-blur-md transition-all duration-300
                                    hover:-translate-y-1 hover:shadow-2xl ${habit.glowColor} ${habit.borderColor}
                                    border-white/5 hover:border-white/20 overflow-hidden cursor-pointer
                                `}
                        >
                            {/* Gradient Background */}
                            <div className={`absolute inset-0 bg-linear-to-br ${habit.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                            <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                                {/* Header */}
                                <div className="flex justify-between items-start">
                                    <div className={`p-3 rounded-2xl bg-slate-950/50 border border-white/10 ${habit.color}`}>
                                        <habit.icon className="w-6 h-6" />
                                    </div>
                                    <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 border border-white/5 backdrop-blur-sm">
                                        <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                        <span className="text-xs font-bold text-white">{habit.points}</span>
                                    </div>
                                </div>

                                {/* Info */}
                                <div>
                                    <h3 className="text-lg font-bold text-white mb-1 group-hover:text-emerald-50 transition-colors">{habit.title}</h3>
                                    <p className="text-xs font-medium text-slate-400">
                                        {habit.daysCompleted} / {habit.totalDays} Days Completed
                                    </p>
                                </div>

                                {/* Progress Bar */}
                                <div className="space-y-2">
                                    <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                                        <span>Progress</span>
                                        <span className={habit.color}>{habit.progress}%</span>
                                    </div>
                                    <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
                                        <div
                                            className={`h-full rounded-full ${habit.color.replace('text-', 'bg-')} transition-all duration-1000 ease-out`}
                                            style={{ width: `${habit.progress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    )
}

export default SelectedHabbits