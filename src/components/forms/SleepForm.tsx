/* eslint-disable @typescript-eslint/no-explicit-any */
import { Clock, Moon, Sun, Save, BarChart3, Loader2 } from "lucide-react"
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
    const [isSubmitting, setIsSubmitting] = useState(false)

    // --- LOGIC: Submit Handler ---
    const handleLogClick = (e: any) => {
        e.preventDefault();
        try {
            if (!sleptAt || !wokeAt) {
                return toast.error("Fields cannot be empty!");
            }
            dispatch(saveSleepLog({ wokeAt, sleptAt }))
            setIsSubmitting(true)
        } catch (err) {
            toast.error("Error: " + err);
            setIsSubmitting(false)
        }
    }

    // --- LOGIC: Submission Success/Fail Side Effects ---
    useEffect(() => {
        try {
            if (!isLoading && isSubmitting) {
                if (error) {
                    console.error(error);
                    toast.error("Failed to save sleep log.");
                } else {
                    console.log(data)
                    toast.success("Log saved successfully.");
                    setTimeout(() => {
                        window.location.reload();
                    }, 1500);
                }
                setIsSubmitting(false);
            }
        } catch (err) { console.log(err); }
    }, [isLoading, isSubmitting, data, error])

    // --- LOGIC: AI Analysis (For Day 30) ---
    const [aiAnalysis, setAiAnalysis] = useState<any>(null)
    const [aiLoading, setAiLoading] = useState(false)

    useEffect(() => {
        if (props.currentDate < 30) return

        const getAiAnalysis = async () => {
            try {
                setAiLoading(true)
                const accessToken = localStorage.getItem("accessToken")
                if (!accessToken) return

                // Check for existing analysis
                const response = await api.get("habit/getFinalAiAnalysis", {
                    headers: { Authorization: `Bearer ${accessToken}` }
                })
                
                if (response.data.data) {
                    setAiAnalysis(response.data.data)
                } else {
                    // Generate new analysis
                    await fetchAiAnalysis()
                }
            } catch (err) {
                console.error("AI analysis failed", err)
            } finally {
                setAiLoading(false)
            }
        }

        const fetchAiAnalysis = async () => {
            try {
                const accessToken = localStorage.getItem("accessToken")
                if (!accessToken) return

                const response = await api.get("habit/generatefinalanalysis", {
                    headers: { Authorization: `Bearer ${accessToken}` }
                })
                
                const isSaved = await api.post("habit/saveFinalAiAnalysis", 
                    { aiAnalysis: response.data.data },
                    { headers: { Authorization: `Bearer ${accessToken}` } }
                )
                
                setAiAnalysis(response.data.data)
                if (isSaved.status === 200) toast.info("Analysis Generated")
            } catch (err) { console.error(err) }
        }

        getAiAnalysis()
    }, [props.currentDate])

    // --- RENDER ---
    return (
        <>
            {props.currentDate < 30 ? (
                // --- FORM VIEW ---
                <div className="w-full max-w-3xl mx-auto space-y-8">
                    
                    {/* Time Input Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        
                        {/* Bedtime Input */}
                        <div className="space-y-2 group">
                            <label className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-wide group-focus-within:text-indigo-400 transition-colors">
                                <Moon className="w-3.5 h-3.5" /> Bedtime
                            </label>
                            <div className="relative">
                                <input 
                                    type="time" 
                                    value={sleptAt}
                                    onChange={(e) => setSleptAt(e.target.value)}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all cursor-pointer"
                                />
                            </div>
                        </div>

                        {/* Wakeup Input */}
                        <div className="space-y-2 group">
                            <label className="flex items-center gap-2 text-xs font-bold text-zinc-500 uppercase tracking-wide group-focus-within:text-indigo-400 transition-colors">
                                <Sun className="w-3.5 h-3.5" /> Wake Up
                            </label>
                            <div className="relative">
                                <input 
                                    type="time" 
                                    value={wokeAt}
                                    onChange={(e) => setWokeAt(e.target.value)}
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-lg px-4 py-3 text-white font-mono text-sm focus:outline-none focus:border-zinc-600 focus:ring-1 focus:ring-zinc-600 transition-all cursor-pointer"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="h-px w-full bg-zinc-800/50" />

                    {/* Quality Slider */}
                    <div className="space-y-4">
                        <div className="flex justify-between items-end">
                            <div>
                                <label className="text-sm font-medium text-zinc-200 block mb-1">Recovery Score</label>
                                <p className="text-xs text-zinc-500">Subjective analysis of rest quality.</p>
                            </div>
                            <div className="flex items-baseline gap-1">
                                <span className={`text-2xl font-mono font-bold ${quality > 80 ? 'text-emerald-400' : quality > 50 ? 'text-yellow-400' : 'text-red-400'}`}>
                                    {quality}
                                </span>
                                <span className="text-xs font-bold text-zinc-600">%</span>
                            </div>
                        </div>
                        
                        <div className="relative h-6 flex items-center">
                            <input
                                type="range"
                                min="0" max="100"
                                value={quality}
                                onChange={(e) => setQuality(parseInt(e.target.value))}
                                className="w-full h-1.5 bg-zinc-950 rounded-full appearance-none cursor-pointer border border-zinc-800 accent-white hover:accent-zinc-200 transition-all"
                            />
                        </div>
                        
                        <div className="flex justify-between px-1">
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">Lethargic</span>
                            <span className="text-[10px] font-bold text-zinc-600 uppercase tracking-wider">Optimal</span>
                        </div>
                    </div>

                    {/* Submit Action */}
                    <div className="pt-4">
                        <button 
                            disabled={isLoading}
                            onClick={handleLogClick}
                            className="w-full bg-white hover:bg-zinc-200 text-black px-6 py-3.5 rounded-lg font-bold text-sm transition-all flex items-center justify-center gap-2 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg shadow-white/5"
                        >
                            {isLoading ? (
                                <Loader2 className="w-4 h-4 animate-spin" />
                            ) : (
                                <>
                                    <Save className="w-4 h-4" />
                                    <span>Commit Entry</span>
                                </>
                            )}
                        </button>
                    </div>
                </div>

            ) : (
                // --- AI ANALYSIS VIEW (Day 30+) ---
                <div className="w-full min-h-[400px] flex flex-col items-center justify-center">
                    {aiLoading ? (
                        <div className="text-center space-y-4">
                            <div className="w-12 h-12 border-2 border-zinc-800 border-t-indigo-500 rounded-full animate-spin mx-auto" />
                            <p className="text-zinc-500 text-sm font-mono">Compiling final report...</p>
                        </div>
                    ) : aiAnalysis ? (
                        <div className="w-full">
                            <div className="flex items-center gap-2 mb-6 text-indigo-400 border-b border-zinc-800 pb-4">
                                <BarChart3 className="w-5 h-5" />
                                <h3 className="text-sm font-bold uppercase tracking-wider">Performance Analysis</h3>
                            </div>
                            <SleepAnalysis analysis={aiAnalysis} />
                        </div>
                    ) : (
                        <div className="text-center py-12 border border-dashed border-zinc-800 rounded-xl w-full">
                            <Clock className="w-8 h-8 text-zinc-700 mx-auto mb-3" />
                            <p className="text-zinc-500 text-sm">No analysis data available.</p>
                        </div>
                    )}
                </div>
            )}
        </>
    )
}

export default SleepForm