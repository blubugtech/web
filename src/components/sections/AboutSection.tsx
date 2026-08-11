"use client";

import { motion } from "framer-motion";

const statements = [
  "We build it.",
  "We debug it.",
  "We deploy it.",
  "We secure it.",
  "We open-source it.",
  "We iterate on it.",
  "We scale it.",
];

export function AboutSection() {
  return (
    <section id="about" className="relative text-foreground border-t border-border/50">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-start px-6 md:px-12 lg:px-24 gap-y-12 md:gap-x-16 lg:gap-x-32">
        
        {/* Left Content - Sticky */}
        <div className="md:sticky md:top-0 h-auto md:h-screen w-full md:flex-1 flex flex-col justify-center max-w-md pt-24 md:pt-0 pb-12 md:pb-0 z-20">
          <h2 className="text-sm font-semibold text-primary uppercase tracking-widest mb-4">Our Goal</h2>
          <h3 className="text-4xl md:text-5xl font-light tracking-tight text-foreground mb-8 leading-tight">
            Software development is full of bugs. Don&apos;t fear them.
          </h3>
          <div className="flex flex-col gap-4 text-lg text-muted-foreground">
            <p>
              Find the bug. Understand it. Fix it. Learn from it. Build better.
            </p>
            <p className="font-medium text-foreground">
              Blu Bug Tech is an independent open-source initiative focused on building useful software and sharing practical technical knowledge.
            </p>
          </div>
        </div>

        {/* Right Content - Native Scrolling with 3D Reveal */}
        <div className="w-full md:flex-1 flex flex-col items-center md:items-start pt-12 md:pt-[20vh] pb-[10vh] md:pb-[20vh] z-10 @container overflow-hidden">
          {statements.map((statement, index) => (
            <div key={index} className="h-[16vh] md:h-[20vh] flex items-center justify-center md:justify-start w-full [perspective:1200px]">
              <motion.h4
                initial={{ opacity: 0, y: 50, rotateX: -45, scale: 0.9 }}
                whileInView={{ opacity: 1, y: 0, rotateX: 0, scale: 1 }}
                viewport={{ once: false, margin: "-10% 0px -10% 0px" }}
                transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
                className="text-[12cqw] md:text-[9cqw] font-bold tracking-tighter text-foreground origin-bottom cursor-default whitespace-nowrap"
              >
                {statement}
              </motion.h4>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
