export default function StatusBadge({ status }) {
    // Map risk levels to styles
    const styles = {
        LOW: {
            bg: "bg-emerald-500/10",
            text: "text-emerald-400",
            border: "border-emerald-500/20",
            dot: "bg-emerald-400",
            glow: "shadow-[0_0_15px_rgba(16,185,129,0.3)]"
        },
        MODERATE: {
            bg: "bg-amber-500/10",
            text: "text-amber-400",
            border: "border-amber-500/20",
            dot: "bg-amber-400",
            glow: "shadow-[0_0_15px_rgba(245,158,11,0.3)]"
        },
        HIGH: {
            bg: "bg-red-500/10",
            text: "text-red-400",
            border: "border-red-500/20",
            dot: "bg-red-400",
            glow: "shadow-[0_0_15px_rgba(239,68,68,0.3)]"
        },
        UNKNOWN: {
            bg: "bg-gray-500/10",
            text: "text-gray-400",
            border: "border-gray-500/20",
            dot: "bg-gray-400",
            glow: ""
        }
    };

    const level = status?.toUpperCase() || "UNKNOWN";
    const style = styles[level] || styles.UNKNOWN;

    return (
        <div className={`inline-flex items-center gap-2 px-3 py-1 rounded-full border ${style.bg} ${style.border} ${style.glow}`}>
            <span className={`relative flex h-2 w-2`}>
                <span className={`animate-ping absolute inline-flex h-full w-full rounded-full opacity-75 ${style.dot}`}></span>
                <span className={`relative inline-flex rounded-full h-2 w-2 ${style.dot}`}></span>
            </span>
            <span className={`font-mono text-xs font-bold tracking-wider ${style.text}`}>
                {level} RISK
            </span>
        </div>
    );
}
