"use client";

import { useEffect, useState } from "react";
import { useScroll, useTransform, motion } from "framer-motion";
import BrandHeader from "@/components/BrandHeader";
import SearchTerminal from "@/components/SearchTerminal";
import DrugBentoGrid from "@/components/DrugBentoGrid";
import ProblemSection from "@/components/ProblemSection";
import DisclaimerFooter from "@/components/DisclaimerFooter";
import { HowItWorks, ResultsPreview } from "@/components/LandingSections";
import Hero from "@/components/Hero";

import { ExclamationCircleIcon, ArrowTopRightOnSquareIcon, ArrowDownIcon } from "@heroicons/react/24/outline";

export default function Home() {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const [hasSearched, setHasSearched] = useState(false);
    const [windowHeight, setWindowHeight] = useState(0);

    // Add Scroll Tracking
    const [isScrolled, setIsScrolled] = useState(false);

    // Framer Motion for Text Animation
    const { scrollY } = useScroll();

    useEffect(() => {
        setWindowHeight(window.innerHeight);
        const handleResize = () => setWindowHeight(window.innerHeight);
        const handleScroll = () => {
            // "Hook" the navigation only after significant scroll 
            if (window.scrollY > 10) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };

        window.addEventListener("resize", handleResize);
        window.addEventListener("scroll", handleScroll);
        return () => {
            window.removeEventListener("resize", handleResize);
            window.removeEventListener("scroll", handleScroll);
        };
    }, []);

    // Animation Constants (Synced with Hero.jsx)
    const animationHeight = windowHeight * 4;

    // Text Fade In Logic
    // Start fading in at 75% of animation, fully visible at 95%
    const textOpacity = useTransform(scrollY,
        [animationHeight * 0.75, animationHeight * 0.95],
        [0, 1]
    );

    // Subtle slide up effect
    const textY = useTransform(scrollY,
        [animationHeight * 0.75, animationHeight * 0.95],
        [50, 0]
    );

    // Filter blur effect
    const textBlur = useTransform(scrollY,
        [animationHeight * 0.75, animationHeight * 0.95],
        ["10px", "0px"]
    );

    // Scroll Indicator Opacity
    const scrollIndicatorOpacity = useTransform(scrollY, [0, 100], [1, 0]);

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

            {/* FIXED HERO BACKGROUND */}
            {!hasSearched && <Hero />}

            {/* CONTENT WRAPPER */}
            <main
                className={`w-full flex flex-col items-center transition-all duration-500
                    ${!hasSearched
                        ? "fixed inset-0 z-10 justify-center pointer-events-none" // Landing: Fixed, centered
                        : "relative z-10 pt-32 pb-12 min-h-screen justify-start" // Search: Scrollable, top-aligned
                    }
                `}
            >
                <div className={`w-full max-w-6xl mx-auto flex flex-col items-center px-4 pointer-events-auto
                    ${!hasSearched ? "mt-24 h-full justify-center relative" : ""}
                `}>

                    {/* Hero Text - Controlled by Scroll via Framer Motion */}
                    {!hasSearched ? (
                        // Landing State: controlled by scroll
                        // Note: sticky is removed, now relies on fixed parent
                        isScrolled && (
                            <motion.div
                                style={{
                                    opacity: textOpacity,
                                    y: textY,
                                    filter: `blur(${textBlur})`
                                }}
                                className="text-center space-y-6 mb-16"
                            >
                                <div className="p-8 rounded-3xl bg-background/70 backdrop-blur-xl shadow-lg border border-white/20">
                                    <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground tracking-tight leading-tight drop-shadow-sm">
                                        Intelligent <br />
                                        <span className="text-primary relative inline-block">
                                            Drug Safety
                                            <svg className="absolute w-full h-3 -bottom-1 left-0 text-accent opacity-30" viewBox="0 0 100 10" preserveAspectRatio="none">
                                                <path d="M0 5 Q 50 10 100 5" stroke="currentColor" strokeWidth="4" fill="none" />
                                            </svg>
                                        </span> Analysis.
                                    </h1>
                                    <p className="text-muted-foreground font-medium text-xl md:text-2xl max-w-2xl mx-auto mt-6">
                                        Instant cross-reference against the NAFDAC Green Book.
                                    </p>
                                </div>
                            </motion.div>
                        )
                    ) : (
                        // Search State: Static position
                        <div className="text-center space-y-6 mb-12 mt-4 animate-fade-in">
                            <h1 className="font-serif text-5xl md:text-7xl font-bold text-foreground tracking-tight leading-tight">
                                Intelligent <br />
                                <span className="text-primary relative inline-block">
                                    Drug Safety
                                </span> Analysis.
                            </h1>
                            <p className="text-muted-foreground/90 font-medium text-xl md:text-2xl max-w-2xl mx-auto">
                                Instant cross-reference against the NAFDAC Green Book.
                            </p>
                        </div>
                    )}

                    {/* Search Section */}
                    {!hasSearched ? (
                        // Landing State: Only show if scrolled (animated)
                        isScrolled && (
                            <motion.div
                                style={{
                                    opacity: textOpacity,
                                    y: textY,
                                    filter: `blur(${textBlur})`
                                }}
                                className="w-full"
                            >
                                <SearchTerminal onSearch={handleSearch} isLoading={loading} />
                            </motion.div>
                        )
                    ) : (
                        // Search/Results State: Always show static
                        <div className="w-full">
                            <SearchTerminal onSearch={handleSearch} isLoading={loading} />
                        </div>
                    )}

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

                        {/* Scroll Indicator */}
                        {!hasSearched && !isScrolled && (
                            <motion.div
                                style={{ opacity: scrollIndicatorOpacity }}
                                className="absolute bottom-12 flex flex-col items-center space-y-2 pointer-events-none"
                            >
                                <span className="text-xs uppercase tracking-[0.2em] text-muted-foreground font-semibold">Scroll</span>
                                <ArrowDownIcon className="w-5 h-5 text-muted-foreground animate-bounce" />
                            </motion.div>
                        )}
                    </div>

                </div>
            </main>

            {/* SPACER FOR LANDING SCROLL */}
            {!hasSearched && <div className="h-[500vh] relative z-0 pointer-events-none"></div>}

            {/* Rest of the content */}
            {!hasSearched && (
                <div className="relative z-20 bg-background">
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
