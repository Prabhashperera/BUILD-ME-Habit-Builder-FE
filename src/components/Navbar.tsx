import { User, Bell, Activity } from 'lucide-react';
function Navbar() {
    return (
        <div>
            <nav className="sticky top-0 z-50 w-full px-6 py-4 flex items-center justify-between bg-slate-950/70 backdrop-blur-xl border-b border-white/5">
                <div className="flex items-center gap-3">
                    <div className="relative">
                        <div className="absolute inset-0 bg-emerald-400 blur-lg opacity-40"></div>
                        <div className="relative p-2 bg-slate-900 border border-white/10 rounded-xl">
                            <Activity className="w-6 h-6 text-emerald-400" />
                        </div>
                    </div>
                    <span className="text-xl font-bold tracking-tight">Habit<span className="text-emerald-400">Forge</span></span>
                </div>

                <div className="flex items-center gap-4">
                    <button className="p-2.5 rounded-full hover:bg-white/5 text-slate-400 hover:text-white transition-colors relative">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 rounded-full border border-slate-950"></span>
                    </button>
                    <div className="rounded-full bg-linear-to-tr from-emerald-400 to-cyan-400 p-px">
                        <div className="p-1 rounded-full bg-slate-950">
                            <User className="w-5 h-5 text-slate-300" />
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}

export default Navbar