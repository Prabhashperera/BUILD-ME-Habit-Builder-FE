/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Check, ArrowRight, Sparkles, LayoutGrid } from 'lucide-react';
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
        <div className="min-h-screen bg-black font-sans text-white relative overflow-x-hidden flex flex-col selection:bg-indigo-500/30">
            
            {/* --- 1. Ambient Background (Aurora) --- */}
            <div className="fixed inset-0 z-0 pointer-events-none">
                <div className="absolute top-[-20%] left-[10%] w-[50vw] h-[50vw] bg-indigo-900/20 rounded-full blur-[120px] animate-pulse-slow" />
                <div className="absolute bottom-[-20%] right-[10%] w-[50vw] h-[50vw] bg-blue-900/10 rounded-full blur-[120px]" />
                <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20 mix-blend-overlay" />
            </div>

            <div className="relative z-10 w-full max-w-[1920px] mx-auto px-4 md:px-8 py-12 flex flex-col h-full flex-1">
                
                {/* --- 2. Header --- */}
                <header className="mb-16 text-center space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full border border-white/10 bg-white/5 backdrop-blur-md shadow-2xl">
                        <Sparkles className="w-3.5 h-3.5 text-indigo-400" />
                        <span className="text-[10px] font-medium tracking-[0.2em] text-white/60 uppercase">System Config</span>
                    </div>
                    <h1 className="text-4xl md:text-6xl lg:text-7xl font-medium tracking-tight text-white max-w-4xl mx-auto leading-tight">
                        Design your <span className="text-transparent bg-clip-text bg-gradient-to-b from-indigo-300 to-white">protocol.</span>
                    </h1>
                    <p className="text-white/40 max-w-lg mx-auto text-base md:text-lg font-light leading-relaxed">
                        Select the modules you wish to track. Each habit adds a new dimension to your personal analytics.
                    </p>
                </header>

                {/* --- 3. Bento Grid (Fixed Aspect Ratios) --- */}
                <main className="flex-1 pb-40 w-full">
                    {/* Changed grid breakpoints to keep cards wide */}
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full place-items-stretch">
                        {habitsList.map((habit) => {
                            const isSelected = selectedHabitsIds.includes(habit.id);
                            return (
                                <div
                                    key={habit.id}
                                    onClick={() => toggleHabit(habit.id)}
                                    className={`
                                        group relative w-full cursor-pointer transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                                        ${isSelected ? 'scale-[1.02]' : 'hover:scale-[1.01]'}
                                    `}
                                >
                                    {/* Glass Card Container - HEIGHT REMOVED, Aspect Ratio Added */}
                                    <div className={`
                                        relative w-full aspect-[4/5] md:aspect-[3/4] rounded-[2rem] border backdrop-blur-2xl transition-all duration-500 overflow-hidden flex flex-col
                                        ${isSelected 
                                            ? 'bg-[#0f0f0f]/80 border-white/20 shadow-[0_0_50px_-10px_rgba(255,255,255,0.1)]' 
                                            : 'bg-[#0f0f0f]/40 border-white/5 hover:bg-[#0f0f0f]/60 hover:border-white/10'
                                        }
                                    `}>
                                        
                                        {/* Ambient Light Blob */}
                                        <div className={`
                                            absolute -right-20 -top-20 w-60 h-60 bg-gradient-to-br ${habit.gradient} 
                                            opacity-0 group-hover:opacity-20 blur-[80px] transition-opacity duration-700 pointer-events-none
                                        `} />

                                        {/* Card Content */}
                                        <div className="h-full p-8 flex flex-col justify-between relative z-10">
                                            
                                            {/* Top Row */}
                                            <div className="flex justify-between items-start">
                                                <div className={`
                                                    w-14 h-14 rounded-2xl flex items-center justify-center text-white transition-all duration-500
                                                    ${isSelected 
                                                        ? 'bg-gradient-to-br from-indigo-600 to-indigo-800 shadow-lg shadow-indigo-900/50' 
                                                        : 'bg-white/5 border border-white/5 group-hover:bg-white/10'
                                                    }
                                                `}>
                                                    <habit.icon className="w-7 h-7" />
                                                </div>

                                                <div className={`
                                                    w-8 h-8 rounded-full border flex items-center justify-center transition-all duration-300
                                                    ${isSelected 
                                                        ? 'border-white bg-white text-black scale-110' 
                                                        : 'border-white/10 bg-transparent group-hover:border-white/30'
                                                    }
                                                `}>
                                                    <Check className={`w-4 h-4 stroke-[3px] transition-transform ${isSelected ? 'scale-100' : 'scale-0'}`} />
                                                </div>
                                            </div>

                                            {/* Bottom Row */}
                                            <div className="space-y-3 mt-auto">
                                                <h3 className="text-2xl font-medium text-white tracking-tight leading-none">{habit.title}</h3>
                                                <p className="text-white/40 text-sm leading-relaxed font-light">
                                                    {habit.description}
                                                </p>
                                                
                                                {/* Meta Tag */}
                                                <div className={`pt-2 flex items-center gap-3 transition-opacity duration-500 ${isSelected ? 'opacity-100' : 'opacity-0 group-hover:opacity-100'}`}>
                                                    <span className="text-[10px] font-bold text-white/30 uppercase tracking-widest border border-white/10 px-2 py-1 rounded-md">
                                                        +{habit.points} XP
                                                    </span>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>
            </div>

            {/* --- 4. Floating Dock Action Bar --- */}
            <div className={`
                fixed bottom-10 left-1/2 -translate-x-1/2 z-50 
                transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                ${selectedHabitsIds.length > 0 ? 'translate-y-0 opacity-100' : 'translate-y-32 opacity-0'}
            `}>
                <div className="flex items-center gap-6 pl-8 pr-2 py-2.5 bg-[#0a0a0a]/80 backdrop-blur-2xl border border-white/10 rounded-full shadow-[0_0_50px_-10px_rgba(0,0,0,0.5)]">
                    <div className="flex flex-col">
                        <span className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Selection</span>
                        <div className="flex items-center gap-2">
                            <LayoutGrid className="w-3 h-3 text-indigo-400" />
                            <span className="text-sm font-medium text-white">
                                {selectedHabitsIds.length} Modules
                            </span>
                        </div>
                    </div>
                    
                    <div className="h-8 w-px bg-white/10" />

                    <Link to="/" onClick={handleClickStart}>
                        <button className="group bg-white hover:bg-zinc-200 text-black px-8 py-3.5 rounded-full font-bold text-sm transition-all flex items-center gap-2 hover:scale-105 active:scale-95">
                            Initialize System 
                            <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
                        </button>
                    </Link>
                </div>
            </div>
            
            <style>{`
                .animate-pulse-slow {
                    animation: pulse 8s cubic-bezier(0.4, 0, 0.6, 1) infinite;
                }
            `}</style>
        </div>
    );
};

export default HabitsPage;