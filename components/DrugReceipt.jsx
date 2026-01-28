import StatusBadge from "./StatusBadge";
import { ArrowTopRightOnSquareIcon, ShieldCheckIcon, ExclamationTriangleIcon } from "@heroicons/react/24/outline";

export default function DrugReceipt({ data }) {
    if (!data) return null;

    return (
        <div className="w-full max-w-md mx-auto mt-12 animate-slide-up origin-top">
            {/* Receipt Top Edge (Visual) */}
            <div className="h-2 bg-card border-x border-t border-white/10 rounded-t-sm"></div>

            <div className="bg-card border-x border-b border-white/10 p-6 shadow-2xl backdrop-blur-md relative overflow-hidden">
                {/* Background Texture */}
                <div className="absolute top-0 right-0 p-4 opacity-5 pointer-events-none">
                    <ShieldCheckIcon className="w-32 h-32" />
                </div>

                {/* Header */}
                <div className="flex justify-between items-start mb-6 border-b border-white/10 pb-4 border-dashed">
                    <div>
                        <h2 className="font-serif text-2xl text-white tracking-wide">{data.drugName}</h2>
                        <p className="font-mono text-xs text-text-secondary mt-1 uppercase tracking-wider">
                            REG: {data.regNumber || "N/A"}
                        </p>
                    </div>
                    <StatusBadge status={data.riskLevel} />
                </div>

                {/* Clinical Data Grid */}
                <div className="grid grid-cols-2 gap-y-4 gap-x-4 mb-6 font-mono text-sm">
                    <div>
                        <p className="text-xs text-text-secondary uppercase mb-1">Active Ingredient</p>
                        <p className="text-white">{data.ingredient}</p>
                    </div>
                    <div>
                        <p className="text-xs text-text-secondary uppercase mb-1">Strength</p>
                        <p className="text-white">{data.strength}</p>
                    </div>
                    <div>
                        <p className="text-xs text-text-secondary uppercase mb-1">Dosage Form</p>
                        <p className="text-white">{data.dosageForm}</p>
                    </div>
                    <div>
                        <p className="text-xs text-text-secondary uppercase mb-1">Last Updated</p>
                        <p className="text-white">2024-01-15</p>
                    </div>
                </div>

                {/* Warnings Section */}
                {data.warnings && data.warnings.length > 0 && (
                    <div className="bg-white/5 rounded-md p-4 mb-6 border border-white/5">
                        <h3 className="flex items-center gap-2 text-xs font-bold text-status-warning uppercase tracking-wider mb-2">
                            <ExclamationTriangleIcon className="w-4 h-4" />
                            Safety Warnings
                        </h3>
                        <ul className="list-disc pl-4 space-y-1">
                            {data.warnings.map((warning, index) => (
                                <li key={index} className="text-sm text-text-primary/80 font-sans leading-relaxed">
                                    {warning}
                                </li>
                            ))}
                        </ul>
                    </div>
                )}

                {/* Action / Source */}
                <div className="mt-2 pt-4 border-t border-white/10 border-dashed text-center">
                    <a
                        href="https://www.nafdac.gov.ng/resources/green-book/"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-action hover:text-action-hover transition-colors text-sm font-medium group"
                    >
                        <span>Verify on NAFDAC Green Book</span>
                        <ArrowTopRightOnSquareIcon className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </a>
                    <p className="text-[10px] text-text-secondary mt-2 font-mono">
                        Source: Official NAFDAC Registry
                    </p>
                </div>
            </div>

            {/* Visual bottom edge */}
            <div className="h-1 bg-gradient-to-r from-transparent via-white/10 to-transparent"></div>
        </div>
    );
}
