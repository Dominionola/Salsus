"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export default function Hero() {
    const canvasRef = useRef(null);
    // Use ref for images to avoid re-renders on every load
    const imagesRef = useRef([]);
    const [isLoaded, setIsLoaded] = useState(false);
    const [windowHeight, setWindowHeight] = useState(0);
    const totalFrames = 192;

    // Use global window scroll
    const { scrollY } = useScroll();

    useEffect(() => {
        // Set window height on mount/resize for calculations
        const handleResize = () => setWindowHeight(window.innerHeight);
        handleResize();
        window.addEventListener("resize", handleResize);
        return () => window.removeEventListener("resize", handleResize);
    }, []);

    // Drive animation over approx 4 screen heights (matches 500vh spacer minus 1 screen)
    const animationHeight = windowHeight * 4;
    const frameIndex = useTransform(scrollY, [0, animationHeight], [0, totalFrames - 1]);

    useEffect(() => {
        // Progressive Loading Strategy
        const loadImages = async () => {
            // Initialize array
            imagesRef.current = new Array(totalFrames).fill(null);

            // Helper to load a single image
            const loadSingleImage = (index) => {
                const img = new Image();
                const frameNum = index.toString().padStart(3, "0");
                img.src = `/hero-zip/frame_${frameNum}.jpg`;
                img.onload = () => {
                    imagesRef.current[index] = img;
                    // If it's the first frame, mark as loaded immediately
                    if (index === 0) {
                        setIsLoaded(true);
                    }
                };
                // Fire and forget, but mapped
            };

            // 1. Load Frame 0 IMMEDIATELY (Critical Path)
            loadSingleImage(0);

            // 2. Load the rest in background
            // Use a small delay/batching if needed, but browser parallelization usually handles this okay.
            // Loop from 1 to totalFrames
            for (let i = 1; i < totalFrames; i++) {
                loadSingleImage(i);
            }
        };

        loadImages();
    }, []);

    const renderFrame = (index) => {
        const canvas = canvasRef.current;
        if (!canvas) return;

        const ctx = canvas.getContext("2d");
        if (!ctx) return;

        // Smart Fallback: Find the nearest loaded frame if current isn't ready
        // Search backwards from index to 0
        let imgToRender = imagesRef.current[index];
        if (!imgToRender) {
            for (let i = index; i >= 0; i--) {
                if (imagesRef.current[i]) {
                    imgToRender = imagesRef.current[i];
                    break;
                }
            }
        }

        // If still nothing (shouldn't happen if Frame 0 is loaded), return
        if (!imgToRender) return;

        const img = imgToRender;

        // Get the DPR (Device Pixel Ratio)
        const dpr = window.devicePixelRatio || 1;

        // Use LOGICAL dimensions for calculations (since context is already scaled by DPR)
        const logicalWidth = canvas.width / dpr;
        const logicalHeight = canvas.height / dpr;

        // Calculate scale for 'object-cover' using logical dimensions
        // const canvasRatio = logicalWidth / logicalHeight; // Unused but part of logic
        // const imgRatio = img.width / img.height; // Unused

        let renderW, renderH, offsetX, offsetY;

        // Always match width ("normal width") based on user request to avoid zoom
        renderW = logicalWidth;
        renderH = img.height * (logicalWidth / img.width);
        offsetX = 0;
        offsetY = (logicalHeight - renderH) / 2;

        // Clear using logical dimensions (or sufficiently large values)
        ctx.clearRect(0, 0, logicalWidth, logicalHeight);
        ctx.drawImage(img, 0, 0, img.width, img.height, offsetX, offsetY, renderW, renderH);
    };

    useMotionValueEvent(frameIndex, "change", (latest) => {
        const index = Math.min(Math.round(latest), totalFrames - 1);
        requestAnimationFrame(() => renderFrame(index));
    });

    // Initial render when loaded (Frame 0)
    useEffect(() => {
        if (isLoaded) {
            requestAnimationFrame(() => renderFrame(0));
        }
    }, [isLoaded]);

    // Handle Resize with High DPI support
    useEffect(() => {
        const handleResize = () => {
            if (canvasRef.current && window.innerHeight) {
                const dpr = window.devicePixelRatio || 1;
                // Use window dimensions for fixed full screen
                const width = window.innerWidth;
                const height = window.innerHeight;

                // Set actual size in memory (scaled to account for extra pixel density)
                canvasRef.current.width = width * dpr;
                canvasRef.current.height = height * dpr;

                // Normalize coordinate system to use css pixels
                const ctx = canvasRef.current.getContext('2d');
                ctx.scale(dpr, dpr);

                // Re-render current frame
                renderFrame(Math.min(Math.round(frameIndex.get()), totalFrames - 1));
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize(); // Initial sizing
        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded, windowHeight]);

    return (
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
            <canvas
                ref={canvasRef}
                className="w-full h-full object-cover"
                style={{ width: '100%', height: '100%' }}
            />
            {/* Show loader only if Frame 0 isn't ready */}
            {!isLoaded && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary animate-pulse font-mono text-sm">Initializing...</div>}
        </div>
    );
}
