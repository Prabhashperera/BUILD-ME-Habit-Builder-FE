/* eslint-disable @typescript-eslint/no-explicit-any */
import { ChevronRight, Star } from 'lucide-react';
// Make sure this path points to the file you just shared
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
    // Updated grid logic for the new clean layout
    const getGridClassName = (count: number) => {
        switch (count) {
            case 1:
                return "grid-cols-1";
            case 2:
                return "grid-cols-1 md:grid-cols-2";
            case 3:
                return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3";
            default:
                // 4+ items: Full width 4-column grid on large screens
                return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4";
        }
    }

    return (
        <div className="w-full">
            <section>
                <div className="flex items-center justify-between mb-4 px-1">
                    <h2 className="text-xs font-bold text-zinc-500 uppercase tracking-widest">Active Stack</h2>
                    <button className="text-[10px] font-medium text-zinc-500 hover:text-white transition-colors flex items-center gap-1 uppercase tracking-wider">
                        View All <ChevronRight className="w-3 h-3" />
                    </button>
                </div>

                {/* UPDATED: Dynamic Grid Class */}
                <div className={`grid gap-4 w-full ${getGridClassName(selectedHabits.length)}`}>

                    {selectedHabits.map((habit) => {
                        // 4. Safe Data Lookup
                        const data = progressData[habit.type] || progressData[habit.type.toLowerCase()];

                        // 5. Default values if data is missing
                        const currentProgress = data?.progress ?? 0;
                        const hasStarted = !!data;

                        return (
                            <div
                                key={habit.id}
                                className={`
                                    group relative p-5 rounded-xl border transition-all duration-200
                                    bg-zinc-900 border-zinc-800 hover:border-zinc-600
                                    flex flex-col gap-4 overflow-hidden
                                `}
                            >
                                {/* Header Row */}
                                <div className="flex justify-between items-start relative z-10">
                                    <div className={`
                                        p-2.5 rounded-lg border border-zinc-800 bg-zinc-950 flex items-center justify-center
                                        ${habit.color.replace('text-', 'text-opacity-80 text-')}
                                    `}>
                                        <habit.icon className="w-5 h-5" />
                                    </div>
                                    
                                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-zinc-950 border border-zinc-800">
                                        <Star className="w-3 h-3 text-zinc-500 fill-zinc-500" />
                                        <span className="text-xs font-mono font-bold text-zinc-300">
                                            {data?.currentPoints ?? 0}
                                        </span>
                                    </div>
                                </div>

                                {/* Title & Stats Row */}
                                <div className="relative z-10">
                                    <h3 className="text-sm font-bold text-zinc-200 mb-1 truncate">
                                        {habit.title}
                                    </h3>
                                    <div className="flex justify-between items-center text-xs text-zinc-500 font-medium">
                                        <span>Consistency</span>
                                        <span className="text-zinc-400">{data?.currentDays ?? 0} / {habit.days} Days</span>
                                    </div>
                                </div>

                                {/* Progress Bar Row */}
                                <div className="relative z-10 space-y-2 mt-auto">
                                    <div className="flex justify-between text-[10px] font-bold text-zinc-600 uppercase tracking-wider">
                                        <span>Progress</span>
                                        <span className={habit.color}>{currentProgress}%</span>
                                    </div>
                                    
                                    {/* Tech-Style Slim Bar */}
                                    <div className="h-1.5 w-full bg-zinc-950 rounded-full overflow-hidden border border-zinc-800/50">
                                        <div
                                            className={`h-full rounded-full ${habit.color.replace('text-', 'bg-')} transition-all duration-1000 ease-out opacity-90`}
                                            style={{
                                                width: hasStarted ? `${currentProgress}%` : '5%'
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        );
                    })}
                </div>
            </section>
        </div>
    )
}

export default SelectedHabbits;