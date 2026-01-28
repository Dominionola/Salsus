import { CircleStackIcon, BeakerIcon, ShieldCheckIcon, DocumentMagnifyingGlassIcon, ClipboardDocumentCheckIcon } from "@heroicons/react/24/outline";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

export function HowItWorks() {
    const steps = [
        {
            icon: DocumentMagnifyingGlassIcon,
            title: "Input Normalization",
            desc: "We detect drug names or NAFDAC registration numbers from your manual entry."
        },
        {
            icon: CircleStackIcon,
            title: "Registry Scan",
            desc: "The system queries the NAFDAC Green Book for registration status and active ingredients."
        },
        {
            icon: ShieldCheckIcon,
            title: "Safety Enrichment",
            desc: "We cross-reference ingredients with OpenFDA to identify warnings and maximum daily dosages."
        }
    ];

    return (
        <section className="w-full max-w-5xl mx-auto px-6 py-24 border-t border-primary/5">
            <div className="text-center mb-16">
                <h3 className="font-serif text-3xl font-bold text-foreground mb-2">System Protocol</h3>
                <p className="text-muted-foreground">Transparency in every verification.</p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                {steps.map((step, index) => (
                    <div key={index} className="flex flex-col items-center text-center group">
                        <div className="w-16 h-16 bg-card border border-primary/10 rounded-2xl flex items-center justify-center mb-6 text-primary shadow-sm group-hover:shadow-md transition-all duration-300 group-hover:-translate-y-1">
                            <step.icon className="w-8 h-8" />
                        </div>
                        <h4 className="font-mono text-sm uppercase tracking-widest text-primary mb-2 font-bold">{step.title}</h4>
                        <p className="text-sm text-foreground/80 leading-relaxed max-w-xs">{step.desc}</p>
                    </div>
                ))}
            </div>
        </section>
    );
}

export function ResultsPreview() {
    return (
        <section className="w-full py-24 bg-card border-t border-border">
            <div className="max-w-4xl mx-auto px-6 flex flex-col md:flex-row items-center gap-12">

                {/* Text Side */}
                <div className="flex-1 text-center md:text-left space-y-4">
                    <Badge variant="outline" className="border-primary/20 text-primary bg-primary/5">PREVIEW</Badge>
                    <h2 className="font-serif text-3xl md:text-4xl text-foreground font-bold">The Promise of Intelligence.</h2>
                    <p className="text-muted-foreground text-lg leading-relaxed">
                        See exactly what you're taking. Our unified risk score combines regulatory status with clinical safety data.
                    </p>
                </div>

                {/* Card Side */}
                <div className="flex-1 w-full max-w-md">
                    <div className="relative transform rotate-2 hover:rotate-0 transition-transform duration-500 ease-out">
                        <div className="absolute inset-0 bg-primary/20 blur-2xl rounded-full"></div>
                        <div className="relative bg-background border border-primary/10 rounded-xl shadow-xl overflow-hidden p-6">

                            <div className="flex justify-between items-start mb-6 border-b border-dashed border-primary/10 pb-4">
                                <div>
                                    <h3 className="font-serif text-2xl text-foreground font-bold">Paracetamol 500mg</h3>
                                    <p className="font-mono text-xs text-primary mt-1">FOUND in NAFDAC Registry</p>
                                </div>
                                <Badge className="bg-status-safe hover:bg-status-safe text-white px-3 py-1">LOW RISK</Badge>
                            </div>

                            <div className="space-y-4">
                                <div className="bg-secondary/30 p-4 rounded-lg border border-primary/5">
                                    <p className="text-xs font-mono text-primary uppercase mb-2 font-bold flex items-center gap-2">
                                        <ClipboardDocumentCheckIcon className="w-4 h-4" /> Key Insight
                                    </p>
                                    <p className="text-sm text-foreground/90 font-medium">
                                        "Contains Paracetamol. Do not exceed 4000mg per day. Avoid alcohol."
                                    </p>
                                </div>
                            </div>

                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
