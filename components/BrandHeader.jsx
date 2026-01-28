import Link from "next/link";
import { ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export default function BrandHeader() {
    return (
        <header className="fixed top-0 left-0 right-0 z-50 flex items-center justify-between px-6 py-4 border-b border-primary/5 bg-background/80 backdrop-blur-md">
            <div className="flex items-center gap-8">
                <Link href="/" className="font-serif text-2xl tracking-[0.05em] font-bold text-foreground hover:opacity-80 transition-opacity">
                    SALUS
                </Link>

                {/* Navigation Links (Hidden on mobile) */}
                <nav className="hidden md:flex items-center gap-6">
                    <Link href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">Search</Link>
                    <Link href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">Data Sources</Link>
                    <Link href="#" className="text-sm font-medium text-foreground/80 hover:text-foreground transition-colors">About</Link>
                </nav>
            </div>

            <a
                href="https://www.nafdac.gov.ng/resources/green-book/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-xs font-mono text-primary hover:text-primary/80 transition-colors group bg-secondary/50 px-3 py-1.5 rounded-full"
            >
                <span className="font-semibold">Official Green Book</span>
                <ArrowTopRightOnSquareIcon className="w-3 h-3 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </a>
        </header>
    );
}
