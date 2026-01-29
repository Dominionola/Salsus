"use client";

import { useEffect, useRef, useState } from "react";
import { useScroll, useTransform, useMotionValueEvent } from "framer-motion";

export default function Hero() {
    const canvasRef = useRef(null);
    const [images, setImages] = useState([]);
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
    // Adjust the "4" to control animation speed/duration relative to scroll
    const animationHeight = windowHeight * 4;
    const frameIndex = useTransform(scrollY, [0, animationHeight], [0, totalFrames - 1]);

    useEffect(() => {
        // Preload images
        const loadImages = async () => {
            const loadedImages = [];
            for (let i = 0; i < totalFrames; i++) {
                const img = new Image();
                const frameNum = i.toString().padStart(3, "0");
                img.src = `/hero-zip/frame_${frameNum}.jpg`;
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

        const img = images[index];

        // Get the DPR (Device Pixel Ratio)
        const dpr = window.devicePixelRatio || 1;

        // Use LOGICAL dimensions for calculations (since context is already scaled by DPR)
        const logicalWidth = canvas.width / dpr;
        const logicalHeight = canvas.height / dpr;

        // Calculate scale for 'object-cover' using logical dimensions
        const canvasRatio = logicalWidth / logicalHeight;
        const imgRatio = img.width / img.height;

        let renderW, renderH, offsetX, offsetY;

        // Always match width ("normal width") based on user request to avoid zoom
        // This relies on logical dimensions calculated above
        renderW = logicalWidth;
        renderH = img.height * (logicalWidth / img.width);
        offsetX = 0;
        offsetY = (logicalHeight - renderH) / 2;

        // Clear using logical dimensions (or sufficiently large values)
        ctx.clearRect(0, 0, logicalWidth, logicalHeight);
        ctx.drawImage(img, 0, 0, img.width, img.height, offsetX, offsetY, renderW, renderH);
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

                // Re-render
                renderFrame(Math.min(Math.round(frameIndex.get()), totalFrames - 1));
            }
        };
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
    }, [isLoaded, windowHeight]);

    return (
        <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
            <canvas
                ref={canvasRef}
                className="w-full h-full object-cover"
                style={{ width: '100%', height: '100%' }}
            />
            {!isLoaded && <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-primary animate-pulse font-mono text-sm">Sequence Loading...</div>}
        </div>
    );
}
