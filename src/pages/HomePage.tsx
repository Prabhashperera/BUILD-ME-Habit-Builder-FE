/* eslint-disable @typescript-eslint/no-explicit-any */
import { useEffect, useState } from 'react';
import { Flame, Activity, LayoutDashboard, Calendar, LogOut } from 'lucide-react';
import SelectedHabbits from '../components/SelectedHabbits';
import habitsForHomePage from '../data/HabitsListForHomePage';
import SleepForm from '../components/forms/SleepForm';
import ReadForm from '../components/forms/ReadForm';
import EatForm from '../components/forms/EatForm';
import ExcerciseForm from '../components/forms/ExcerciseForm';
import api from '../api/axiosConfig';
import SleepHistoryCard from '../components/SleepHistoryCard';

const HomePage = () => {
    const [activeTab, setActiveTab] = useState(1);
    const [onGoingDate, setOnGoingDate] = useState("0");
    const [logsData, setLogsData] = useState<any[]>([]);

    const currentHabit = habitsForHomePage?.find(h => h.id === activeTab) || habitsForHomePage?.[0];
    const selectedHabitIds = JSON.parse(localStorage.getItem("habitsList") || "[]");
    
    const filteredHabits = habitsForHomePage?.filter((habit) => {
        return selectedHabitIds.includes(habit.id);
    }) || [];

    // Keep existing data fetching logic...
    useEffect(() => {
        let isMounted = true;
        const accessToken = localStorage.getItem("accessToken");
        const getOnGoingDate = async () => {
            try {
                const res = await api.get("/habit/getcurrentdate", {headers: { Authorization: `Bearer ${accessToken}` }});
                if (isMounted && res.data && res.data.data !== undefined) setOnGoingDate(String(res.data.data));
            } catch (err) { console.log(err); }
        };
        if (accessToken) getOnGoingDate();
        return () => { isMounted = false; };
    }, []);

    useEffect(() => {
        const accessToken = localStorage.getItem("accessToken");
        const getAllLogs = async () => {
            try {
                const res = await api.get("/habit/getuserAllLogs", {headers: { Authorization: `Bearer ${accessToken}` }});
                const logs = res.data?.data?.userLogs || [];
                setLogsData(logs);
            } catch (err) { setLogsData([]); }
        };
        if (accessToken) getAllLogs();
    }, []);

    // Logout Button Handler
    const handleLogout = () => {
        // Clear user session
        localStorage.removeItem("accessToken");
        localStorage.removeItem("refreshToken");

        // Redirect to login page
        window.location.href = "/login";
    }

    if (!currentHabit) return <div className="min-h-screen flex items-center justify-center bg-[#09090b] text-zinc-500 font-mono text-sm">Loading workspace...</div>;

    return (
        <div className="min-h-screen bg-[#09090b] text-zinc-200 font-sans selection:bg-indigo-500/30 pb-20">
            
            {/* Top Navigation Bar */}
            <nav className="border-b border-zinc-800 bg-[#09090b]/80 backdrop-blur-md sticky top-0 z-40">
                <div className="max-w-[1600px] mx-auto px-6 h-16 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-zinc-900 border border-zinc-700 rounded-lg flex items-center justify-center">
                            <LayoutDashboard className="w-4 h-4 text-white" />
                        </div>
                        <span className="font-semibold text-white tracking-tight">BuildME</span>
                        <span className="text-zinc-600">/</span>
                        <span className="text-zinc-400 font-medium">Dashboard</span>
                    </div>

                    {/* Minimal Stats */}
                    <div className="flex items-center gap-6 text-sm">
                        <div className="flex items-center gap-2">
                            <Flame className="w-4 h-4 text-zinc-500" />
                            <span className="text-zinc-400">Streak:</span>
                            <span className="text-white font-mono font-medium">{onGoingDate}</span>
                        </div>
                        <div className="flex items-center gap-2">
                            <Activity className="w-4 h-4 text-zinc-500" />
                            <span className="text-zinc-400">Status:</span>
                            <span className="text-emerald-500 font-medium">Active</span>
                        </div>
                    </div>
                    {/* Logout Button */}
                    <button 
                        onClick={handleLogout}
                        className="flex items-center gap-2 text-xs font-mono uppercase tracking-widest text-slate-400 hover:text-red-400 transition-all duration-300 group">
                        <LogOut className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
                        Logout
                    </button>
                </div>
            </nav>

            <div className="max-w-[1600px] mx-auto px-6 md:px-10 pt-8 space-y-8">
                
                {/* 1. Habit Switcher (Clean Pills) */}
                {filteredHabits.length > 0 && (
                    <div className="flex flex-wrap gap-2">
                        {filteredHabits.map((habit) => {
                            const isActive = activeTab === habit.id;
                            return (
                                <button
                                    key={habit.id}
                                    onClick={() => setActiveTab(habit.id)}
                                    className={`
                                        flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium border transition-all duration-200
                                        ${isActive 
                                            ? 'bg-white text-black border-white shadow-sm' 
                                            : 'bg-zinc-900/50 text-zinc-500 border-zinc-800 hover:border-zinc-600 hover:text-zinc-300'
                                        }
                                    `}
                                >
                                    <habit.icon className="w-4 h-4" />
                                    {habit.title}
                                </button>
                            );
                        })}
                    </div>
                )}

                {/* 2. Main Content Grid */}
                <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
                    
                    {/* Top Section: Active Habits (Full Width) */}
                    <div className="xl:col-span-12">
                        <SelectedHabbits />
                    </div>

                    {/* Main Section: The Form Editor */}
                    <div className="xl:col-span-12">
                        <div className="bg-zinc-900/30 border border-zinc-800 rounded-2xl overflow-hidden">
                            
                            {/* Card Header */}
                            <div className="border-b border-zinc-800 px-6 py-4 flex items-center justify-between bg-zinc-900/50">
                                <div className="flex items-center gap-3">
                                    <div className={`w-8 h-8 rounded-md flex items-center justify-center ${currentHabit.color} bg-zinc-950 border border-zinc-800`}>
                                        <currentHabit.icon className="w-4 h-4" />
                                    </div>
                                    <h2 className="text-sm font-semibold text-white uppercase tracking-wider">
                                        Log Entry: {currentHabit.title}
                                    </h2>
                                </div>
                                <div className="text-xs text-zinc-500 font-mono">
                                    {new Date().toLocaleDateString()}
                                </div>
                            </div>

                            {/* Form Body */}
                            <div className="p-6 md:p-10">
                                {currentHabit.type === 'sleep' && <SleepForm currentDate={onGoingDate} />}
                                {currentHabit.type === 'reading' && <ReadForm />}
                                {currentHabit.type === 'exercise' && <ExcerciseForm />}
                                {currentHabit.type === 'eating' && <EatForm />}
                            </div>
                        </div>
                    </div>

                    {/* History Section */}
                    {currentHabit.type === 'sleep' && (
                        <div className="xl:col-span-12 space-y-4">
                            <div className="flex items-center gap-2 text-zinc-400">
                                <Calendar className="w-4 h-4" />
                                <h3 className="text-sm font-medium uppercase tracking-wider">Recent Logs</h3>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                {Array.isArray(logsData) && logsData.length > 0 ? (
                                    [...logsData].reverse().map((log: any) => (
                                        <div key={log._id || log.id} className="bg-zinc-900/30 border border-zinc-800 rounded-xl p-4 hover:border-zinc-700 transition-colors">
                                            <SleepHistoryCard log={log} />
                                        </div>
                                    ))
                                ) : (
                                    <div className="col-span-full py-10 text-center border border-dashed border-zinc-800 rounded-xl text-zinc-600 text-sm">
                                        No entries found in database.
                                    </div>
                                )}
                            </div>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default HomePage;