/* eslint-disable @typescript-eslint/no-explicit-any */
import { Clock, Moon, Info, Activity, BedSingle, Sun, Save, Loader2, BarChart3 } from "lucide-react"
import { useDispatch, useSelector } from "react-redux"
import { saveSleepLog } from "../../store/slices/sleepLogSlice"
import { useEffect, useState } from "react"
import { toast } from "react-toastify"
import SleepAnalysis from "../SleepAnalysis"
import api from "../../api/axiosConfig"

function SleepForm(props: any) {
    const dispatch = useDispatch<any>()
    const { isLoading, data, error } = useSelector((state: any) => state.sleepHabit)
    const [sleptAt, setSleptAt] = useState("21:00")
    const [wokeAt, setWokeAt] = useState("07:00")
    const [quality, setQuality] = useState(85)
    // state to track if the user clicked the button
    const [isSubmitting, setIsSubmitting] = useState(false)

    const handleLogClick = (e: any) => {
        e.preventDefault();
        try {
            if (!sleptAt || !wokeAt) {
                return toast.error("Fields cannot be empty!");
            }
            dispatch(
                saveSleepLog({ wokeAt, sleptAt })
            )
            setIsSubmitting(true)
        } catch (err) {
            toast.error("Erro : " + err);
            setIsSubmitting(false)
        }
    }

    useEffect(() => {
        try {
            // Only run if we are currently submitting and loading has finished
            if (!isLoading && isSubmitting) {
                if (error) {
                    console.error(error);
                    toast.error("Failed to save sleep log.");
                } else {
                    // If there is no error, we assume success
                    console.log(data)
                    toast.success("Sleep log saved successfully!");
                }
                setTimeout(() => {
                    window.location.reload();
                }, 2500);
                // Reset the submitting flag so it doesn't fire again automatically
                setIsSubmitting(false);
            }
        } catch (err) {
            console.log(err);
        }
    }, [isLoading, isSubmitting, data, error])

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
        if (props.currentDate < 30) return

        const getAiAnalysis = async () => {
            try {
                setAiLoading(true)

                const accessToken = localStorage.getItem("accessToken")
                if (!accessToken) return

                const response = await api.get(
                    "habit/getFinalAiAnalysis",
                    {
                        headers: { Authorization: `Bearer ${accessToken}` }
                    }
                )
                if (response.data.data) {
                    setAiAnalysis(response.data.data)
                } else {
                    await fetchAiAnalysis()
                }
            } catch (err) {
                console.error("AI analysis failed", err)
            } finally {
                setAiLoading(false)
            }
        }

        // sdsss
        const fetchAiAnalysis = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken")
                if (!accessToken) return

                const response = await api.get(
                    "habit/generatefinalanalysis",
                    {
                        headers: { Authorization: `Bearer ${accessToken}` }
                    }
                )
                const isSaved = await api.post("habit/saveFinalAiAnalysis",
                    {
                        aiAnalysis: response.data.data,   // body data here
                    },
                    {
                        headers: {
                            Authorization: `Bearer ${accessToken}`,
                        },
                    }
                )
                setAiAnalysis(response.data.data)
                if (isSaved.status == 200) {
                    toast.info("Ai Analysis Saved!!")
                } else {
                    toast.error("Ai Analysis Not Saved!!")
                }
            } catch (err) {
                console.error("AI analysis failed", err)
            } finally {
                setAiLoading(false)
            }
        }

        getAiAnalysis()
    }, [props.currentDate])


    return (
        <>
            {props.currentDate < 30 ?
                <div className="w-full flex items-center justify-center">

                    {/* MAIN CONTAINER: Changed from violet/blur to Zinc/Border */}
                    <div className="w-full grid grid-cols-1 lg:grid-cols-12 bg-[#09090b] border border-zinc-800 rounded-2xl overflow-hidden">

                        {/* LEFT SIDE: Educational Content 
                            STYLE: Changed from Gradient to Solid Dark Zinc
                        */}
                        <div className="lg:col-span-5 relative p-8 border-b lg:border-b-0 lg:border-r border-zinc-800 flex flex-col justify-between bg-zinc-900/50">
                            
                            {/* Decorative Grid instead of Blobs */}
                            <div className="absolute inset-0 bg-[linear-gradient(to_right,#27272a_1px,transparent_1px),linear-gradient(to_bottom,#27272a_1px,transparent_1px)] bg-[size:2rem_2rem] opacity-20 pointer-events-none" />

                            <div className="space-y-8 relative z-10">
                                <div>
                                    <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-zinc-800 border border-zinc-700 text-zinc-400 text-xs font-bold uppercase tracking-wider mb-4">
                                        <Activity className="w-3 h-3" /> Challenge Rules
                                    </div>
                                    
                                    <h2 className="text-2xl lg:text-3xl font-bold text-white mb-3 leading-tight">
                                        Sleep Habit <br />
                                        <span className="text-zinc-400">Protocol</span>
                                    </h2>
                                    <p className="text-zinc-500 text-sm leading-relaxed max-w-md">
                                        Follow the global sleep research guidelines to maximize your recovery score.
                                    </p>
                                </div>

                                <div className="grid grid-cols-1 gap-4">
                                    <div className="flex gap-4 items-center p-3 rounded-lg border border-zinc-800/50 hover:border-zinc-700 transition-colors bg-zinc-950/30">
                                        <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800">
                                            <BedSingle className="w-5 h-5 text-indigo-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-zinc-200 text-sm font-bold">Sleep Time</h4>
                                            <p className="text-xs text-zinc-500">10:00 PM – 11:00 PM • 1 Point </p>
                                        </div>
                                    </div>
                                    <div className="flex gap-4 items-center p-3 rounded-lg border border-zinc-800/50 hover:border-zinc-700 transition-colors bg-zinc-950/30">
                                        <div className="w-10 h-10 rounded-lg bg-zinc-900 flex items-center justify-center shrink-0 border border-zinc-800">
                                            <Sun className="w-5 h-5 text-amber-400" />
                                        </div>
                                        <div>
                                            <h4 className="text-zinc-200 text-sm font-bold">Wakeup Time</h4>
                                            <p className="text-xs text-zinc-500">5:30 AM – 6:30 AM • 1 Point</p>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="mt-8 pt-6 border-t border-zinc-800 relative z-10">
                                <div className="flex items-center gap-3">
                                    <Info className="w-4 h-4 text-zinc-600" />
                                    <p className="text-xs text-zinc-600">
                                        Consistent timing regulates circadian rhythm.
                                    </p>
                                </div>
                            </div>
                        </div>

                        {/* RIGHT SIDE: The Form 
                            STYLE: Clean Input fields, Technical Look
                        */}
                        <div className="lg:col-span-7 p-6 lg:p-10 bg-[#09090b] flex flex-col justify-center">

                            <div className="w-full space-y-8">

                                <div className="flex items-center justify-between mb-2">
                                    <div>
                                        <h3 className="text-xl font-bold text-white">Log Session</h3>
                                        <p className="text-zinc-500 text-xs mt-1">Record your sleep data accurately.</p>
                                    </div>
                                </div>

                                {/* Times Grid */}
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    {/* Slept Time */}
                                    <div className="space-y-2 group">
                                        <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-wide group-focus-within:text-indigo-400 transition-colors">
                                            <Moon className="w-3 h-3" /> Bedtime
                                        </label>
                                        <div className="relative">
                                            <input 
                                                type="time" 
                                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all cursor-pointer"
                                                value={sleptAt}
                                                onChange={(e) => setSleptAt(e.target.value)}
                                            />
                                        </div>
                                    </div>

                                    {/* Wake up Time */}
                                    <div className="space-y-2 group">
                                        <label className="flex items-center gap-2 text-[10px] font-bold text-zinc-500 uppercase tracking-wide group-focus-within:text-amber-400 transition-colors">
                                            <Clock className="w-3 h-3" /> Wake Up
                                        </label>
                                        <div className="relative">
                                            <input 
                                                type="time" 
                                                className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all cursor-pointer"
                                                value={wokeAt}
                                                onChange={(e) => setWokeAt(e.target.value)}
                                            />
                                        </div>
                                    </div>
                                </div>

                                <div className="h-px bg-zinc-800/50 w-full" />

                                {/* Quality Slider */}
                                <div className="space-y-4">
                                    <div className="flex justify-between items-end">
                                        <div>
                                            <label className="text-sm font-bold text-white block mb-0.5">Recovery Quality</label>
                                            <span className="text-xs text-zinc-500">Subjective analysis score</span>
                                        </div>
                                        <div className={`flex items-baseline gap-1 font-mono ${quality > 80 ? 'text-emerald-400' : quality > 50 ? 'text-yellow-400' : 'text-rose-400'}`}>
                                            <span className="text-2xl font-bold">{quality}</span>
                                            <span className="text-xs font-bold text-zinc-600">%</span>
                                        </div>
                                    </div>

                                    <input
                                        type="range"
                                        min="0" max="100"
                                        value={quality}
                                        onChange={(e) => setQuality(parseInt(e.target.value))}
                                        className="w-full h-1.5 bg-zinc-900 rounded-full appearance-none cursor-pointer accent-white hover:accent-zinc-200 transition-all mb-2"
                                    />

                                    <div className="flex justify-between text-[10px] uppercase tracking-widest text-zinc-600 font-bold px-1">
                                        <span>Lethargic</span>
                                        <span>Optimal</span>
                                    </div>
                                </div>

                                {/* Submit Button */}
                                <button 
                                    disabled={isLoading} 
                                    className="w-full py-3.5 rounded-lg font-bold text-sm text-black bg-white hover:bg-zinc-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-white/5 transition-all flex items-center justify-center gap-2"
                                    onClick={handleLogClick}
                                >
                                    {isLoading ? (
                                        <div className="flex items-center gap-2">
                                            <Loader2 className="w-4 h-4 animate-spin" /> 
                                            <span>Processing...</span>
                                        </div>
                                    ) : (
                                        <>
                                            <Save className="w-4 h-4" />
                                            <span>Commit Entry</span>
                                        </>
                                    )}
                                </button >
                            </div>
                        </div>
                    </div>
                </div>
                : aiLoading ? (
                    <div className="flex flex-col items-center justify-center py-20 space-y-4">
                        <div className="w-10 h-10 border-2 border-zinc-800 border-t-white rounded-full animate-spin" />
                        <div className="text-zinc-500 text-sm font-mono">Generating analysis protocol...</div>
                    </div>
                ) : aiAnalysis ? (
                    <div className="w-full border border-zinc-800 rounded-2xl overflow-hidden">
                        <div className="bg-zinc-900/50 p-4 border-b border-zinc-800 flex items-center gap-2 text-indigo-400">
                             <BarChart3 className="w-5 h-5" />
                             <span className="text-xs font-bold uppercase tracking-wider">Analysis Report</span>
                        </div>
                        <SleepAnalysis analysis={aiAnalysis} />
                    </div>
                ) : (
                    <div className="text-zinc-500 text-center py-20 border border-dashed border-zinc-800 rounded-2xl bg-zinc-900/20">
                        <Info className="w-8 h-8 mx-auto mb-3 text-zinc-700" />
                        <p className="text-sm">No analysis data available</p>
                    </div>
                )
            }
        </>
    )
}

export default SleepForm;