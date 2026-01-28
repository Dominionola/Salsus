"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export default function MatchaSequence() {
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const [images, setImages] = useState([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const totalFrames = 31;

    // Track scroll progress of the container
    const { scrollYProgress } = useScroll({
        target: containerRef,
        offset: ["start start", "end start"], // Pin during the scroll
    });

    // Map 0-1 scroll to 0-(totalFrames-1)
    const frameIndex = useTransform(scrollYProgress, [0, 1], [0, totalFrames - 1]);

    useEffect(() => {
        // Preload images
        const loadImages = async () => {
            const loadedImages = [];
            for (let i = 1; i <= totalFrames; i++) {
                const img = new Image();
                const frameNum = i.toString().padStart(3, "0");
                img.src = `/hero-img-sequence/ezgif-frame-${frameNum}.jpg`;
                await new Promise((resolve) => {
                    img.onload = resolve;
                    // Continue even if error to avoid hanging
                    img.onerror = resolve;
                });
                loadedImages.push(img);
            }
            setImages(loadedImages);
            setIsLoaded(true);
        };

        loadImages();
    }, []);

    const renderFrame = (index) => {
        const canvas = canvasRef.current;
        if (!canvas || !images[index]) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Clear and draw
        const img = images[index];

        // Maintain aspect ratio (contain)
        const scale = Math.max(canvas.width / img.width, canvas.height / img.height);
        const x = (canvas.width / 2) - (img.width / 2) * scale;
        const y = (canvas.height / 2) - (img.height / 2) * scale;

        ctx.clearRect(0, 0, canvas.width, canvas.height);
        // Draw image centered and covering (or containing depending on preference, cover usually looks better for hero)
        // Actually prompt says "no hard edges", so maybe "cover" is best.
        // Let's go with "contain" first to ensure the whole whisking bowl is seen, or "cover" if we want immersion. 
        // Given "ceremonial", let's center it nicely.
        ctx.drawImage(img, 0, 0, img.width, img.height, 0, 0, canvas.width, canvas.height);
    };

    useMotionValueEvent(frameIndex, "change", (latest) => {
        if (!isLoaded || images.length === 0) return;
        const index = Math.min(Math.round(latest), totalFrames - 1);
        requestAnimationFrame(() => renderFrame(index));
    });

    // Initial render when loaded
    useEffect(() => {
        if (isLoaded) renderFrame(0);
    }, [isLoaded]);

    // Handle Resize
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current && containerRef.current) {
                // Match parent dimensions
                canvasRef.current.width = containerRef.current.clientWidth;
                canvasRef.current.height = containerRef.current.clientHeight;
                // Re-render current frame
                renderFrame(Math.min(Math.round(frameIndex.get()), totalFrames - 1));
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize(); // Initial sizing
        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded]);

    return (
        <div ref={containerRef} className="h-full relative">
            {/* h-full allows parent (spacer) to dictate scroll length */}
            <div className="sticky top-0 w-full h-screen flex items-center justify-center overflow-hidden z-0">
                <canvas
                    ref={canvasRef}
                    className="w-full h-full object-cover"
                />
                {!isLoaded && <div className="absolute text-primary animate-pulse">Initializing Ceremony...</div>}
            </div>
        </div>
    );
}
