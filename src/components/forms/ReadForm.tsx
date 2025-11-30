import { Book } from "lucide-react"

function ReadForm() {
    return (
        <>
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
        </>
    )
}

export default ReadForm