/* eslint-disable @typescript-eslint/no-explicit-any */
import { Clock } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { saveSleepLog } from "../../store/slices/sleepLogSlice"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"

function SleepForm() {
    const dispatch = useDispatch<any>()
    const [isLoading, data, error] = useSelector((state: any) => state.sleepHabit)
    const [sleptAt, setSleptAt] = useState("")
    const [wokeAt, setWokeAt] = useState("")

    const handleLogClick = (e: any) => {
        e.preventDefault()
        try {
            if (wokeAt && sleptAt == "") { return toast.error("Fileds Cannot Be Empty!!") }
            dispatch(
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

    return (
        <>
            <div className="space-y-6">
                <div className="grid grid-cols-2 gap-4">
                    {/* Slept Time */}
                    <div className="p-4 rounded-2xl bg-slate-950/50 border border-white/5 hover:border-violet-500/30 transition-colors group">
                        <label className="block text-xs font-bold text-slate-500 uppercase mb-2">Slept Time</label>
                        <div className="flex items-center gap-2">
                            <Clock className="w-5 h-5 text-violet-400" />
                            <input type="time" defaultValue="21:00" className="bg-transparent text-lg font-bold text-white outline-none w-full"
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
                            <input type="time" defaultValue="07:00" className="bg-transparent text-lg font-bold text-white outline-none w-full"
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
        </>
    )
}

export default SleepForm