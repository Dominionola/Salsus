import { CircleStackIcon, BeakerIcon, ShieldCheckIcon } from "@heroicons/react/24/outline";

export default function HowItWorks() {
    const steps = [
        {
            icon: CircleStackIcon,
            title: "Scans NAFDAC Registry",
            desc: "Instantly checks against the official National Agency for Food and Drug Administration and Control database."
        },
        {
            icon: BeakerIcon,
            title: "Analyzes Ingredient Safety",
            desc: "Cross-references active ingredients with known safety profiles and toxicity warnings."
        },
        {
            icon: ShieldCheckIcon,
            title: "Delivers Risk Score",
            desc: "Provides a clear, color-coded risk assessment (Low, Moderate, High) for immediate decision making."
        }
    ];

    return (
        <section className="w-full max-w-6xl mx-auto px-6 py-24 border-t border-white/5">
            <div className="grid md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                    <div key={index} className="glass-panel p-8 rounded-xl flex flex-col items-center text-center transform hover:scale-105 transition-transform duration-300">
                        <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center mb-6 text-action">
                            <step.icon className="w-8 h-8" />
                        </div>
                        <h3 className="font-serif text-xl text-white mb-3 tracking-wide">{step.title}</h3>
                        <p className="text-text-secondary text-sm leading-relaxed max-w-xs">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}
