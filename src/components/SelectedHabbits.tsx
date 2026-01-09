/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronRight, Star, Activity } from 'lucide-react';
import habits from '../data/habitsList';
import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

// 1. Interface for the API Response Data
interface IHabitProgress {
    currentDays: number;
    currentPoints: number;
    progress: number;
    type: string;
}

interface IResponse {
    message: string;
    data: Record<string, IHabitProgress>;
}

function SelectedHabbits() {
    // 2. Filter Selected Habits based on LocalStorage
    const selectedHabitIds = JSON.parse(localStorage.getItem("habitsList") || "[]")
    const selectedHabits = habits.filter((habit) => {
        return selectedHabitIds.includes(habit.id)
    })

    // 3. State for API Data
    const [progressData, setProgressData] = useState<Record<string, IHabitProgress>>({});

    useEffect(() => {
        const getProgressData = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken")
                const { data } = await api.get<IResponse>("/habit/sleepprogress", {
                    headers: { Authorization: `Bearer ${accessToken}` }
                })
                setProgressData(data.data)
            } catch (err) { console.log(err); }
        }
        getProgressData()
    }, [])

    // --- LOGIC TO STRETCH CARDS ---
    // Returns grid class based on count to ensure full width usage
    const getGridClassName = (count: number) => {
        switch (count) {
            case 1:
                return "grid-cols-1";
            case 2:
                return "grid-cols-1 md:grid-cols-2";
            case 3:
                return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
            default:
                return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
        }
    }

    return (
        <section className="w-full mb-8">
            {/* Header: Minimalist Divider Style */}
            <div className="flex items-center justify-between mb-6 px-1">
                <div className="flex items-center gap-3">
                    <div className="p-1.5 rounded-md bg-white/10 backdrop-blur-md">
                        <Activity className="w-3.5 h-3.5 text-white/80" />
                    </div>
                    <h2 className="text-xs font-medium text-white/50 uppercase tracking-[0.2em]">Active Protocols</h2>
                </div>
                
                <button className="group flex items-center gap-2 text-[10px] font-medium text-white/40 hover:text-white transition-colors uppercase tracking-widest">
                    View All 
                    <ChevronRight className="w-3 h-3 transition-transform group-hover:translate-x-0.5" />
                </button>
            </div>

            {/* GRID: Glass Bento Tiles */}
            <div className={`grid gap-4 w-full ${getGridClassName(selectedHabits.length)}`}>

                {selectedHabits.map((habit) => {
                    const data = progressData[habit.type] || progressData[habit.type.toLowerCase()];
                    const currentProgress = data?.progress ?? 0;
                    
                    return (
                        <div
                            key={habit.id}
                            className={`
                                group relative p-6 rounded-3xl transition-all duration-500 ease-[cubic-bezier(0.23,1,0.32,1)]
                                bg-[#0f0f0f]/40 border border-white/5 backdrop-blur-xl
                                hover:bg-white/5 hover:border-white/10 hover:shadow-[0_0_40px_-10px_rgba(255,255,255,0.05)]
                                overflow-hidden
                            `}
                        >
                            {/* Ambient Light Blob (Matches Habit Color) */}
                            <div className={`absolute -right-8 -top-8 w-32 h-32 bg-gradient-to-br ${habit.gradient} opacity-0 group-hover:opacity-20 blur-[60px] transition-opacity duration-700`} />

                            <div className="relative z-10 flex flex-col h-full justify-between gap-6">
                                
                                {/* Top Row: Icon & XP */}
                                <div className="flex justify-between items-start">
                                    <div className="flex items-center gap-4">
                                        <div className={`
                                            w-10 h-10 rounded-2xl flex items-center justify-center 
                                            bg-white/5 border border-white/5 text-white/80 
                                            group-hover:bg-white/10 group-hover:text-white group-hover:scale-105 transition-all duration-300
                                        `}>
                                            <habit.icon className="w-5 h-5" />
                                        </div>
                                        
                                        <div>
                                            <h3 className="text-sm font-medium text-white tracking-wide">{habit.title}</h3>
                                            <p className="text-[10px] font-medium text-white/30 uppercase tracking-wider mt-0.5">
                                                Lvl {Math.floor((data?.currentDays ?? 0) / 7) + 1}
                                            </p>
                                        </div>
                                    </div>

                                    <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-white/5 border border-white/5">
                                        <Star className="w-3 h-3 text-white/60 fill-white/10" />
                                        <span className="text-xs font-medium text-white/80">{data?.currentPoints ?? 0}</span>
                                    </div>
                                </div>

                                {/* Bottom Row: Progress */}
                                <div className="space-y-3">
                                    <div className="flex justify-between items-end">
                                        <div className="flex flex-col">
                                            <span className="text-[10px] font-medium text-white/30 uppercase tracking-wider">Completion</span>
                                        </div>
                                        <span className="text-xl font-medium text-white tracking-tight">{currentProgress}%</span>
                                    </div>
                                    
                                    {/* Ultra-Thin Glowing Bar */}
                                    <div className="h-[2px] w-full bg-white/10 rounded-full overflow-hidden">
                                        <div
                                            className={`h-full rounded-full bg-white shadow-[0_0_12px_rgba(255,255,255,0.6)] transition-all duration-1000 ease-[cubic-bezier(0.23,1,0.32,1)]`}
                                            style={{ width: `${currentProgress}%` }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </section>
    )
}

export default SelectedHabbits;