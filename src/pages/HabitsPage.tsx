/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Check, Zap, Crown, ArrowRight, Layers } from 'lucide-react';
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
        // BACKGROUND: Solid Dark Zinc (Clean, Professional)
        <div className="min-h-screen bg-[#09090b] font-sans text-white relative overflow-x-hidden flex flex-col selection:bg-indigo-500/30">
            
            {/* Subtle Grid Pattern (No heavy blobs) */}
            <div className="absolute inset-0 h-full w-full bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none opacity-20" />

            <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-10 py-12 flex flex-col h-full flex-1">
                
                {/* Header: Clean Typography */}
                <header className="mb-12 max-w-2xl">
                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-900 border border-zinc-800 mb-6">
                        <Layers className="w-4 h-4 text-indigo-400" />
                        <span className="text-xs font-semibold uppercase tracking-wider text-zinc-400">Habit Selection</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl font-bold text-white tracking-tight mb-4">
                        Build your stack.
                    </h1>
                    <p className="text-zinc-500 text-lg leading-relaxed">
                        Select the habits you want to track. Consistency is built one block at a time.
                    </p>
                </header>

                {/* Cards Grid */}
                <main className="flex-1 pb-32 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 w-full">
                        {habitsList.map((habit) => {
                            const isSelected = selectedHabitsIds.includes(habit.id);
                            return (
                                <div
                                    key={habit.id}
                                    onClick={() => toggleHabit(habit.id)}
                                    className={`
                                        group relative cursor-pointer rounded-2xl transition-all duration-200 ease-out
                                        border
                                        ${isSelected 
                                            ? 'bg-zinc-900 border-indigo-500/50 ring-1 ring-indigo-500/20' 
                                            : 'bg-zinc-900/40 border-zinc-800 hover:bg-zinc-900 hover:border-zinc-700'
                                        }
                                    `}
                                >
                                    <div className="p-6 h-full flex flex-col">
                                        
                                        <div className="flex justify-between items-start mb-6">
                                            {/* Icon: Clean, subtle gradient background */}
                                            <div className={`
                                                w-12 h-12 rounded-xl flex items-center justify-center text-white
                                                bg-gradient-to-br ${habit.gradient} shadow-sm
                                            `}>
                                                <habit.icon className="w-6 h-6" />
                                            </div>

                                            {/* Checkbox: Clean circle */}
                                            <div className={`
                                                w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-200
                                                ${isSelected 
                                                    ? 'border-indigo-500 bg-indigo-500 text-white' 
                                                    : 'border-zinc-700 bg-transparent'
                                                }
                                            `}>
                                                <Check className={`w-3.5 h-3.5 stroke-[3] transition-transform ${isSelected ? 'scale-100' : 'scale-0'}`} />
                                            </div>
                                        </div>

                                        <div className="mb-8">
                                            <h3 className="text-lg font-bold text-white mb-2">{habit.title}</h3>
                                            <p className="text-zinc-500 text-sm leading-relaxed line-clamp-2">
                                                {habit.description}
                                            </p>
                                        </div>

                                        {/* Footer Stats: Minimalist Pills */}
                                        <div className="mt-auto flex items-center gap-2 pt-4 border-t border-zinc-800/50">
                                            <div className="px-2.5 py-1 rounded-md bg-zinc-800/50 text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                                                <Crown className="w-3 h-3" /> {habit.points} XP
                                            </div>
                                            <div className="px-2.5 py-1 rounded-md bg-zinc-800/50 text-[10px] font-bold text-zinc-400 uppercase tracking-wider flex items-center gap-1.5">
                                                <Zap className="w-3 h-3" /> {habit.days} Days
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>
            </div>

            {/* Bottom Floating Bar: Clean & Functional */}
            <div className={`
                fixed bottom-8 left-0 right-0 z-50 px-4 flex justify-center
                transition-transform duration-300 ease-in-out
                ${selectedHabitsIds.length > 0 ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0 pointer-events-none'}
            `}>
                <div className="bg-[#18181b] border border-zinc-700 rounded-full p-2 pl-6 shadow-2xl flex items-center gap-6">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-wider">Selected</span>
                        <div className="flex items-center gap-2">
                            <span className="text-sm font-bold text-white">{selectedHabitsIds.length} Habits</span>
                        </div>
                    </div>
                    
                    <Link to="/" onClick={handleClickStart}>
                        <button className="bg-white hover:bg-zinc-200 text-black px-6 py-3 rounded-full font-bold text-sm transition-colors flex items-center gap-2">
                            Continue <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HabitsPage;