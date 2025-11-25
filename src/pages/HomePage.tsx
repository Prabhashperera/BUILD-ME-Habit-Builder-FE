import { useState } from 'react';
import {
    Moon, Utensils, BookOpen, Dumbbell,
    ChevronRight, Star,
    Flame,
    Clock, Book, Salad
} from 'lucide-react';
import Navbar from '../components/Navbar';
// import habitsList from '../data/habitsList';

const HomePage = () => {
    // State to track the currently active habit tab for the logging form
    const [activeTab, setActiveTab] = useState(1);

    // Mock Data for Habits
    const habits = [
        {
            id: 1,
            title: "Sleep Mastery",
            icon: Moon,
            color: "text-violet-400",
            glowColor: "shadow-violet-500/20",
            borderColor: "border-violet-500/30",
            bgGradient: "from-violet-500/10 to-purple-500/5",
            progress: 70, // %
            daysCompleted: 21,
            totalDays: 30,
            points: 450,
            type: "sleep"
        },
        {
            id: 2,
            title: "Clean Eating",
            icon: Utensils,
            color: "text-orange-400",
            glowColor: "shadow-orange-500/20",
            borderColor: "border-orange-500/30",
            bgGradient: "from-orange-500/10 to-amber-500/5",
            progress: 45,
            daysCompleted: 14,
            totalDays: 30,
            points: 320,
            type: "eating"
        },
        {
            id: 3,
            title: "Deep Reading",
            icon: BookOpen,
            color: "text-sky-400",
            glowColor: "shadow-sky-500/20",
            borderColor: "border-sky-500/30",
            bgGradient: "from-sky-500/10 to-blue-500/5",
            progress: 10,
            daysCompleted: 3,
            totalDays: 30,
            points: 50,
            type: "reading"
        },
        {
            id: 4,
            title: "Iron Temple",
            icon: Dumbbell,
            color: "text-emerald-400",
            glowColor: "shadow-emerald-500/20",
            borderColor: "border-emerald-500/30",
            bgGradient: "from-emerald-500/10 to-teal-500/5",
            progress: 85,
            daysCompleted: 26,
            totalDays: 30,
            points: 600,
            type: "exercise"
        }
    ];

    // Get the active habit object
    const currentHabit = habits.find(h => h.id === activeTab) || habits[0];

    return (
        <div className="min-h-screen w-full bg-slate-950 font-sans text-white selection:bg-emerald-500/30 pb-20 overflow-x-hidden relative">

            {/* --- Ambient Background Glows --- */}
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute top-[20%] right-[-20%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] mix-blend-screen" />
                <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
            </div>

            {/* --- 1. Top Navbar --- */}
            <Navbar />

            <div className="relative z-10 max-w-7xl mx-auto px-4 md:px-6 pt-8 space-y-10">

                {/* --- 2. Ongoing Habits Section (Grid) --- */}
                <section>
                    <div className="flex items-center justify-between mb-6 px-2">
                        <h2 className="text-2xl font-bold text-white tracking-tight">Your Journey</h2>
                        <button className="text-sm font-medium text-slate-400 hover:text-white transition-colors flex items-center gap-1">
                            View All <ChevronRight className="w-4 h-4" />
                        </button>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-5">
                        {habits.map((habit) => (
                            <div
                                key={habit.id}
                                className={`
                                    group relative p-5 rounded-3xl border bg-slate-900/40 backdrop-blur-md transition-all duration-300
                                    hover:-translate-y-1 hover:shadow-2xl ${habit.glowColor} ${habit.borderColor}
                                    border-white/5 hover:border-white/20 overflow-hidden cursor-pointer
                                `}
                            >
                                {/* Gradient Background */}
                                <div className={`absolute inset-0 bg-linear-to-br ${habit.bgGradient} opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />

                                <div className="relative z-10 flex flex-col h-full justify-between gap-4">
                                    {/* Header */}
                                    <div className="flex justify-between items-start">
                                        <div className={`p-3 rounded-2xl bg-slate-950/50 border border-white/10 ${habit.color}`}>
                                            <habit.icon className="w-6 h-6" />
                                        </div>
                                        <div className="flex items-center gap-1 px-2 py-1 rounded-lg bg-white/5 border border-white/5 backdrop-blur-sm">
                                            <Star className="w-3 h-3 text-yellow-400 fill-yellow-400" />
                                            <span className="text-xs font-bold text-white">{habit.points}</span>
                                        </div>
                                    </div>

                                    {/* Info */}
                                    <div>
                                        <h3 className="text-lg font-bold text-white mb-1 group-hover:text-emerald-50 transition-colors">{habit.title}</h3>
                                        <p className="text-xs font-medium text-slate-400">
                                            {habit.daysCompleted} / {habit.totalDays} Days Completed
                                        </p>
                                    </div>

                                    {/* Progress Bar */}
                                    <div className="space-y-2">
                                        <div className="flex justify-between text-xs font-bold text-slate-500 uppercase tracking-wider">
                                            <span>Progress</span>
                                            <span className={habit.color}>{habit.progress}%</span>
                                        </div>
                                        <div className="h-2 w-full bg-slate-950 rounded-full overflow-hidden border border-white/5">
                                            <div
                                                className={`h-full rounded-full ${habit.color.replace('text-', 'bg-')} transition-all duration-1000 ease-out`}
                                                style={{ width: `${habit.progress}%` }}
                                            />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </section>


                {/* --- 3. Dynamic Habit Switcher (Mini Navbar) --- */}
                <section className="sticky top-20 z-40 bg-slate-950/80 backdrop-blur-xl border-y border-white/5 py-2 -mx-4 md:-mx-6 px-4 md:px-6">
                    <div className="flex items-center gap-4 overflow-x-auto no-scrollbar pb-1">
                        {habits.map((habit) => {
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
                                    <span className="text-sm font-bold text-white">12 Day Streak</span>
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