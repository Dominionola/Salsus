import { ArrowTopRightOnSquareIcon, ExclamationTriangleIcon, ShieldCheckIcon, BeakerIcon, ScaleIcon } from "@heroicons/react/24/outline";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

export default function DrugBentoGrid({ data }) {
    if (!data) return null;

    // Determine accent color based on risk
    const getRiskColor = (level) => {
        switch (level) {
            case 'LOW': return 'bg-status-safe text-white hover:bg-status-safe/90';
            case 'MODERATE': return 'bg-status-warning text-white hover:bg-status-warning/90';
            case 'HIGH': return 'bg-status-danger text-white hover:bg-status-danger/90';
            default: return 'bg-muted text-muted-foreground';
        }
    };

    const getRiskIcon = (level) => {
        switch (level) {
            case 'LOW': return ShieldCheckIcon;
            case 'MODERATE': return ExclamationTriangleIcon;
            case 'HIGH': return ExclamationTriangleIcon;
            default: return BeakerIcon;
        }
    };

    const RiskIcon = getRiskIcon(data.riskLevel);

    return (
        <div className="w-full max-w-4xl mx-auto mt-12 animate-fade-in-up">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">

                {/* Card 1: Main Identity (Spans 2 cols) */}
                <Card className="md:col-span-2 border-primary/20 shadow-sm relative overflow-hidden">
                    <div className={`absolute top-0 left-0 w-1 h-full ${data.riskLevel === 'LOW' ? 'bg-status-safe' : data.riskLevel === 'MODERATE' ? 'bg-status-warning' : 'bg-status-danger'}`}></div>
                    <CardHeader className="pb-2">
                        <div className="flex justify-between items-start">
                            <div>
                                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest mb-1">Drug Name</p>
                                <CardTitle className="font-serif text-3xl md:text-4xl text-foreground">{data.drugName}</CardTitle>
                                <p className="font-mono text-xs text-primary mt-2">REG: {data.regNumber || "N/A"}</p>
                            </div>
                            <Badge className={`px-4 py-1 text-sm tracking-wide ${getRiskColor(data.riskLevel)}`}>
                                {data.riskLevel} RISK
                            </Badge>
                        </div>
                    </CardHeader>
                </Card>

                {/* Card 2: Quick Status */}
                <Card className="bg-secondary/30 border-primary/10 flex flex-col items-center justify-center p-6 text-center">
                    <div className={`p-4 rounded-full mb-3 ${data.riskLevel === 'LOW' ? 'bg-status-safe/10 text-status-safe' : data.riskLevel === 'MODERATE' ? 'bg-status-warning/10 text-status-warning' : 'bg-status-danger/10 text-status-danger'}`}>
                        <RiskIcon className="w-8 h-8" />
                    </div>
                    <p className="text-sm font-medium text-muted-foreground">Safety Status</p>
                    <p className="font-serif text-lg font-bold text-foreground capitalize">{data.riskLevel.toLowerCase()} Risk Profile</p>
                </Card>

                {/* Card 3: Clinical Composition */}
                <Card className="border-primary/10">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 text-primary font-medium text-sm uppercase tracking-wide">
                            <BeakerIcon className="w-4 h-4" /> Composition
                        </div>
                    </CardHeader>
                    <CardContent className="space-y-4 pt-4">
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Active Ingredient</p>
                            <p className="font-mono text-sm font-medium">{data.ingredient}</p>
                        </div>
                        <div>
                            <p className="text-xs text-muted-foreground mb-1">Dosage Form</p>
                            <p className="font-mono text-sm">{data.dosageForm}</p>
                        </div>
                    </CardContent>
                </Card>

                {/* Card 4: Dosage Strength */}
                <Card className="border-primary/10">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 text-primary font-medium text-sm uppercase tracking-wide">
                            <ScaleIcon className="w-4 h-4" /> Strength
                        </div>
                    </CardHeader>
                    <CardContent className="pt-4">
                        <p className="font-serif text-2xl font-bold text-foreground">{data.strength}</p>
                        <p className="text-[10px] text-muted-foreground mt-1">Standard Unit</p>
                    </CardContent>
                </Card>

                {/* Card 5: Warnings & Action (Spans 1 on desktop but important) */}
                <Card className="border-primary/20 md:row-span-2">
                    <CardHeader className="pb-2">
                        <div className="flex items-center gap-2 text-status-warning font-medium text-sm uppercase tracking-wide">
                            <ExclamationTriangleIcon className="w-4 h-4" /> Advisory
                        </div>
                    </CardHeader>
                    <CardContent className="pt-4 space-y-4">
                        {data.warnings && data.warnings.length > 0 ? (
                            <ul className="space-y-2">
                                {data.warnings.map((warning, idx) => (
                                    <li key={idx} className="text-sm text-muted-foreground leading-snug pl-2 border-l-2 border-primary/20">
                                        {warning}
                                    </li>
                                ))}
                            </ul>
                        ) : (
                            <p className="text-sm text-muted-foreground">No specific warnings recorded.</p>
                        )}

                        <div className="pt-4 mt-4 border-t border-border">
                            <Button variant="outline" className="w-full text-xs gap-2" asChild>
                                <a href="https://www.nafdac.gov.ng" target="_blank" rel="noreferrer">
                                    Verify Source <ArrowTopRightOnSquareIcon className="w-3 h-3" />
                                </a>
                            </Button>
                        </div>
                    </CardContent>
                </Card>
            </div>
        </div>
    );
}
