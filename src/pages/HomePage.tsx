/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Flame } from 'lucide-react';
import SelectedHabbits from '../components/SelectedHabbits';
import habitsForHomePage from '../data/HabitsListForHomePage';
import SleepForm from '../components/forms/SleepForm';
import ReadForm from '../components/forms/ReadForm';
import EatForm from '../components/forms/EatForm';
import ExcerciseForm from '../components/forms/ExcerciseForm';
import SleepHistoryCard from '../components/SleepHistoryCard';
import api from '../api/axiosConfig';

const HomePage = () => {
    // State to track the currently active habit tab for the logging form
    const [activeTab, setActiveTab] = useState(1);
    // Get the active habit object
    const currentHabit = habitsForHomePage.find(h => h.id === activeTab) || habitsForHomePage[0];

    // FIlter the selected Habits from localsotrage and filter it from habit list
    const selectedHabitIds = JSON.parse(localStorage.getItem("habitsList") || "[]")
    const filteredHabits = habitsForHomePage.filter((habit) => {
        return selectedHabitIds.includes(habit.id)
    })

    const [onGoingDate, setOnGoingDate] = useState("")

    // Take Current Ongoing Date from Backend
    useEffect(() => {
        let isMounted = true
        try {
            const accessToken = localStorage.getItem("accessToken")
            const getOnGoingDate = async () => {
                const res = await api.get("/habit/getcurrentdate", {
                    headers: { Authorization: `Bearer ${accessToken}` }
                })
                setOnGoingDate(res.data.data)
            }
            getOnGoingDate()
            if (isMounted) { isMounted = false } // Unmount the component
        } catch (err) {
            console.log(err);
        }

    }, [])

    const [logsData, setLogsData] = useState<any[]>([])

    // Get Logs Data
    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken")
        const getAllLogs = async () => {
            const res = await api.get("/habit/getuserAllLogs", {
                headers: { Authorization: `Bearer ${accessToken}` }
            })
            console.log(res.data.data.userLogs);
            setLogsData(res.data.data.userLogs)
        }
        getAllLogs()
    }, [])


    return (
        <div>
            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-8 space-y-10">

                {/* --- Ongoing Habits Section --- */}
                <SelectedHabbits />

                {/* --- Dynamic Habit Switcher (Mini Navbar) --- */}
                <section className="sticky top-20 z-40 bg-slate-950/80 backdrop-blur-xl border-y border-white/5 py-2 -mx-4 md:-mx-6 px-4 md:px-6">
                    <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-1">
                        {filteredHabits.map((habit) => {
                            const isActive = activeTab === habit.id;
                            return (
                                <button
                                    key={habit.id}
                                    onClick={() => setActiveTab(habit.id)}
                                    className={`
                                        flex items-center gap-2 px-5 py-2.5 rounded-full border transition-all duration-300 whitespace-nowrap
                                        ${isActive
                                            ? `bg-slate-800 text-white border-white/20 shadow-lg ${habit.color.replace('text-', 'shadow-').replace('400', '500')}/20`
                                            : 'bg-transparent text-slate-500 border-transparent hover:bg-white/5 hover:text-slate-300'
                                        }
                                    `}
                                >
                                    <habit.icon className={`w-4 h-4 ${isActive ? habit.color : 'text-slate-500'}`} />
                                    <span className="text-sm font-semibold">{habit.title}</span>
                                </button>
                            );
                        })}
                    </div>
                </section>


                {/* --- 4. Dynamic Content Area (Daily Log Form) --- */}
                <section className="max-w-[1800px] mx-auto">
                    <div className="relative overflow-hidden rounded-4xl border border-white/10 bg-slate-900/40 backdrop-blur-2xl shadow-2xl">

                        {/* Dynamic Top Gradient based on active habit */}
                        <div className={`absolute top-0 left-0 right-0 h-1 bg-linear-to-r ${currentHabit.bgGradient.replace('from-', 'from-').replace('to-', 'to-').replace('/10', '').replace('/5', '')}`} />

                        <div className="p-8 md:p-10">
                            <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
                                <div>
                                    <h2 className="text-2xl font-bold text-white flex items-center gap-2">
                                        Log Today's <span className={currentHabit.color}>{currentHabit.title}</span>
                                    </h2>
                                    <p className="text-slate-400 text-sm mt-1">Consistency is the key to mastery.</p>
                                </div>
                                <div className="px-4 py-2 rounded-xl bg-slate-950 border border-white/10 flex items-center gap-2">
                                    <Flame className="w-5 h-5 text-orange-500" />
                                    <span className="text-sm font-bold text-white">{
                                        onGoingDate == "0"
                                            ? `Good Luck on 1st Day`
                                            : `${onGoingDate} Days Completed`}
                                    </span>
                                </div>
                            </div>

                            {/* Form Content Switcher */}
                            <div className="animate-fadeIn">
                                {currentHabit.type === 'sleep' && (
                                    <>
                                        <SleepForm currentDate={onGoingDate} />
                                    </>
                                )}

                                {currentHabit.type === 'reading' && (
                                    <ReadForm />
                                )}

                                {currentHabit.type === 'exercise' && (
                                    <ExcerciseForm />
                                )}

                                {currentHabit.type === 'eating' && (
                                    <EatForm />
                                )}
                            </div>

                            {/* Submit Button
                            <button className={`
                                w-full mt-8 py-4 rounded-xl font-bold text-lg text-slate-950 shadow-lg 
                                bg-linear-to-r hover:scale-[1.02] active:scale-[0.98] transition-all duration-300
                                ${currentHabit.type === 'sleep' ? 'from-violet-400 to-indigo-400 shadow-violet-500/20' : ''}
                                ${currentHabit.type === 'reading' ? 'from-sky-400 to-blue-400 shadow-sky-500/20' : ''}
                                ${currentHabit.type === 'exercise' ? 'from-emerald-400 to-teal-400 shadow-emerald-500/20' : ''}
                                ${currentHabit.type === 'eating' ? 'from-orange-400 to-amber-400 shadow-orange-500/20' : ''}
                            `}>
                                Log Activity
                            </button> */}

                        </div>
                    </div>
                </section>
                {/* Load HIstiry Data According to Habit Type */}
                {
                    currentHabit.type === 'sleep' && <div className="w-full space-y-4">
                        <h2 className="text-xl font-bold text-white mb-6">Recent Sleep Activities</h2>
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {[...logsData]?.reverse().map((log: any) => (
                                <SleepHistoryCard key={log.id} log={log} />
                            ))}
                        </div>
                    </div>
                }
            </div>

            <style>{`
                .no-scrollbar::-webkit-scrollbar {
                    display: none;
                }
                .no-scrollbar {
                    -ms-overflow-style: none;
                    scrollbar-width: none;
                }
                @keyframes fadeIn {
                    from { opacity: 0; transform: translateY(10px); }
                    to { opacity: 1; transform: translateY(0); }
                }
                .animate-fadeIn {
                    animation: fadeIn 0.4s ease-out forwards;
                }
            `}</style>
        </div>
    );
};

export default HomePage;