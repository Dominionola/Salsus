"use client";

import { useEffect, useState } from "react";
import BrandHeader from "@/components/BrandHeader";
import SearchTerminal from "@/components/SearchTerminal";
import DrugBentoGrid from "@/components/DrugBentoGrid";
import ProblemSection from "@/components/ProblemSection";
import DisclaimerFooter from "@/components/DisclaimerFooter";
import { HowItWorks, ResultsPreview } from "@/components/LandingSections";
import MatchaSequence from "@/components/MatchaSequence";
import { ExclamationCircleIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export default function Home() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    // Add Scroll Tracking
    const [isScrolled, setIsScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            // "Hook" the navigation only after significant scroll (e.g., nearing the end of the hero sequence)
            if (window.scrollY > window.innerHeight * 0.8) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const handleSearch = async (query) => {
        setLoading(true);
        setError(null);
        setData(null);
        setHasSearched(true);
        // Force header to be sticky if we search
        setIsScrolled(true);

        try {
            const response = await fetch(`/api/drugs?q=${encodeURIComponent(query)}`);
            const result = await response.json();

            if (result.status === "FOUND") {
                setData(result);
            } else {
                setError(result);
            }
        } catch (err) {
            setError({
                status: "ERROR",
                message: "Unable to connect to safety database.",
            });
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen flex flex-col relative font-sans selection:bg-primary selection:text-white bg-background text-foreground overflow-x-hidden">
            {/* Navigation - Controlled by scroll state */}
            <BrandHeader isScrolled={hasSearched || isScrolled} />

            {/* SCROLL-DRIVEN HERO SECTION */}
            <div className="relative w-full">

                {/* 1. The Ceremonial Background (Sticky Canvas) */}
                {/* Reduced height slightly to 150vh so the 'hook' happens reasonably fast */}
                <div className="absolute inset-0 z-0 h-full w-full">
                    {!hasSearched && <MatchaSequence />}
                </div>

                {/* 2. The Content Overlay */}
                <main className="relative z-10 flex flex-col items-center justify-start pt-32 pb-12 w-full min-h-screen pointer-events-none">
                    <div className="w-full max-w-6xl mx-auto flex flex-col items-center px-4 pointer-events-auto">

                        {/* Hero Text - Fades out on scroll to clear stage for Search */}
                        <div
                            className={`text-center space-y-6 transition-all duration-700 ease-in-out origin-top
                                ${hasSearched ? "mb-12 mt-4" : "mb-16 mt-12 md:mt-24"}
                                ${!hasSearched && isScrolled ? "opacity-0 scale-95 blur-sm" : "opacity-100 scale-100"}
                            `}
                        >
                            <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground tracking-tight leading-tight mix-blend-hard-light drop-shadow-sm">
                                Intelligent <br />
                                <span className="text-primary relative inline-block">
                                    Drug Safety
                                    <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                        <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                                    </svg>
                                </span> Analysis.
                            </h1>
                            <p className="text-muted-foreground/90 font-medium text-xl md:text-2xl max-w-2xl mx-auto backdrop-blur-sm bg-background/30 rounded-lg p-2">
                                Instant cross-reference against the NAFDAC Green Book.
                            </p>
                        </div>

                        {/* Search Section */}
                        <div className="w-full">
                            <SearchTerminal onSearch={handleSearch} isLoading={loading} />
                        </div>

                        {/* Results Area */}
                        <div className="w-full mt-4 min-h-[50px] flex justify-center">
                            {loading && (
                                <div className="text-center mt-12 animate-pulse space-y-3 bg-background/80 p-4 rounded-xl backdrop-blur-md">
                                    <div className="flex justify-center space-x-2">
                                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-0"></div>
                                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-150"></div>
                                        <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-300"></div>
                                    </div>
                                    <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                                        accessing national database...
                                    </p>
                                </div>
                            )}

                            {data && <DrugBentoGrid data={data} />}

                            {error && (
                                <div className="max-w-md w-full bg-red-50/90 backdrop-blur-md border border-red-200 rounded-xl p-8 text-center mt-12 animate-fade-in shadow-xl">
                                    <div className="w-12 h-12 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                                        <ExclamationCircleIcon className="w-6 h-6 text-red-600" />
                                    </div>
                                    <h3 className="text-foreground text-lg font-serif mb-2 font-bold">{error.message}</h3>
                                    <p className="text-muted-foreground text-sm mb-6 leading-relaxed">
                                        We could not verify this drug in the public registry. This may indicate an unregistered or novel product.
                                    </p>
                                    {error.nextAction === "VERIFY_ON_NAFDAC" && (
                                        <a
                                            href="https://www.nafdac.gov.ng/resources/green-book/"
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-2 px-6 py-2.5 bg-primary text-primary-foreground text-sm font-bold rounded-lg hover:bg-primary/90 transition-all shadow-sm hover:shadow-md"
                                        >
                                            <span>Verify on Official Portal</span>
                                            <ArrowTopRightOnSquareIcon className="w-4 h-4" />
                                        </a>
                                    )}
                                </div>
                            )}
                        </div>

                    </div>
                    {/* Add spacer to allow scroll past the sticky animation and ensure full sequence plays */}
                    {!hasSearched && <div className="h-[250vh]"></div>}
                </main>
            </div>

            {/* Rest of the content */}
            {!hasSearched && (
                <div className="relative z-10 bg-background">
                    <div className="w-full max-w-6xl mx-auto flex flex-col items-center px-4 space-y-12 pb-24">
                        <ProblemSection />
                        <HowItWorks />
                        <ResultsPreview />
                    </div>
                    <DisclaimerFooter />
                </div>
            )}

            {hasSearched && <DisclaimerFooter />}
        </div>
    );
}
