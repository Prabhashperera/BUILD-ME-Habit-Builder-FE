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
    // This function returns the correct grid class based on how many items exist
    const getGridClassName = (count: number) => {
        switch (count) {
            case 1:
                return "grid-cols-1"; // 1 item? Full width
            case 2:
                return "grid-cols-1 md:grid-cols-2"; // 2 items? Split in half
            case 3:
                return "grid-cols-1 md:grid-cols-2 lg:grid-cols-3"; // 3 items? Thirds
            default:
                return "grid-cols-1 md:grid-cols-2 lg:grid-cols-4"; // 4+ items? Quarters
        }
    }

    return (
        <div>
            <section>
                <div className="flex items-center justify-between mb-6 px-2">
                    <h2 className="text-2xl font-bold text-white tracking-tight">Your Journey</h2>
                    <button className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                        View All <ChevronRight className="w-4 h-4" />
                    </button>
                </div>

                {/* UPDATED: Dynamic Grid Class */}
                <div className={`grid gap-5 ${getGridClassName(selectedHabits.length)}`}>

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
                                    group relative p-6 rounded-3xl border bg-slate-900/40 backdrop-blur-md transition-all duration-300
                                    hover:-translate-y-1 hover:shadow-2xl 
                                    border-white/5 hover:border-white/20 overflow-hidden cursor-pointer
                                    ${habit.activeBorder} 
                                `}
                            >
                                {/* Gradient Background */}
                                <div className={`absolute inset-0 bg-linear-to-br ${habit.gradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                <div className="relative z-10 flex flex-col h-full justify-between gap-5">
                                    {/* Header */}
                                    <div className="flex justify-between items-start">
                                        <div className={`p-3.5 rounded-2xl bg-slate-950/50 border border-white/10 ${habit.color}`}>
                                            <habit.icon className="w-7 h-7" />
                                        </div>
                                        <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl bg-white/5 border border-white/5 backdrop-blur-sm">
                                            <Star className="w-3.5 h-3.5 text-yellow-400 fill-yellow-400" />
                                            <span className="text-sm font-bold text-white">
                                                {data?.currentPoints ?? 0}
                                            </span>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div>
                                        <h3 className="text-xl font-bold text-white mb-1.5 group-hover:text-emerald-50 transition-colors">
                                            {habit.title}
                                        </h3>
                                        <p className="text-sm font-medium text-slate-400">
                                            {data?.currentDays ?? 0} / {habit.days} Days Completed
                                        </p>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="space-y-2.5">
                                        <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                                            <span>Progress</span>
                                            <span className={habit.color}>{currentProgress}%</span>
                                        </div>
                                        <div className="h-2.5 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
                                            <div
                                                className={`h-full rounded-full ${habit.color.replace('text-', 'bg-')} transition-all duration-1000 ease-out`}
                                                style={{
                                                    width: hasStarted ? `${currentProgress}%` : '5%'
                                                }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </section>
        </div>
    )
}

export default SelectedHabbits;