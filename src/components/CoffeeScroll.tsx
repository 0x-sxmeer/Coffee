"use client";

import { useScroll, useTransform, motion, AnimatePresence } from "framer-motion";
import { useEffect, useRef, useState } from "react";
import clsx from "clsx";

const FRAME_COUNT = 120;
const IMAGES_TO_PRELOAD = Array.from(
  { length: FRAME_COUNT },
  (_, i) => `/sequence/ezgif-frame-${(i + 1).toString().padStart(3, "0")}.jpg`
);

export default function CoffeeScroll() {
  const containerRef = useRef<HTMLDivElement>(null);
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [images, setImages] = useState<HTMLImageElement[]>([]);
  const [loadedCount, setLoadedCount] = useState(0);
  const [isLoading, setIsLoading] = useState(true);

  // Track scroll progress
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Map individual frame index to scroll progress
  const frameIndex = useTransform(scrollYProgress, [0, 1], [0, FRAME_COUNT - 1]);
  
  // Opacity transforms for text sections
  const opacity1 = useTransform(scrollYProgress, [0, 0.15, 0.20], [1, 1, 0]);
  const opacity2 = useTransform(scrollYProgress, [0.20, 0.25, 0.40, 0.45], [0, 1, 1, 0]);
  const x2 = useTransform(scrollYProgress, [0.20, 0.40], [-50, 0]);
  
  const opacity3 = useTransform(scrollYProgress, [0.45, 0.50, 0.65, 0.70], [0, 1, 1, 0]);
  const x3 = useTransform(scrollYProgress, [0.50, 0.65], [50, 0]);

  const opacity4 = useTransform(scrollYProgress, [0.75, 0.80, 1], [0, 1, 1]);
  const scale4 = useTransform(scrollYProgress, [0.75, 1], [0.8, 1]);

  // Preload images
  useEffect(() => {
    let loaded = 0;
    const imgArray: HTMLImageElement[] = [];
    
    // Safety check for browser environment
    if (typeof window === "undefined") return;

    IMAGES_TO_PRELOAD.forEach((src) => {
      const img = new Image();
      img.src = src;
      img.onload = () => {
        loaded++;
        setLoadedCount(loaded);
        if (loaded === FRAME_COUNT) {
          setIsLoading(false);
        }
      };
      imgArray.push(img);
    });

    setImages(imgArray);
  }, []);

  // Canvas render loop
  useEffect(() => {
    if (isLoading || images.length === 0) return;

    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext("2d");
    if (!ctx) return;

    // High DPI Canvas setup
    const updateSize = () => {
      const parent = canvas.parentElement;
      if (parent) {
        canvas.width = parent.clientWidth;
        canvas.height = parent.clientHeight;
        
        // Initial draw after resize
        const currentIndex = Math.min(
          FRAME_COUNT - 1,
          Math.max(0, Math.floor(frameIndex.get()))
        );
        renderFrame(currentIndex);
      }
    };

    const renderFrame = (index: number) => {
      if (!images[index] || !ctx || !canvas) return;
      
      const img = images[index];
      
      // Clear canvas
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      // Calculate "object-cover" logic for canvas (fills the screen)
      const hRatio = canvas.width / img.width;
      const vRatio = canvas.height / img.height;
      const ratio = Math.max(hRatio, vRatio);
      
      const centerShift_x = (canvas.width - img.width * ratio) / 2;
      const centerShift_y = (canvas.height - img.height * ratio) / 2;
      
      ctx.drawImage(
        img,
        0,
        0,
        img.width,
        img.height,
        centerShift_x,
        centerShift_y,
        img.width * ratio,
        img.height * ratio
      );
    };

    window.addEventListener("resize", updateSize);
    updateSize();

    // Animation Loop
    let animationFrameId: number;
    const loop = () => {
      const rawIndex = frameIndex.get();
      const index = Math.min(FRAME_COUNT - 1, Math.max(0, Math.round(rawIndex)));
      renderFrame(index);
      animationFrameId = requestAnimationFrame(loop);
    };
    
    // Start loop
    loop();

    return () => {
      window.removeEventListener("resize", updateSize);
      cancelAnimationFrame(animationFrameId);
    };
  }, [isLoading, images, frameIndex]);

  return (
    <div className="relative w-full bg-homie-green">
      {/* Loading Screen */}
      <AnimatePresence>
        {isLoading && (
          <motion.div
            initial={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 flex flex-col items-center justify-center bg-homie-green text-white"
          >
            <div className="mb-4 text-2xl font-serif">Brewing...</div>
            <div className="h-1 w-64 overflow-hidden rounded-full bg-white/20">
              <motion.div
                className="h-full bg-white"
                initial={{ width: "0%" }}
                animate={{ width: `${(loadedCount / FRAME_COUNT) * 100}%` }}
              />
            </div>
            <div className="mt-2 font-mono text-sm opacity-60">
              {Math.round((loadedCount / FRAME_COUNT) * 100)}%
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Scroll Container */}
      <div ref={containerRef} className="relative h-[600vh]">
        {/* Sticky CanvasWrapper */}
        <div className="sticky top-0 h-screen w-full overflow-hidden">
          <canvas
            ref={canvasRef}
            className="absolute inset-0 h-full w-full"
          />
          
          {/* Overlays */}
          <div className="absolute inset-0 pointer-events-none flex flex-col items-center justify-center">
            
            {/* 0% - 15% */}
            <motion.div 
              style={{ opacity: opacity1 }} 
              className="absolute text-center px-4"
            >
              <h1 className="text-6xl md:text-8xl font-serif font-bold text-white mb-4 tracking-tight">
                HOMIE Coffee.
              </h1>
              <p className="text-xl md:text-2xl font-light text-white/80 tracking-widest uppercase">
                Pure Origin
              </p>
            </motion.div>

            {/* 25% - 40% */}
            <motion.div 
              style={{ opacity: opacity2, x: x2 }} 
              className="absolute left-[10%] max-w-md"
            >
              <h2 className="text-4xl md:text-5xl font-serif leading-tight text-white mb-4">
                The journey begins
                <br />
                <span className="italic text-white/70">with the cherry.</span>
              </h2>
            </motion.div>

            {/* 50% - 65% */}
            <motion.div 
              style={{ opacity: opacity3, x: x3 }} 
              className="absolute right-[10%] max-w-md text-right"
            >
              <h2 className="text-4xl md:text-5xl font-serif leading-tight text-white mb-4">
                Roasted for Depth.
                <br />
                <span className="italic text-white/70">Ground for Flavor.</span>
              </h2>
            </motion.div>

            {/* 80% - 100% */}
            <motion.div 
              style={{ opacity: opacity4, scale: scale4 }} 
              className="absolute text-center bottom-[20%]"
            >
              <h2 className="text-5xl md:text-7xl font-serif font-bold text-white mb-8">
                Made for the Homies.
              </h2>
              <button className="pointer-events-auto rounded-full bg-white px-8 py-4 text-homie-green font-bold uppercase tracking-wider transition-transform hover:scale-105 hover:bg-white/90">
                Order Now
              </button>
            </motion.div>

          </div>
        </div>
      </div>
      
      {/* Footer / Extra Content to allow scrolling past */}

    </div>
  );
}
