
function AmbientBgGlows() {
    return (
        <>
            <div className="fixed inset-0 pointer-events-none z-0">
                <div className="absolute top-[-10%] left-[-10%] w-[600px] h-[600px] bg-indigo-500/10 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute top-[20%] right-[-20%] w-[500px] h-[500px] bg-emerald-500/5 rounded-full blur-[100px] mix-blend-screen" />
                <div className="absolute bottom-[-10%] left-[20%] w-[600px] h-[600px] bg-violet-500/5 rounded-full blur-[120px] mix-blend-screen" />
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/cubes.png')] opacity-[0.03]"></div>
            </div>
        </>
    )
}

export default AmbientBgGlows