/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Check, Zap, Sword, ArrowRight, Sparkles } from 'lucide-react';
import habitsList from '../data/habitsList';
import { Link } from 'react-router-dom';

const HabitsPage = () => {
    const [selectedHabitsIds, setSelectedIds] = useState<number[]>([]);

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
        // BACKGROUND: Deep Indigo/Blue Gradient - Not Pitch Black
        <div className="min-h-screen bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-indigo-900 via-slate-900 to-black font-sans relative overflow-x-hidden flex flex-col text-white">
            
            {/* Ambient Noise/Texture */}
            <div className="fixed inset-0 opacity-20 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] pointer-events-none mix-blend-overlay"></div>

            {/* FULL WIDTH CONTAINER */}
            <div className="relative z-10 w-full px-4 md:px-8 py-8 flex flex-col h-full flex-1">
                
                {/* Header - Game Title Style */}
                <header className="py-8 text-center space-y-3">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-[0_0_15px_rgba(255,255,255,0.2)]">
                        <Sparkles className="w-4 h-4 text-yellow-300" />
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-white">New Game Plus</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight uppercase drop-shadow-[0_0_25px_rgba(99,102,241,0.5)]">
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-300 to-blue-500">Skills</span>
                    </h1>
                </header>

                {/* Cards Grid - FULL WIDTH - 4 Columns on Laptop/Desktop */}
                <main className="flex-1 pb-32 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 w-full">
                        {habitsList.map((habit) => {
                            const isSelected = selectedHabitsIds.includes(habit.id);
                            return (
                                <div
                                    key={habit.id}
                                    onClick={() => toggleHabit(habit.id)}
                                    className={`
                                        group relative overflow-hidden rounded-2xl cursor-pointer transition-all duration-200
                                        ${isSelected ? 'ring-2 ring-cyan-400 bg-cyan-900/30' : 'hover:bg-white/5 bg-white/5'}
                                        border border-white/10 hover:border-white/30
                                    `}
                                >
                                    {/* Content Wrapper - Compact Height */}
                                    <div className="p-5 flex flex-col h-full relative z-10">
                                        
                                        <div className="flex justify-between items-start mb-3">
                                            {/* Icon - Glowing */}
                                            <div className={`
                                                w-12 h-12 rounded-xl flex items-center justify-center text-white shadow-lg
                                                bg-gradient-to-br ${habit.gradient}
                                            `}>
                                                <habit.icon className="w-6 h-6" />
                                            </div>

                                            {/* Checkbox */}
                                            <div className={`
                                                w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200
                                                ${isSelected 
                                                    ? 'border-cyan-400 bg-cyan-400 text-black' 
                                                    : 'border-white/30 bg-black/20'
                                                }
                                            `}>
                                                <Check className={`w-4 h-4 font-bold transition-all ${isSelected ? 'scale-100' : 'scale-0'}`} />
                                            </div>
                                        </div>

                                        <div className="mb-4">
                                            <h3 className="text-xl font-bold text-white leading-tight mb-1 group-hover:text-cyan-300 transition-colors">
                                                {habit.title}
                                            </h3>
                                            <p className="text-indigo-200/70 text-xs font-medium line-clamp-2">
                                                {habit.description}
                                            </p>
                                        </div>

                                        {/* Footer Stats - Compact */}
                                        <div className="mt-auto flex items-center justify-between border-t border-white/10 pt-3">
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-slate-300 flex items-center gap-1">
                                                <Sword className="w-3 h-3" /> {habit.days} Days
                                            </span>
                                            <span className="text-[10px] font-bold uppercase tracking-wider text-yellow-300 flex items-center gap-1">
                                                <Zap className="w-3 h-3" /> {habit.points} XP
                                            </span>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>
            </div>

            {/* Bottom Bar - Glassmorphism */}
            <div className={`fixed bottom-0 left-0 right-0 p-4 z-50 transition-transform duration-300 ${selectedHabitsIds.length > 0 ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="w-full bg-slate-900/80 backdrop-blur-xl border-t border-white/20 p-4 shadow-2xl flex items-center justify-between">
                    <div className="flex items-center gap-4 px-4">
                        <span className="text-2xl font-black text-white">{selectedHabitsIds.length}</span>
                        <div className="h-8 w-[1px] bg-white/20"></div>
                        <p className="text-white font-bold text-sm uppercase tracking-widest">Skills Equipped</p>
                    </div>
                    
                    <Link to="/" onClick={handleClickStart}>
                        <button className="bg-cyan-500 hover:bg-cyan-400 text-black font-black uppercase tracking-wider px-8 py-3 rounded-lg flex items-center gap-2 shadow-[0_0_20px_rgba(6,182,212,0.6)] transition-all transform active:scale-95">
                            Start Mission <ArrowRight className="w-5 h-5" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HabitsPage;