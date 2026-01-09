/* eslint-disable @typescript-eslint/no-explicit-any */
import { useState } from 'react';
import { Check, ArrowRight, Layers } from 'lucide-react';
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
        <div className="min-h-screen bg-[#020617] font-sans text-slate-200 relative overflow-x-hidden flex flex-col">
            
            {/* Subtle Grid Background */}
            <div className="absolute inset-0 bg-[linear-gradient(to_right,#1e293b_1px,transparent_1px),linear-gradient(to_bottom,#1e293b_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] opacity-20 pointer-events-none" />

            <div className="relative z-10 w-full max-w-[1600px] mx-auto px-6 md:px-12 py-12 flex flex-col h-full flex-1">
                
                {/* Header: Clean, Typography-led */}
                <header className="mb-12 space-y-2">
                    <div className="flex items-center gap-2 text-indigo-400 mb-4">
                        <Layers className="w-5 h-5" />
                        <span className="text-xs font-semibold uppercase tracking-widest">Setup Workspace</span>
                    </div>
                    <h1 className="text-4xl md:text-5xl font-bold text-white tracking-tight">
                        Define your stack.
                    </h1>
                    <p className="text-slate-500 text-lg max-w-2xl">
                        Select the habits you want to track. Consistency is the only metric that matters.
                    </p>
                </header>

                {/* Grid: 4 Columns, Precise Gaps */}
                <main className="flex-1 pb-32 w-full">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6 w-full">
                        {habitsList.map((habit) => {
                            const isSelected = selectedHabitsIds.includes(habit.id);
                            return (
                                <div
                                    key={habit.id}
                                    onClick={() => toggleHabit(habit.id)}
                                    className={`
                                        group relative cursor-pointer rounded-xl border transition-all duration-200 ease-out
                                        ${isSelected 
                                            ? 'bg-indigo-950/20 border-indigo-500/50 ring-1 ring-indigo-500/50' 
                                            : 'bg-slate-900/50 border-slate-800 hover:border-slate-600 hover:bg-slate-800'
                                        }
                                    `}
                                >
                                    <div className="p-6 h-full flex flex-col">
                                        <div className="flex justify-between items-start mb-4">
                                            {/* Icon: Muted, Monochromatic look */}
                                            <div className={`
                                                w-10 h-10 rounded-lg flex items-center justify-center border border-white/5
                                                ${isSelected ? 'bg-indigo-500/20 text-indigo-300' : 'bg-slate-800 text-slate-400'}
                                            `}>
                                                <habit.icon className="w-5 h-5" />
                                            </div>

                                            {/* Checkbox: Technical feel */}
                                            <div className={`
                                                w-5 h-5 rounded border flex items-center justify-center transition-all duration-200
                                                ${isSelected 
                                                    ? 'border-indigo-500 bg-indigo-500 text-white' 
                                                    : 'border-slate-700 bg-slate-900/50'
                                                }
                                            `}>
                                                <Check className={`w-3 h-3 stroke-[3px] transition-transform ${isSelected ? 'scale-100' : 'scale-0'}`} />
                                            </div>
                                        </div>

                                        <div className="space-y-2">
                                            <h3 className={`text-lg font-semibold ${isSelected ? 'text-white' : 'text-slate-300'}`}>
                                                {habit.title}
                                            </h3>
                                            <p className="text-slate-500 text-sm leading-relaxed">
                                                {habit.description}
                                            </p>
                                        </div>
                                    </div>
                                </div>
                            );
                        })}
                    </div>
                </main>
            </div>

            {/* Bottom Bar: Fixed, Utilitarian */}
            <div className={`
                fixed bottom-0 left-0 right-0 z-50 border-t border-slate-800 bg-[#020617]/90 backdrop-blur-xl transition-transform duration-300
                ${selectedHabitsIds.length > 0 ? 'translate-y-0' : 'translate-y-full'}
            `}>
                <div className="max-w-[1600px] mx-auto px-6 md:px-12 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <span className="text-sm font-medium text-slate-400">
                            <span className="text-white font-bold">{selectedHabitsIds.length}</span> items selected
                        </span>
                    </div>
                    
                    <Link to="/" onClick={handleClickStart}>
                        <button className="bg-indigo-600 hover:bg-indigo-500 text-white px-6 py-2.5 rounded-lg font-medium text-sm transition-colors flex items-center gap-2">
                            Initialize Dashboard <ArrowRight className="w-4 h-4" />
                        </button>
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default HabitsPage;