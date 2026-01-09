/* eslint-disable @typescript-eslint/no-explicit-any */
import habits from '../data/habitsList';
import { useEffect, useState } from 'react';
import api from '../api/axiosConfig';

function SelectedHabbits() {
    const selectedHabitIds = JSON.parse(localStorage.getItem("habitsList") || "[]")
    const selectedHabits = habits.filter((habit) => selectedHabitIds.includes(habit.id))
    const [progressData, setProgressData] = useState<any>({});

    useEffect(() => {
        const getProgressData = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken")
                const { data } = await api.get("/habit/sleepprogress", {
                    headers: { Authorization: `Bearer ${accessToken}` }
                })
                setProgressData(data.data)
            } catch (err) { console.log(err); }
        }
        getProgressData()
    }, [])

    return (
        <section className="w-full">
            <h3 className="text-xs font-semibold text-zinc-500 uppercase tracking-widest mb-4 pl-1">Active Stack</h3>
            
            {/* 4 Column Grid - Clean Status Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 w-full">
                {selectedHabits.map((habit) => {
                    const data = progressData[habit.type] || progressData[habit.type.toLowerCase()];
                    const currentProgress = data?.progress ?? 0;
                    
                    return (
                        <div key={habit.id} className="group flex items-center gap-4 bg-zinc-900/50 border border-zinc-800 rounded-xl p-4 hover:border-zinc-600 transition-colors">
                            
                            {/* Icon Box */}
                            <div className={`
                                w-10 h-10 rounded-lg flex items-center justify-center shrink-0 border border-zinc-800
                                bg-zinc-950 ${habit.color}
                            `}>
                                <habit.icon className="w-5 h-5" />
                            </div>

                            {/* Info & Bar */}
                            <div className="flex-1 min-w-0 space-y-2">
                                <div className="flex justify-between items-baseline">
                                    <h4 className="text-sm font-medium text-zinc-200 truncate">{habit.title}</h4>
                                    <span className="text-xs font-mono text-zinc-500">{currentProgress}%</span>
                                </div>
                                
                                {/* Clean Progress Line */}
                                <div className="h-1 w-full bg-zinc-800 rounded-full overflow-hidden">
                                    <div 
                                        className={`h-full rounded-full ${habit.color.replace('text-', 'bg-')} transition-all duration-500`}
                                        style={{ width: `${currentProgress}%` }}
                                    />
                                </div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default SelectedHabbits;