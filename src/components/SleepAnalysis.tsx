/* eslint-disable @typescript-eslint/no-explicit-any */

function SleepAnalysis(props: any) {
    return (
        <div className="w-full max-w-5xl mx-auto p-8 space-y-8">

            {/* HEADER */}
            <h1 className="text-3xl font-extrabold text-white text-center">
                🧠 Your Sleep Analysis Report
            </h1>
            {props.analysis}
        </div>
    )
}

export default SleepAnalysis



// function StatCard({ label, value }: { label: string; value: any }) {
//     return (
//         <div className="bg-slate-900/80 border border-white/10 rounded-xl p-5 text-center">
//             <p className="text-xs uppercase text-slate-500 mb-1">{label}</p>
//             <p className="text-2xl font-black text-white">{value}</p>
//         </div>
//     )
// }


// function ListSection({
//     title,
//     items,
//     color
// }: {
//     title: string
//     items: string[]
//     color: "emerald" | "rose" | "violet"
// }) {
//     return (
//         <section className="bg-slate-900/70 border border-white/10 rounded-2xl p-6">
//             <h2 className={`text-xl font-bold text-${color}-400 mb-4`}>
//                 {title}
//             </h2>

//             <ul className="space-y-2 text-slate-300">
//                 {items.map((item, index) => (
//                     <li key={index} className="flex gap-2">
//                         <span className={`text-${color}-400 font-bold`}>•</span>
//                         <span>{item}</span>
//                     </li>
//                 ))}
//             </ul>
//         </section>
//     )
// }
