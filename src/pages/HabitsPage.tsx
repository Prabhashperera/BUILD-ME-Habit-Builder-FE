/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Check, Map, Crown, Sparkles } from 'lucide-react';
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
        <div className="min-h-screen bg-gradient-to-br from-indigo-50 via-blue-50 to-emerald-50 font-sans selection:bg-indigo-200 text-slate-800 relative overflow-x-hidden flex flex-col">
            
            {/* Background Decorations */}
            <div className="fixed top-0 left-0 w-full h-full overflow-hidden pointer-events-none z-0">
                <div className="absolute top-[-10%] right-[-10%] w-[500px] h-[500px] bg-purple-200/40 rounded-full blur-[100px]" />
                <div className="absolute bottom-[10%] left-[-10%] w-[400px] h-[400px] bg-emerald-200/40 rounded-full blur-[100px]" />
            </div>

            <div className="relative z-10 w-full px-4 md:px-8 py-8 flex flex-col h-full flex-1 max-w-[1920px] mx-auto">
                
                {/* Header */}
                <header className="py-12 text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-5 py-2 rounded-full bg-white shadow-lg shadow-indigo-100 border border-indigo-50 animate-bounce-slow">
                        <Map className="w-5 h-5 text-indigo-500" />
                        <span className="text-sm font-bold uppercase tracking-wider text-indigo-900">Adventure Awaits</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-slate-900 tracking-tight">
                        Choose Your <span className="text-transparent bg-clip-text bg-gradient-to-r from-indigo-500 to-blue-500">Quests</span>
                    </h1>
                    <p className="text-slate-500 font-medium text-lg max-w-lg mx-auto">
                        Every habit is a skill tree waiting to be unlocked.
                    </p>
                </header>

                {/* Quest Grid */}
                <main className="flex-1 pb-40 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8 w-full">
                        {habitsList.map((habit) => {
                            const isSelected = selectedHabitsIds.includes(habit.id);
                            return (
                                <div
                                    key={habit.id}
                                    onClick={() => toggleHabit(habit.id)}
                                    className={`
                                        group relative cursor-pointer transition-all duration-500 ease-out
                                        hover:-translate-y-2 hover:rotate-1
                                    `}
                                >
                                    {/* Card Container */}
                                    <div className={`
                                        relative h-full rounded-[2.5rem] p-8 border-2 transition-all duration-300 overflow-hidden
                                        ${isSelected 
                                            ? 'bg-white border-indigo-500 shadow-2xl shadow-indigo-200 scale-[1.02]' 
                                            : 'bg-white/60 backdrop-blur-xl border-white hover:border-indigo-200 shadow-xl hover:shadow-2xl shadow-slate-200/50'
                                        }
                                    `}>
                                        
                                        {/* Header */}
                                        <div className="flex justify-between items-start mb-6">
                                            <div className={`
                                                w-16 h-16 rounded-3xl flex items-center justify-center text-white shadow-lg transform transition-transform group-hover:scale-110 group-hover:rotate-3
                                                bg-gradient-to-br ${habit.gradient}
                                            `}>
                                                <habit.icon className="w-8 h-8" />
                                            </div>

                                            <div className={`
                                                w-10 h-10 rounded-full flex items-center justify-center transition-all duration-300 shadow-sm
                                                ${isSelected 
                                                    ? 'bg-indigo-500 text-white scale-110 rotate-12' 
                                                    : 'bg-slate-100 text-slate-300 group-hover:bg-indigo-50'
                                                }
                                            `}>
                                                <Check className="w-6 h-6 stroke-[3px]" />
                                            </div>
                                        </div>

                                        {/* Content */}
                                        <div className="space-y-3 mb-8">
                                            <h3 className={`text-2xl font-black ${isSelected ? 'text-indigo-900' : 'text-slate-800'}`}>
                                                {habit.title}
                                            </h3>
                                            <p className="text-slate-500 font-medium leading-relaxed">
                                                {habit.description}
                                            </p>
                                        </div>

                                        {/* Game Stats Badge */}
                                        <div className="flex items-center gap-3">
                                            <span className="px-4 py-2 rounded-xl bg-amber-50 text-amber-600 text-xs font-bold uppercase tracking-wider border border-amber-100 flex items-center gap-2">
                                                <Crown className="w-4 h-4 fill-amber-500" /> {habit.points} XP
                                            </span>
                                            <span className="px-4 py-2 rounded-xl bg-slate-50 text-slate-500 text-xs font-bold uppercase tracking-wider border border-slate-100 flex items-center gap-2">
                                                Easy
                                            </span>
                                        </div>

                                        {/* Selection Ring Animation */}
                                        {isSelected && (
                                            <div className="absolute inset-0 border-4 border-indigo-500 rounded-[2.5rem] opacity-20 animate-ping pointer-events-none" />
                                        )}
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>
            </div>

            {/* Floating Action Bar - Game Style */}
            <div className={`
                fixed bottom-8 left-1/2 -translate-x-1/2 z-50 transition-all duration-500 cubic-bezier(0.34, 1.56, 0.64, 1)
                ${selectedHabitsIds.length > 0 ? 'translate-y-0 opacity-100' : 'translate-y-[200%] opacity-0'}
            `}>
                <div className="bg-slate-900/90 backdrop-blur-2xl text-white p-3 pr-4 rounded-full shadow-2xl shadow-indigo-500/30 flex items-center gap-6 border border-white/10 scale-110">
                    <div className="flex items-center gap-4 pl-4">
                        <div className="flex -space-x-2">
                            {/* Decorative avatars representing selected habits could go here */}
                            <div className="w-8 h-8 rounded-full bg-indigo-500 border-2 border-slate-900 flex items-center justify-center text-xs font-bold">
                                {selectedHabitsIds.length}
                            </div>
                        </div>
                        <div className="flex flex-col">
                            <span className="text-xs font-bold text-slate-400 uppercase tracking-wider">Ready to play?</span>
                            <span className="text-sm font-bold text-white">Quests Active</span>
                        </div>
                    </div>
                    
                    <Link to="/" onClick={handleClickStart}>
                        <button className="bg-white text-indigo-900 px-8 py-3 rounded-full font-black text-sm uppercase tracking-wide hover:scale-105 active:scale-95 transition-transform shadow-lg flex items-center gap-2 group">
                            <Sparkles className="w-4 h-4 text-amber-500 group-hover:rotate-12 transition-transform" />
                            Start Journey
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HabitsPage;