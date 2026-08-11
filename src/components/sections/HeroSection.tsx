"use client";

import { useState, useEffect, useRef } from "react";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useLenis } from "@studio-freight/react-lenis";

const WORDS = ["Build.", "Debug.", "Deploy.", "Iterate."];

export function HeroSection() {
  const lenis = useLenis();
  const containerRef = useRef<HTMLDivElement>(null);
  const isInView = useInView(containerRef, { amount: 0.4 });

  const [state, setState] = useState({
    count: 0,
    items: [{ id: 0, word: WORDS[0] }]
  });

  useEffect(() => {
    if (!isInView) return;

    const interval = setInterval(() => {
      setState(prevState => {
        const next = prevState.count + 1;
        const nextWord = WORDS[next % WORDS.length];
        const newItems = [...prevState.items, { id: next, word: nextWord }];
        // Keep only the last 3 items
        if (newItems.length > 3) {
          return { count: next, items: newItems.slice(newItems.length - 3) };
        }
        return { count: next, items: newItems };
      });
    }, 2500);

    return () => clearInterval(interval);
  }, [isInView]);

  const items = state.items;

  return (
    <section className="relative w-full h-[calc(100vh-72px)] mt-[72px] flex flex-col items-center justify-center text-foreground px-6 overflow-hidden">
      <div className="max-w-7xl mx-auto w-full flex flex-col items-start justify-center relative z-10" ref={containerRef}>
        
        {/* Animated Infinite Words List */}
        <div className="flex flex-col w-full h-[250px] md:h-[400px] relative justify-end">
          <AnimatePresence mode="popLayout">
            {items.map((item, index) => {
              const isLatest = index === items.length - 1;
              return (
                <motion.div
                  key={item.id}
                  layout
                  initial={{ opacity: 0, y: 50 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -50 }}
                  transition={{ duration: 0.6, ease: "easeOut" }}
                  className="w-full flex"
                >
                  <h1 className={`text-6xl md:text-8xl lg:text-[9rem] font-bold tracking-tighter uppercase leading-[0.9] ${isLatest ? 'text-primary' : 'text-foreground transition-colors duration-1000'}`}>
                    <motion.span
                      initial={{ clipPath: "polygon(0 0, 0 0, 0 100%, 0% 100%)" }}
                      animate={{ clipPath: "polygon(0 0, 100% 0, 100% 100%, 0% 100%)" }}
                      transition={{ duration: 0.8, ease: "easeOut" }}
                      style={{ display: "inline-block", whiteSpace: "nowrap" }}
                    >
                      {item.word}
                    </motion.span>
                  </h1>
                </motion.div>
              );
            })}
          </AnimatePresence>
        </div>
        
        {/* Static Subtext */}
        <motion.div 
          initial={{ opacity: 0 }} 
          animate={{ opacity: 1 }} 
          transition={{ delay: 1, duration: 1 }}
          className="overflow-hidden mt-6 md:mt-12 space-y-3"
        >
          <p className="text-lg md:text-2xl text-muted-foreground max-w-2xl font-light tracking-wide">
            Open-Source Software | Technical Guides
          </p>
          <p className="text-sm md:text-base text-muted-foreground max-w-2xl font-mono leading-relaxed hidden md:block">
            Building useful open-source software; <br/>
            Sharing practical technical guides; <br/>
            Learning by building and sharing.
          </p>
        </motion.div>
      </div>

      {/* Button anchored to the bottom of the hero section with no gap */}
      <div className="absolute bottom-0 right-0 md:right-8 z-50">
        <button 
          onClick={() => lenis?.scrollTo('#projects', { duration: 2 })}
          className="inline-block px-6 py-3 md:px-8 md:py-4 bg-background/50 backdrop-blur-sm text-foreground border border-border/50 border-b-0 rounded-t-xl font-medium text-xs md:text-base uppercase tracking-widest hover:bg-primary hover:text-primary-foreground transition-colors duration-300 shadow-[0_-10px_20px_-10px_rgba(0,0,0,0.1)]"
        >
          Explore Projects
        </button>
      </div>
    </section>
  );
}
