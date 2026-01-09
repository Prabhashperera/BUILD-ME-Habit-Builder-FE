/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Check, ArrowRight, Sparkles } from 'lucide-react';
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
        <div className="min-h-screen bg-black font-sans text-white relative overflow-x-hidden flex flex-col selection:bg-white/20">
            
            {/* Subtle Aurora Background */}
            <div className="fixed inset-0 z-0">
                <div className="absolute top-[-10%] left-[20%] w-[40%] h-[40%] bg-indigo-900/20 rounded-full blur-[120px]" />
                <div className="absolute bottom-[-10%] right-[20%] w-[40%] h-[40%] bg-blue-900/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 brightness-100 contrast-150 mix-blend-overlay" />
            </div>

            <div className="relative z-10 w-full max-w-[1800px] mx-auto px-6 py-12 flex flex-col h-full flex-1">
                
                {/* Header */}
                <header className="mb-16 text-center space-y-4">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="text-xs font-medium tracking-wide text-white/80">Design Your Routine</span>
                    </div>
                    <h1 className="text-5xl md:text-7xl font-medium tracking-tight bg-gradient-to-b from-white to-white/60 bg-clip-text text-transparent">
                        Select your stack.
                    </h1>
                </header>

                {/* Modern Bento Grid */}
                <main className="flex-1 pb-32">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                        {habitsList.map((habit) => {
                            const isSelected = selectedHabitsIds.includes(habit.id);
                            return (
                                <div
                                    key={habit.id}
                                    onClick={() => toggleHabit(habit.id)}
                                    className={`
                                        group relative h-64 cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                                        ${isSelected ? 'scale-[1.02]' : 'hover:scale-[1.01]'}
                                    `}
                                >
                                    {/* Glass Card */}
                                    <div className={`
                                        absolute inset-0 rounded-3xl border backdrop-blur-2xl transition-all duration-500
                                        ${isSelected 
                                            ? 'bg-white/10 border-white/20 shadow-[0_0_40px_-10px_rgba(255,255,255,0.1)]' 
                                            : 'bg-white/5 border-white/5 hover:bg-white/10 hover:border-white/10'
                                        }
                                    `}>
                                        <div className="h-full p-8 flex flex-col justify-between relative z-10">
                                            
                                            {/* Top Row */}
                                            <div className="flex justify-between items-start">
                                                <div className={`
                                                    w-12 h-12 rounded-2xl flex items-center justify-center text-white transition-transform duration-500
                                                    ${isSelected ? 'bg-indigo-600 rotate-3' : 'bg-white/5'}
                                                `}>
                                                    <habit.icon className="w-6 h-6" />
                                                </div>

                                                <div className={`
                                                    w-6 h-6 rounded-full border flex items-center justify-center transition-all duration-300
                                                    ${isSelected ? 'border-white bg-white text-black' : 'border-white/20 bg-transparent'}
                                                `}>
                                                    <Check className={`w-3.5 h-3.5 stroke-[3px] transition-transform ${isSelected ? 'scale-100' : 'scale-0'}`} />
                                                </div>
                                            </div>

                                            {/* Bottom Info */}
                                            <div>
                                                <h3 className="text-2xl font-medium text-white mb-2 tracking-tight">{habit.title}</h3>
                                                <p className="text-white/40 text-sm leading-relaxed line-clamp-2">
                                                    {habit.description}
                                                </p>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>
            </div>

            {/* Floating Dock Action Bar */}
            <div className={`
                fixed bottom-10 left-1/2 -translate-x-1/2 z-50 
                transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                ${selectedHabitsIds.length > 0 ? 'translate-y-0 opacity-100' : 'translate-y-20 opacity-0'}
            `}>
                <div className="flex items-center gap-4 pl-6 pr-2 py-2 bg-[#0a0a0a]/80 backdrop-blur-xl border border-white/10 rounded-full shadow-2xl">
                    <span className="text-sm font-medium text-white/60">
                        <span className="text-white">{selectedHabitsIds.length}</span> selected
                    </span>
                    
                    <Link to="/" onClick={handleClickStart}>
                        <button className="bg-white hover:bg-zinc-200 text-black px-6 py-3 rounded-full font-medium text-sm transition-colors flex items-center gap-2">
                            Initialize <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HabitsPage;