/* eslint-disable @typescript-eslint/no-explicit-any */
import { Clock, Moon, Info, Activity, BedSingle, Sun } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { saveSleepLog } from "../../store/slices/sleepLogSlice"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import axios from "axios"
import BACK_END_URL from "../../assets/Links"
import SleepAnalysis from "../SleepAnalysis"

function SleepForm(props: any) {
    const dispatch = useDispatch<any>()
    const { isLoading, data, error } = useSelector((state: any) => state.sleepHabit)
    const [sleptAt, setSleptAt] = useState("21:00")
    const [wokeAt, setWokeAt] = useState("07:00")
    const [quality, setQuality] = useState(85)

    const handleLogClick = (e: any) => {
        e.preventDefault();
        try {
            if (!sleptAt || !wokeAt) {
                return toast.error("Fields cannot be empty!");
            }
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

    const [aiAnalysis, setAiAnalysis] = useState<any>(null)
    const [aiLoading, setAiLoading] = useState(false)

    useEffect(() => {
        if (props.currentDate < 20) return

        const fetchAiAnalysis = async () => {
            try {
                setAiLoading(true)

                const accessToken = localStorage.getItem("accessToken")
                if (!accessToken) return

                const response = await axios.get(
                    BACK_END_URL + "/generatefinalanalysis",
                    {
                        headers: { Authorization: `Bearer ${accessToken}` }
                    }
                )

                setAiAnalysis(response.data.data)
            } catch (err) {
                console.error("AI analysis failed", err)
            } finally {
                setAiLoading(false)
            }
        }

        fetchAiAnalysis()
    }, [props.currentDate])

    return (
        <>
            {props.currentDate < 20 ?
                // REMOVED: min-h-[80vh] to reduce vertical height
                <div className="w-full max-w-[1800px] mx-auto flex items-center justify-center">

                    {/* REMOVED: min-h-[700px] -> Let content define height */}
                    <div className="w-full grid grid-cols-1 lg:grid-cols-12 bg-slate-900/60 backdrop-blur-xl border border-white/10 rounded-3xl overflow-hidden shadow-2xl">

                        {/* LEFT SIDE: Educational Content 
                    REDUCED: Padding (p-16 -> p-10)
                */}
                        <div className="lg:col-span-5 relative p-8 lg:p-10 bg-linear-to-br from-indigo-600/20 via-slate-900/50 to-violet-900/20 border-b lg:border-b-0 lg:border-r border-white/5 flex flex-col justify-between">
                            {/* Decorative Blobs */}
                            <div className="absolute top-0 left-0 w-full h-full overflow-hidden -z-10 opacity-40">
                                <div className="absolute top-[-10%] left-[-10%] w-64 h-64 bg-violet-600/30 rounded-full blur-[100px]"></div>
                                <div className="absolute bottom-[-10%] right-[-10%] w-64 h-64 bg-blue-600/20 rounded-full blur-[100px]"></div>
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-indigo-500/10 border border-indigo-400/20 text-indigo-300 text-xs font-bold uppercase tracking-wider mb-4">
                                        <Activity className="w-3 h-3" /> Challenge Rules
                                    </div>
                                    {/* REDUCED: Text size */}
                                    <h2 className="text-3xl lg:text-4xl font-bold text-white mb-3 leading-tight">
                                        Introduction to the <br />
                                        <span className="text-transparent bg-clip-text bg-linear-to-r from-violet-400 to-indigo-400">
                                            Sleep Habit Challenge
                                        </span>
                                    </h2>
                                    <p className="text-slate-400 text-sm lg:text-base leading-relaxed max-w-md">
                                        According the World Health Organization (WHO) and global sleep research guidelines.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    <div className="flex gap-4 items-center">
                                        <div className="w-10 h-10 rounded-xl bg-violet-500/10 flex items-center justify-center shrink-0 border border-violet-500/10">
                                            <BedSingle className="w-5 h-5 text-violet-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-white text-base font-semibold">Sleep Time</h4>
                                            <p className="text-xs text-slate-500">Time: 10:00 PM – 11:00 PM - 1 Point </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-center">
                                        <div className="w-10 h-10 rounded-xl bg-indigo-500/10 flex items-center justify-center shrink-0 border border-indigo-500/10">
                                            <Sun className="w-5 h-5 text-indigo-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-white text-base font-semibold">Wakeup Time</h4>
                                            <p className="text-xs text-slate-500">5:30 AM – 6:30 AM - 1 Point</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-white/5">
                                <div className="flex items-center gap-3">
                                    <Info className="w-4 h-4 text-slate-500" />
                                    <p className="text-xs text-slate-500">
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE: The Form 
                    REDUCED: Padding (p-20 -> p-10/12)
                */}
                        <div className="lg:col-span-7 p-6 lg:p-12 bg-slate-950/40 flex flex-col justify-center items-center">

                            <div className="w-full max-w-2xl space-y-6">

                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <h3 className="text-2xl font-bold text-white">Log Session</h3>
                                        <p className="text-slate-400 text-xs mt-1">Record your sleep data accurately.</p>
                                    </div>
                                </div>

                                {/* Times Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {/* Slept Time 
                                REDUCED: Padding (p-6 -> p-4) and Font Size (text-2xl -> text-xl)
                            */}
                                    <div className="p-4 rounded-2xl bg-slate-900 border border-white/5 hover:border-violet-500/30 transition-all duration-300 group shadow-lg shadow-black/20">
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 group-hover:text-violet-400 transition-colors">Bedtime</label>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-violet-500/10 group-hover:bg-violet-500/20 transition-colors">
                                                <Moon className="w-5 h-5 text-violet-400" />
                                            </div>
                                            <input type="time" className="bg-transparent text-xl font-bold text-white outline-none w-full scheme-dark cursor-pointer"
                                                value={sleptAt}
                                                onChange={(e) => setSleptAt(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {/* Wake up Time 
                                REDUCED: Padding (p-6 -> p-4) and Font Size (text-2xl -> text-xl)
                            */}
                                    <div className="p-4 rounded-2xl bg-slate-900 border border-white/5 hover:border-indigo-500/30 transition-all duration-300 group shadow-lg shadow-black/20">
                                        <label className="block text-[10px] font-bold text-slate-500 uppercase mb-2 group-hover:text-indigo-400 transition-colors">Wake Up</label>
                                        <div className="flex items-center gap-3">
                                            <div className="p-2 rounded-lg bg-indigo-500/10 group-hover:bg-indigo-500/20 transition-colors">
                                                <Clock className="w-5 h-5 text-indigo-400" />
                                            </div>
                                            <input type="time" className="bg-transparent text-xl font-bold text-white outline-none w-full scheme-dark cursor-pointer"
                                                value={wokeAt}
                                                onChange={(e) => setWokeAt(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                {/* Quality Slider */}
                                <div className="p-6 rounded-2xl bg-slate-900 border border-white/5 shadow-lg shadow-black/20">
                                    <div className="flex justify-between items-end mb-4">
                                        <div>
                                            <label className="text-base font-bold text-white block mb-0.5">Sleep Quality</label>
                                            <span className="text-xs text-slate-500">How refreshed do you feel?</span>
                                        </div>
                                        <div className={`flex items-baseline gap-1 ${quality > 80 ? 'text-emerald-400' : quality > 50 ? 'text-yellow-400' : 'text-rose-400'}`}>
                                            <span className="text-3xl font-black">{quality}</span>
                                            <span className="text-sm font-bold">%</span>
                                        </div>
                                    </div>

                                    <input
                                        type="range"
                                        min="0" max="100"
                                        value={quality}
                                        onChange={(e) => setQuality(parseInt(e.target.value))}
                                        className="w-full h-2 bg-slate-800 rounded-full appearance-none cursor-pointer accent-violet-500 hover:accent-violet-400 transition-all mb-3"
                                    />

                                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-slate-600 font-bold px-1">
                                        <span>Tired</span>
                                        <span>Okay</span>
                                        <span>Great</span>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button disabled={isLoading} className="w-full py-4 rounded-xl font-bold text-lg text-white shadow-xl 
                            bg-linear-to-r from-violet-600 to-indigo-600 
                            hover:from-violet-500 hover:to-indigo-500
                            hover:scale-[1.01] active:scale-[0.99] 
                            shadow-violet-900/20
                            transition-all duration-300 flex items-center justify-center gap-2 mt-2"
                                    onClick={handleLogClick}
                                >
                                    {isLoading ? (
                                        <span className="flex items-center gap-2">Saving...</span>
                                    ) : (
                                        <>Log Sleep Activity <Activity className="w-5 h-5" /></>
                                    )}
                                </button >
                            </div>
                        </div>
                    </div>
                </div>
                : aiLoading ? (
                    <div className="text-white text-center py-20">
                        Generating your sleep analysis...
                    </div>
                ) : aiAnalysis ? (
                    <SleepAnalysis analysis={aiAnalysis} />
                ) : (
                    <div className="text-slate-400 text-center py-20">
                        No analysis available yet
                    </div>
                )
            }
        </>
    )
}

export default SleepForm