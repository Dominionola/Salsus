export default function DisclaimerFooter() {
    return (
        <footer className="w-full py-12 px-6 border-t border-primary/10 bg-background text-center mt-auto">
            <div className="max-w-3xl mx-auto space-y-6">
                <div className="inline-flex items-center gap-2 px-4 py-2 bg-card border border-primary/10 rounded-full shadow-sm">
                    <div className="w-2 h-2 bg-status-safe rounded-full animate-pulse"></div>
                    <span className="text-xs font-medium text-foreground/80">
                        Data Sourced from NAFDAC Green Book & OpenFDA
                    </span>
                </div>

                <p className="text-xs text-muted-foreground leading-relaxed max-w-2xl mx-auto">
                    "This information is for educational purposes only and does not replace professional medical advice.
                    Users are encouraged to verify drugs directly on official NAFDAC platforms."
                </p>

                <p className="font-mono text-[10px] text-primary/60 uppercase tracking-widest">
                    © 2026 Salus Project. Open Source Public Health Initiative.
                </p>
            </div>
        </footer>
    );
}
