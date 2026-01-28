"use client";

import { useState, useEffect } from "react";
import { MagnifyingGlassIcon } from "@heroicons/react/24/outline";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

export default function SearchTerminal({ onSearch, isLoading }) {
    const [query, setQuery] = useState("");
    const [placeholder, setPlaceholder] = useState("");
    const [isFocused, setIsFocused] = useState(false);

    // Typewriter effect variables
    const phrases = [
        "Enter Drug Name (e.g., Paracetamol)...",
        "Enter NAFDAC No (e.g., A4-1234)...",
        "Check Safety Profile..."
    ];

    useEffect(() => {
        let currentPhraseIndex = 0;
        let currentCharIndex = 0;
        let isDeleting = false;
        let typingSpeed = 100;
        let timeoutId;

        const type = () => {
            const currentPhrase = phrases[currentPhraseIndex];

            if (isDeleting) {
                setPlaceholder(currentPhrase.substring(0, currentCharIndex - 1));
                currentCharIndex--;
                typingSpeed = 50;
            } else {
                setPlaceholder(currentPhrase.substring(0, currentCharIndex + 1));
                currentCharIndex++;
                typingSpeed = 100;
            }

            if (!isDeleting && currentCharIndex === currentPhrase.length) {
                isDeleting = true;
                typingSpeed = 2000; // Pause before deleting
            } else if (isDeleting && currentCharIndex === 0) {
                isDeleting = false;
                currentPhraseIndex = (currentPhraseIndex + 1) % phrases.length;
                typingSpeed = 500;
            }

            timeoutId = setTimeout(type, typingSpeed);
        };

        timeoutId = setTimeout(type, 500);

        return () => clearTimeout(timeoutId);
    }, []);

    const handleSubmit = (e) => {
        e.preventDefault();
        if (query.trim()) {
            onSearch(query);
        }
    };

    return (
        <div className="w-full max-w-2xl mx-auto relative z-10 transition-all duration-500 ease-out flex flex-col items-center">
            <form onSubmit={handleSubmit} className="relative group w-full">
                {/* Subtle Glow Effect (Primary Color) */}
                <div className={`absolute -inset-0.5 bg-primary/20 rounded-xl blur-lg transition duration-1000 group-hover:duration-200 ${isFocused ? "opacity-100" : "opacity-0"}`}></div>

                <div className="relative flex items-center bg-card border border-primary/10 rounded-xl overflow-hidden shadow-sm transition-shadow duration-300 hover:shadow-md">
                    <MagnifyingGlassIcon className={`w-5 h-5 ml-4 transition-colors duration-300 ${isFocused ? "text-primary" : "text-muted-foreground"}`} />

                    <input
                        type="text"
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onFocus={() => setIsFocused(true)}
                        onBlur={() => setIsFocused(false)}
                        className="w-full bg-transparent border-none px-4 py-6 text-lg md:text-xl font-mono text-foreground placeholder-muted-foreground/50 focus:outline-none focus:ring-0"
                        placeholder={placeholder}
                        aria-label="Search drug database"
                        autoComplete="off"
                        disabled={isLoading}
                    />

                    <div className="pr-2">
                        <Button
                            type="submit"
                            disabled={isLoading || !query.trim()}
                            className={`h-10 px-6 font-sans text-sm font-semibold tracking-wide transition-all duration-300 rounded-lg
                ${isLoading
                                    ? "bg-muted text-muted-foreground border-none"
                                    : "bg-primary text-primary-foreground hover:bg-primary/90 shadow-sm"
                                }`}
                        >
                            {isLoading ? "ANALYZING" : "Analyze Risk"}
                        </Button>
                    </div>
                </div>
            </form>

            <p className="text-xs text-muted-foreground mt-4 font-medium tracking-wide">
                Powered by public government data. Strictly for educational use.
            </p>
        </div>
    );
}
