/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Check, Zap, Shield, Sword, ArrowRight } from 'lucide-react';
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
        <div className="min-h-screen bg-[#09090b] font-sans selection:bg-cyan-500/30 relative overflow-hidden flex flex-col">
            
            {/* --- Game Background Grid --- */}
            <div className="fixed inset-0 z-0">
                <div className="absolute inset-0 bg-[linear-gradient(to_right,#4f4f4f2e_1px,transparent_1px),linear-gradient(to_bottom,#4f4f4f2e_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)]" />
                <div className="absolute top-0 left-0 right-0 h-[500px] bg-purple-900/20 blur-[120px]" />
                <div className="absolute bottom-0 left-0 right-0 h-[300px] bg-blue-900/10 blur-[100px]" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 md:px-6 flex flex-col h-full flex-1">
                
                {/* Header */}
                <header className="py-8 text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-900/50 border border-slate-700 backdrop-blur-md shadow-lg shadow-cyan-500/10">
                        <Shield className="w-4 h-4 text-cyan-400" />
                        <span className="text-xs font-bold uppercase tracking-[0.2em] text-cyan-100">Prepare for Battle</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-black text-white tracking-tighter uppercase drop-shadow-2xl">
                        Select Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-blue-500 to-purple-600">Quests</span>
                    </h1>
                    <p className="text-slate-400 font-medium max-w-lg mx-auto">
                        Choose the skills you want to master. Each habit grants XP and boosts your real-life stats.
                    </p>
                </header>

                {/* Cards Grid */}
                <main className="flex-1 pb-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-5">
                        {habitsList.map((habit) => {
                            const isSelected = selectedHabitsIds.includes(habit.id);
                            return (
                                <div
                                    key={habit.id}
                                    onClick={() => toggleHabit(habit.id)}
                                    className={`
                                        group relative overflow-hidden rounded-3xl p-1 cursor-pointer transition-all duration-300
                                        ${isSelected ? 'scale-[1.02]' : 'hover:scale-[1.01]'}
                                    `}
                                >
                                    {/* Animated Border Gradient */}
                                    <div className={`absolute inset-0 bg-gradient-to-r ${isSelected ? 'from-cyan-500 via-blue-500 to-purple-600 animate-spin-slow' : 'from-slate-800 to-slate-900'} opacity-100 transition-all duration-500`} />
                                    
                                    {/* Inner Card Content */}
                                    <div className="relative h-full bg-slate-950/90 backdrop-blur-xl rounded-[22px] p-6 flex flex-col justify-between border border-white/5 group-hover:bg-slate-900/90 transition-colors">
                                        
                                        <div className="flex justify-between items-start mb-4">
                                            {/* Icon Box */}
                                            <div className={`
                                                w-14 h-14 rounded-2xl flex items-center justify-center text-white shadow-2xl
                                                bg-gradient-to-br ${habit.gradient}
                                            `}>
                                                <habit.icon className="w-7 h-7" />
                                            </div>

                                            {/* Checkbox UI */}
                                            <div className={`
                                                w-8 h-8 rounded-lg border-2 flex items-center justify-center transition-all duration-300
                                                ${isSelected 
                                                    ? 'border-cyan-500 bg-cyan-500/20 text-cyan-400 shadow-[0_0_15px_rgba(6,182,212,0.5)]' 
                                                    : 'border-slate-700 bg-slate-800/50'
                                                }
                                            `}>
                                                <Check className={`w-5 h-5 font-bold transition-all ${isSelected ? 'scale-100' : 'scale-0'}`} />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className="text-2xl font-black text-white uppercase tracking-wide group-hover:text-cyan-200 transition-colors">
                                                {habit.title}
                                            </h3>
                                            <p className="text-slate-400 text-sm font-medium leading-relaxed">
                                                {habit.description}
                                            </p>
                                        </div>

                                        {/* Stats Footer */}
                                        <div className="mt-6 pt-4 border-t border-white/5 flex items-center gap-4">
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-white/5">
                                                <Sword className="w-3 h-3 text-purple-400" />
                                                <span>{habit.days} Day Campaign</span>
                                            </div>
                                            <div className="flex items-center gap-2 text-xs font-bold text-slate-300 bg-slate-800/50 px-3 py-1.5 rounded-lg border border-white/5">
                                                <Zap className="w-3 h-3 text-yellow-400" />
                                                <span>+{habit.points} XP</span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>
            </div>

            {/* Floating Action Bar */}
            <div className={`fixed bottom-0 left-0 right-0 p-6 z-50 bg-gradient-to-t from-black via-black/90 to-transparent transition-transform duration-500 ${selectedHabitsIds.length > 0 ? 'translate-y-0' : 'translate-y-full'}`}>
                <div className="max-w-3xl mx-auto bg-[#18181b] border border-slate-700/50 rounded-2xl p-4 shadow-2xl flex items-center justify-between ring-1 ring-white/10">
                    <div className="flex items-center gap-4 px-2">
                        <div className="h-10 w-10 rounded-full bg-cyan-500 flex items-center justify-center font-black text-black">
                            {selectedHabitsIds.length}
                        </div>
                        <div>
                            <p className="text-white font-bold text-sm">Quests Selected</p>
                            <p className="text-slate-500 text-xs">Ready to begin?</p>
                        </div>
                    </div>
                    
                    <Link to="/" onClick={handleClickStart}>
                        <button className="relative group overflow-hidden rounded-xl bg-white px-8 py-3.5 transition-all hover:scale-[1.02] active:scale-[0.98]">
                            <div className="absolute inset-0 bg-gradient-to-r from-cyan-400 to-blue-500 opacity-20 group-hover:opacity-100 transition-opacity duration-300" />
                            <span className="relative flex items-center gap-2 text-black font-black uppercase tracking-wider text-sm">
                                Start Game <ArrowRight className="w-4 h-4" />
                            </span>
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HabitsPage;