/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Check, Zap, Crown, ArrowRight, Gamepad2 } from 'lucide-react';
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
        // BACKGROUND: Deep Vibrant Purple/Blue - Not "Dark Mode Gray"
        <div className="min-h-screen bg-[conic-gradient(at_top_right,_var(--tw-gradient-stops))] from-indigo-900 via-purple-900 to-slate-900 font-sans text-white relative overflow-x-hidden flex flex-col">
            
            {/* Vivid Background Blobs */}
            <div className="fixed top-[-20%] left-[-10%] w-[600px] h-[600px] bg-blue-500/30 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />
            <div className="fixed bottom-[-20%] right-[-10%] w-[600px] h-[600px] bg-pink-500/30 rounded-full blur-[120px] mix-blend-screen pointer-events-none" />

            <div className="relative z-10 w-full max-w-[1800px] mx-auto px-4 md:px-8 py-8 flex flex-col h-full flex-1">
                
                {/* Header */}
                <header className="py-10 text-center relative">
                    <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-white/10 border border-white/20 backdrop-blur-md shadow-xl mb-4">
                        <Gamepad2 className="w-5 h-5 text-cyan-400" />
                        <span className="text-sm font-bold uppercase tracking-widest text-white">New Campaign</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 via-white to-pink-400 drop-shadow-[0_0_25px_rgba(255,255,255,0.3)]">
                        CHOOSE YOUR <br className="md:hidden" /> LOADOUT
                    </h1>
                </header>

                {/* Cards Grid - 4 Columns on Large Screens */}
                <main className="flex-1 pb-40 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                        {habitsList.map((habit) => {
                            const isSelected = selectedHabitsIds.includes(habit.id);
                            return (
                                <div
                                    key={habit.id}
                                    onClick={() => toggleHabit(habit.id)}
                                    className={`
                                        group relative h-[320px] rounded-[2rem] cursor-pointer transition-all duration-300
                                        ${isSelected ? 'scale-[1.02] -translate-y-2' : 'hover:-translate-y-2 hover:scale-[1.01]'}
                                    `}
                                >
                                    {/* Glowing Border when selected */}
                                    <div className={`absolute -inset-[2px] rounded-[2rem] bg-gradient-to-b from-cyan-400 to-pink-500 opacity-0 transition-opacity duration-300 ${isSelected ? 'opacity-100 blur-sm' : 'group-hover:opacity-50'}`} />
                                    
                                    {/* Card Body */}
                                    <div className={`
                                        relative h-full w-full bg-[#13132b] rounded-[2rem] p-6 flex flex-col justify-between overflow-hidden
                                        ${isSelected ? 'bg-[#1a1a3d]' : ''}
                                    `}>
                                        {/* Background Gradient inside card */}
                                        <div className={`absolute top-0 left-0 w-full h-[150px] bg-gradient-to-b ${habit.gradient} opacity-20`} />

                                        <div className="relative z-10">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className={`w-16 h-16 rounded-2xl bg-gradient-to-br ${habit.gradient} flex items-center justify-center shadow-lg`}>
                                                    <habit.icon className="w-8 h-8 text-white" />
                                                </div>
                                                <div className={`
                                                    w-10 h-10 rounded-full border-2 flex items-center justify-center transition-all duration-300
                                                    ${isSelected ? 'bg-cyan-500 border-cyan-500 scale-110' : 'border-white/20 bg-black/20'}
                                                `}>
                                                    <Check className={`w-6 h-6 text-white font-bold transition-all ${isSelected ? 'scale-100' : 'scale-0'}`} />
                                                </div>
                                            </div>

                                            <h3 className="text-3xl font-black text-white uppercase leading-none mb-2">{habit.title}</h3>
                                            <p className="text-white/60 text-sm font-medium leading-relaxed line-clamp-2">{habit.description}</p>
                                        </div>

                                        <div className="relative z-10 flex items-center gap-2 mt-auto">
                                            <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-pink-300">
                                                <Zap className="w-3 h-3 fill-pink-300" /> {habit.points} XP
                                            </div>
                                            <div className="px-3 py-2 rounded-xl bg-white/5 border border-white/10 flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-cyan-300">
                                                <Crown className="w-3 h-3" /> {habit.days} Days
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>
            </div>

            {/* Floating "Start" Bar - Gamified */}
            <div className={`fixed bottom-8 left-0 right-0 z-50 px-4 transition-transform duration-500 cubic-bezier(0.175, 0.885, 0.32, 1.275) ${selectedHabitsIds.length > 0 ? 'translate-y-0' : 'translate-y-[200%]'}`}>
                <div className="max-w-2xl mx-auto bg-slate-900/80 backdrop-blur-2xl border border-white/20 rounded-full p-3 pl-8 shadow-[0_0_50px_rgba(0,0,0,0.5)] flex items-center justify-between">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-cyan-400 uppercase tracking-widest">Loadout Ready</span>
                        <span className="text-xl font-black text-white">{selectedHabitsIds.length} Quests Active</span>
                    </div>
                    
                    <Link to="/" onClick={handleClickStart}>
                        <button className="bg-gradient-to-r from-cyan-500 to-blue-600 hover:from-cyan-400 hover:to-blue-500 text-white px-8 py-4 rounded-full font-black text-sm uppercase tracking-wider shadow-lg shadow-cyan-500/30 flex items-center gap-3 hover:scale-105 active:scale-95 transition-all">
                            Start Game <ArrowRight className="w-5 h-5" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HabitsPage;