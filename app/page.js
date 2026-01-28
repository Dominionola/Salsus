"use client";

import { useState } from "react";
import BrandHeader from "@/components/BrandHeader";
import SearchTerminal from "@/components/SearchTerminal";
import DrugBentoGrid from "@/components/DrugBentoGrid";
import ProblemSection from "@/components/ProblemSection";
import DisclaimerFooter from "@/components/DisclaimerFooter";
import { HowItWorks, ResultsPreview } from "@/components/LandingSections";
import { ExclamationCircleIcon, ArrowTopRightOnSquareIcon } from "@heroicons/react/24/outline";

export default function Home() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);

    const handleSearch = async (query) => {
        setLoading(true);
        setError(null);
        setData(null);
        setHasSearched(true);

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
            <BrandHeader />

            <main className="flex-grow flex flex-col items-center justify-start pt-32 pb-12 z-10 w-full">
                <div className="w-full max-w-6xl mx-auto flex flex-col items-center px-4">

                    {/* Hero Text */}
                    <div className={`text-center space-y-6 transition-all duration-700 ease-in-out ${hasSearched ? "mb-12" : "mb-16"}`}>
                        <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground tracking-tight leading-tight">
                            Intelligent <br />
                            <span className="text-primary relative inline-block">
                                Drug Safety
                                <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                    <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                                </svg>
                            </span> Analysis.
                        </h1>
                        <p className="text-muted-foreground text-xl md:text-2xl font-light max-w-2xl mx-auto">
                            Instant cross-reference against the NAFDAC Green Book and OpenFDA safety guidelines.
                            <br /><span className="text-foreground font-medium mt-2 block">Know your risks in seconds.</span>
                        </p>
                    </div>

                    {/* Search Section */}
                    <SearchTerminal onSearch={handleSearch} isLoading={loading} />

                    {/* Results Area */}
                    <div className="w-full mt-4 min-h-[50px] flex justify-center">
                        {loading && (
                            <div className="text-center mt-12 animate-pulse space-y-3">
                                <div className="flex justify-center space-x-2">
                                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-0"></div>
                                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-150"></div>
                                    <div className="w-2 h-2 bg-primary rounded-full animate-bounce delay-300"></div>
                                </div>
                                <p className="font-mono text-xs text-muted-foreground uppercase tracking-widest">
                                    Accessing National Database...
                                </p>
                            </div>
                        )}

                        {data && <DrugBentoGrid data={data} />}

                        {error && (
                            <div className="max-w-md w-full bg-red-50/50 border border-red-200 rounded-xl p-8 text-center mt-12 animate-fade-in shadow-sm">
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

                    {/* Landing Page Content (Only visible when NOT searching) */}
                    {!hasSearched && (
                        <div className="w-full animate-fade-in-up delay-200 space-y-12">
                            <ProblemSection />
                            <HowItWorks />
                            <ResultsPreview />
                        </div>
                    )}
                </div>
            </main>

            <DisclaimerFooter />
        </div>
    );
}
