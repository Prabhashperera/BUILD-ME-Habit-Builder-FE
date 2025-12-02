/* eslint-disable @typescript-eslint/no-explicit-any */
import { Clock } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { saveSleepLog } from "../../store/slices/sleepLogSlice"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import SleepHistoryCard from "../SleepHistoryCard"

function SleepForm() {
    const dispatch = useDispatch<any>()
    const { isLoading, data, error } = useSelector((state: any) => state.sleepHabit)
    const [sleptAt, setSleptAt] = useState("21:00")
    const [wokeAt, setWokeAt] = useState("07:00")
    const [isOpen, setIsOpen] = useState(false)


    const handleLogClick = (e: any) => {
        e.preventDefault();
        try {
            if (!sleptAt || !wokeAt) {
                return toast.error("Fields cannot be empty!");
            } dispatch(
                saveSleepLog({ wokeAt, sleptAt })
            )
        } catch (err) {
            console.log(err);
        }
    }

    useEffect(() => {
        try {
            console.log(data, error)
        } catch (err) {
            console.log(err);
        }
    }, [data, error])

    useEffect(() => {
        try {
            if (data) {
                // eslint-disable-next-line react-hooks/set-state-in-effect
                setIsOpen(true)
            }
        } catch (err: any) {
            console.log(err.massege);
        }
    }, [data])

    return (
        <>
            {/* Modal Showing UI */}
            {/* <AdviceModal
                isOpen={isOpen}
                onClose={() => setIsOpen(false)}
                advice={JSON.stringify(data?.data?.todayLog?.aiAdvice)}
                points={JSON.stringify(data?.data?.todayLog?.pointsAwarded)}
            /> */}

            {/* Content */}
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    {/* Slept Time */}
                    <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/5 hover:border-violet-500/30 transition-colors group">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Slept Time</label>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-violet-400" />
                            <input type="time" className="bg-transparent text-lg font-bold text-white outline-none w-full"
                                value={sleptAt}
                                onChange={(e) => setSleptAt(e.target.value)}
                            />
                        </div>
                    </div>
                    {/* Wake up Time */}
                    <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/5 hover:border-violet-500/30 transition-colors group">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Wake Up Time</label>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-violet-400" />
                            <input type="time" className="bg-transparent text-lg font-bold text-white outline-none w-full"
                                value={wokeAt}
                                onChange={(e) => setWokeAt(e.target.value)}
                            />
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

            {/* Submit Button */}
            <button disabled={isLoading} className="w-full mt-8 py-4 rounded-xl font-bold text-lg text-slate-950 shadow-lg 
                            bg-linear-to-r hover:scale-[1.02] active:scale-[0.98] transition-all duration-300
                            from-violet-400 to-indigo-400 shadow-violet-500/20"
                onClick={handleLogClick}
            >
                Log Activity
            </button >
            {/* Cards */}
            <div className="w-full space-y-4">
                <h2 className="text-xl font-bold text-white mb-6">Recent Activity</h2>
                {/* THE GRID LAYOUT:
                - grid-cols-1 : 1 card per row on mobile/tablet
                - lg:grid-cols-2 : 2 cards per row on laptop/desktop
                */}
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                    {historyLogs.map((log) => (
                        <SleepHistoryCard key={log.id} log={log} />
                    ))}
                </div>
            </div>
        </>
    )
}

export default SleepForm