export default function ResultsPreview() {
    return (
        <section className="w-full py-24 relative overflow-hidden flex flex-col items-center">
            <div className="text-center mb-16 relative z-10">
                <h2 className="font-serif text-3xl md:text-4xl text-white mb-4">Trusted Intelligence</h2>
                <p className="text-text-secondary">See what you get before you search.</p>
            </div>

            {/* Tilted Card Container */}
            <div className="relative w-full max-w-4xl mx-auto h-[400px] perspective-1000 flex justify-center items-center">
                {/* The Card */}
                <div className="w-[350px] md:w-[400px] bg-[#1F2329]/90 backdrop-blur-xl border border-white/10 rounded-lg p-6 shadow-[0_25px_50px_-12px_rgba(0,0,0,0.5)] transform -rotate-y-12 rotate-x-6 hover:rotate-0 transition-transform duration-700 ease-out cursor-default relative">

                    {/* Glowing Badge */}
                    <div className="absolute -top-4 -right-4 bg-emerald-500/20 border border-emerald-500/30 text-emerald-400 px-4 py-2 rounded-full font-mono text-xs font-bold shadow-[0_0_20px_rgba(16,185,129,0.2)] animate-pulse">
                        LOW RISK
                    </div>

                    <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4">
                        <div>
                            <h3 className="font-serif text-2xl text-white">Panadol Extra</h3>
                            <p className="font-mono text-[10px] text-text-secondary mt-1 uppercase">REG: A4-1234</p>
                        </div>
                    </div>

                    <div className="space-y-4 font-mono text-sm text-text-secondary">
                        <div className="flex justify-between">
                            <span>Ingredient</span>
                            <span className="text-white">Paracetamol</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Strength</span>
                            <span className="text-white">500mg</span>
                        </div>
                        <div className="flex justify-between">
                            <span>Dosage</span>
                            <span className="text-white">Tablet</span>
                        </div>
                    </div>

                    <div className="mt-6 bg-amber-500/5 border border-amber-500/20 rounded p-3">
                        <p className="text-[10px] text-amber-500/80 font-sans leading-tight">
                            ⚠ Caution: Liver toxicity if max daily dose (4000mg) is exceeded.
                        </p>
                    </div>
                </div>

                {/* Decorative Elements */}
                <div className="absolute left-10 md:left-20 top-1/2 -translate-y-1/2 w-64 h-64 bg-blue-500/10 rounded-full blur-[64px] -z-10"></div>
                <div className="absolute right-10 md:right-20 bottom-0 w-48 h-48 bg-teal-500/10 rounded-full blur-[48px] -z-10"></div>
            </div>
        </section>
    );
}
