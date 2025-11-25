import { useState } from 'react';
import { Check, Calendar, Sparkles, ArrowRight, Zap } from 'lucide-react';
import habitsList from '../data/habitsList'; //Habits List
import { Link } from 'react-router-dom';

const HabitsPage = () => {
    const [selectedHabitsIds, setSelectedIds] = useState<number[]>([]);

    // Selected Habits id Stores in a state
    const toggleHabit = (id: number) => {
        setSelectedIds((prev) => prev.includes(id)
            ? prev.filter(item => item !== id)
            : [...prev, id]
        );
    };

    const handleClickStart = () => {
        localStorage.setItem("habitsList", JSON.stringify(selectedHabitsIds))
    }

    return (
        <div className="h-screen w-screen bg-slate-950 font-sans selection:bg-emerald-500/30 flex flex-col relative overflow-hidden">

            {/* --- Background --- */}
            <div className="fixed inset-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[-10%] w-[50vw] h-[50vw] bg-indigo-900/10 rounded-full blur-[100px] mix-blend-screen animate-pulse-slow" />
                <div className="absolute bottom-[-20%] right-[-10%] w-[50vw] h-[50vw] bg-emerald-900/10 rounded-full blur-[100px] mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-[0.03]"></div>
            </div>

            {/* --- Main Layout Wrapper (Flex Column) --- */}
            <div className="flex flex-col h-full w-full max-w-7xl mx-auto px-4 md:px-6 relative z-10">

                {/* 1. Compact Header (Flex None) */}
                <header className="flex-none py-6 flex flex-col items-center justify-center space-y-3">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-slate-900/80 border border-slate-700/50 backdrop-blur-xl shadow-lg">
                        <Sparkles className="w-3 h-3 text-emerald-400" />
                        <span className="text-[10px] font-bold uppercase tracking-[0.2em] text-slate-300">Level Up</span>
                    </div>
                    <h1 className="text-3xl md:text-5xl font-black text-white tracking-tight leading-none text-center">
                        CHOOSE YOUR <span className="text-transparent bg-clip-text bg-linear-to-r from-emerald-400 via-cyan-400 to-violet-400">BATTLES</span>
                    </h1>
                </header>

                {/* 2. Scrollable Grid Area (Flex 1) - Fits perfectly in remaining space */}
                {/* We use min-h-0 to allow the flex item to shrink and overflow-y-auto only if absolutely necessary on tiny screens */}
                <main className="flex-1 min-h-0 w-full flex flex-col justify-center pb-24">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 h-full max-h-[600px] w-full mx-auto">
                        {habitsList.map((habit) => {
                            const isSelected = selectedHabitsIds.includes(habit.id);
                            return (
                                <div
                                    key={habit.id}
                                    onClick={() => toggleHabit(habit.id)}
                                    className={`
                                        group relative w-full h-full p-5 rounded-3xl border cursor-pointer 
                                        transition-all duration-300 ease-out flex flex-col justify-between overflow-hidden
                                        hover:shadow-xl active:scale-[0.99]
                                        ${isSelected
                                            ? `${habit.activeBorder} bg-slate-900/90 shadow-[0_0_30px_-10px_rgba(0,0,0,0.7)]`
                                            : 'border-slate-800/60 bg-slate-900/20 hover:bg-slate-900/40 hover:border-slate-700'
                                        }
                                    `}
                                >
                                    {/* Gradient BG */}
                                    <div className={`absolute inset-0 bg-linear-to-br ${habit.gradient} opacity-0 transition-opacity duration-500 ${isSelected ? 'opacity-100' : 'group-hover:opacity-30'}`} />

                                    {/* Card Top Row: Icon + Checkbox */}
                                    <div className="flex justify-between items-start relative z-10 mb-2">
                                        <div className={`p-3 rounded-xl bg-slate-950 border border-slate-800 shadow-lg transition-all duration-300 ${isSelected ? 'scale-110 ring-1 ' + habit.color.replace('text-', 'ring-') : ''}`}>
                                            <habit.icon className={`w-6 h-6 ${habit.color}`} />
                                        </div>

                                        <div className={`
                                            w-8 h-8 rounded-full border-2 flex items-center justify-center transition-all duration-300
                                            ${isSelected
                                                ? `${habit.activeBorder} bg-slate-800 text-white shadow-lg scale-105`
                                                : 'border-slate-700/50 bg-slate-950/30'
                                            }
                                        `}>
                                            <Check className={`w-4 h-4 transition-all duration-300 ${isSelected ? 'opacity-100' : 'opacity-0'}`} />
                                        </div>
                                    </div>

                                    {/* Card Middle: Text Info */}
                                    <div className="flex-1 flex flex-col justify-center relative z-10 space-y-1">
                                        <h3 className="text-xl md:text-2xl font-bold text-white tracking-tight group-hover:text-emerald-50 transition-colors">
                                            {habit.title}
                                        </h3>
                                        <p className="text-slate-400 text-xs font-bold uppercase tracking-wider">{habit.subtitle}</p>
                                        <p className="text-slate-500 text-sm leading-tight line-clamp-2 mt-1">
                                            {habit.description}
                                        </p>
                                    </div>

                                    {/* Card Bottom: Stats (Compact) */}
                                    <div className="flex items-center gap-2 mt-2 relative z-10">
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-slate-950/60 border border-slate-800 text-[10px] font-bold text-slate-300 uppercase tracking-wider backdrop-blur-md">
                                            <Calendar className="w-3 h-3 text-slate-500" />
                                            {habit.days} Days
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-emerald-950/40 border border-emerald-500/20 text-[10px] font-bold text-emerald-400 uppercase tracking-wider backdrop-blur-md">
                                            <Zap className="w-3 h-3" />
                                            {habit.points} Pts
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>
            </div>

            {/* --- Sticky Bottom Action Bar (Overlay) --- */}
            <div className={`
                absolute bottom-6 left-0 right-0 z-50 px-4 md:px-6
                transition-transform duration-500 ease-in-out
                ${selectedHabitsIds.length > 0 ? 'translate-y-0' : 'translate-y-[150%]'}
            `}>
                <div className="max-w-xl mx-auto">
                    <div className="bg-slate-900/90 backdrop-blur-2xl border border-slate-700/50 rounded-2xl p-3 shadow-2xl flex items-center justify-between ring-1 ring-white/10">

                        <div className="flex items-center gap-4 pl-3">
                            <div className="flex items-baseline gap-2">
                                <span className="text-3xl font-black text-white">{selectedHabitsIds.length}</span>
                                <div className="flex flex-col leading-none">
                                    <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider">Selected</span>
                                    <span className="text-xs font-bold text-emerald-400">Habits</span>
                                </div>
                            </div>
                        </div>
                        <Link to={"/home"}>
                            <button className="
                            relative overflow-hidden rounded-xl bg-linear-to-r from-emerald-500 to-cyan-600 
                            px-6 py-3 text-white font-bold text-sm shadow-lg shadow-emerald-500/20
                            transition-all hover:scale-[1.02] active:scale-[0.95]
                            group whitespace-nowrap flex items-center gap-2
                        " onClick={handleClickStart}>
                                <span>Start Journey</span>
                                <ArrowRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
                                {/* Shimmer */}
                                <div className="absolute inset-0 -translate-x-full group-hover:translate-x-full transition-transform duration-700 bg-linear-to-r from-transparent via-white/20 to-transparent" />
                            </button>
                        </Link>
                    </div>
                </div>
            </div>

            <style>{`
                .animate-pulse-slow {
                    animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
                @keyframes pulse {
                    0%, 100% { opacity: 0.3; transform: scale(1); }
                    50% { opacity: 0.6; transform: scale(1.05); }
                }
            `}</style>
        </div>
    );
};

export default HabitsPage;