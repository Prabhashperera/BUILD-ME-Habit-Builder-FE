import { useEffect, useState } from 'react';
import { Flame, Clock, Book, Salad } from 'lucide-react';
import SelectedHabbits from '../components/SelectedHabbits';
import habitsForHomePage from '../data/HabitsListForHomePage';
import axios from 'axios';
import BACK_END_URL from '../assets/Links';

const HomePage = () => {
    const GETDATEROUTE = "/getcurrentdate"
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

    useEffect(() => {
        try {
            const accessToken = localStorage.getItem("accessToken")
            const getOnGoingDate = async () => {
                const res = await axios.get(`${BACK_END_URL + GETDATEROUTE}`, {
                    headers: { Authorization: `Bearer ${accessToken}` }
                })
                setOnGoingDate(res.data.data)
            }
            getOnGoingDate()
        } catch (err) {
            console.log(err);
        }
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
                <section className="max-w-3xl mx-auto">
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
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            {/* Slept Time */}
                                            <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/5 hover:border-violet-500/30 transition-colors group">
                                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Slept Time</label>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-5 h-5 text-violet-400" />
                                                    <input type="time" defaultValue="21:00" className="bg-transparent text-lg font-bold text-white outline-none w-full" />
                                                </div>
                                            </div>
                                            {/* Wake up Time */}
                                            <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/5 hover:border-violet-500/30 transition-colors group">
                                                <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Wake Up Time</label>
                                                <div className="flex items-center gap-2">
                                                    <Clock className="w-5 h-5 text-violet-400" />
                                                    <input type="time" defaultValue="07:00" className="bg-transparent text-lg font-bold text-white outline-none w-full" />
                                                </div>
                                            </div>
                                        </div>

                                        <div className="space-y-3">
                                            <div className="flex justify-between items-center">
                                                <label className="text-sm font-semibold text-slate-300">Sleep Quality</label>
                                                <span className="text-violet-400 font-bold">85%</span>
                                            </div>
                                            <input type="range" className="w-full h-2 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-violet-500" />
                                            <div className="flex justify-between text-xs text-slate-500 font-medium px-1">
                                                <span>Groggy</span>
                                                <span>Restless</span>
                                                <span>Refreshed</span>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentHabit.type === 'reading' && (
                                    <div className="space-y-6">
                                        <div className="p-5 rounded-2xl bg-slate-950/50 border border-white/5 hover:border-sky-500/30 transition-colors">
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-3">Pages Read Today</label>
                                            <div className="flex items-center justify-between">
                                                <button className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-sky-500 hover:text-white text-slate-400 flex items-center justify-center transition-all font-bold text-xl">-</button>
                                                <div className="text-4xl font-black text-white font-mono">24</div>
                                                <button className="w-10 h-10 rounded-xl bg-slate-800 hover:bg-sky-500 hover:text-white text-slate-400 flex items-center justify-center transition-all font-bold text-xl">+</button>
                                            </div>
                                        </div>

                                        <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/5">
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Book Title</label>
                                            <div className="flex items-center gap-3">
                                                <Book className="w-5 h-5 text-sky-400" />
                                                <input type="text" placeholder="Atomic Habits" className="bg-transparent w-full text-white placeholder-slate-600 focus:outline-none font-medium" />
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentHabit.type === 'exercise' && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-2 gap-4">
                                            <button className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 font-bold text-center hover:bg-emerald-500/20 transition-all">
                                                Cardio
                                            </button>
                                            <button className="p-4 rounded-2xl bg-slate-950/50 border border-white/5 text-slate-400 font-bold text-center hover:bg-slate-900 transition-all hover:text-white">
                                                Strength
                                            </button>
                                        </div>

                                        <div className="p-5 rounded-2xl bg-slate-950/50 border border-white/5">
                                            <label className="block text-xs font-bold text-slate-500 uppercase mb-3">Duration (Minutes)</label>
                                            <div className="relative pt-6 pb-2">
                                                <div className="absolute top-0 left-0 w-full h-1 bg-slate-800 rounded-full"></div>
                                                <div className="absolute top-0 left-0 w-3/4 h-1 bg-emerald-500 rounded-full shadow-[0_0_10px_rgba(16,185,129,0.5)]"></div>
                                                <div className="absolute -top-1.5 left-[75%] w-4 h-4 bg-white rounded-full shadow-lg cursor-pointer transform hover:scale-125 transition-transform"></div>
                                                <div className="text-center mt-4 text-3xl font-bold text-white">45 <span className="text-sm font-medium text-slate-500">min</span></div>
                                            </div>
                                        </div>
                                    </div>
                                )}

                                {currentHabit.type === 'eating' && (
                                    <div className="space-y-6">
                                        <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                                            {['Breakfast', 'Lunch', 'Dinner'].map((meal) => (
                                                <div key={meal} className="p-4 rounded-2xl bg-slate-950/50 border border-white/5 hover:border-orange-500/30 cursor-pointer group transition-all">
                                                    <div className="flex items-center justify-between mb-2">
                                                        <span className="text-sm font-bold text-slate-300 group-hover:text-white">{meal}</span>
                                                        <div className="w-5 h-5 rounded-full border-2 border-slate-700 group-hover:border-orange-500 group-hover:bg-orange-500 transition-all"></div>
                                                    </div>
                                                    <div className="text-xs text-slate-500">Not logged</div>
                                                </div>
                                            ))}
                                        </div>

                                        <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/5 flex items-center justify-between">
                                            <div className="flex items-center gap-3">
                                                <div className="p-2 rounded-lg bg-orange-500/10">
                                                    <Salad className="w-6 h-6 text-orange-400" />
                                                </div>
                                                <div>
                                                    <div className="text-sm font-bold text-white">Calorie Goal</div>
                                                    <div className="text-xs text-slate-500">1200 / 2200 kcal</div>
                                                </div>
                                            </div>
                                            <div className="w-16 h-16 relative flex items-center justify-center">
                                                <svg className="w-full h-full transform -rotate-90">
                                                    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" className="text-slate-800" />
                                                    <circle cx="32" cy="32" r="28" stroke="currentColor" strokeWidth="4" fill="transparent" strokeDasharray="175.9" strokeDashoffset="80" className="text-orange-500" />
                                                </svg>
                                                <span className="absolute text-[10px] font-bold">54%</span>
                                            </div>
                                        </div>
                                    </div>
                                )}
                            </div>

                            {/* Submit Button */}
                            <button className={`
                                w-full mt-8 py-4 rounded-xl font-bold text-lg text-slate-950 shadow-lg 
                                bg-linear-to-r hover:scale-[1.02] active:scale-[0.98] transition-all duration-300
                                ${currentHabit.type === 'sleep' ? 'from-violet-400 to-indigo-400 shadow-violet-500/20' : ''}
                                ${currentHabit.type === 'reading' ? 'from-sky-400 to-blue-400 shadow-sky-500/20' : ''}
                                ${currentHabit.type === 'exercise' ? 'from-emerald-400 to-teal-400 shadow-emerald-500/20' : ''}
                                ${currentHabit.type === 'eating' ? 'from-orange-400 to-amber-400 shadow-orange-500/20' : ''}
                            `}>
                                Log Activity
                            </button>

                        </div>
                    </div>
                </section>
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