"use client";

import { useMotionValue, useSpring, useTransform, motion, MotionValue } from "framer-motion";
import { useEffect, useRef } from "react";

export function InteractiveGrid() {
  const containerRef = useRef<HTMLDivElement>(null);

  // Track mouse position relative to container
  const mouseX = useMotionValue(-1000); 
  const mouseY = useMotionValue(-1000);

  // Spring physics for smooth follow effect (softer, lazier feel)
  const springConfig = { damping: 20, stiffness: 60, mass: 0.2 };
  const smoothX = useSpring(mouseX, springConfig);
  const smoothY = useSpring(mouseY, springConfig);

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!containerRef.current) return;
      const rect = containerRef.current.getBoundingClientRect();
      mouseX.set(e.clientX - rect.left);
      mouseY.set(e.clientY - rect.top);
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => {
      window.removeEventListener("mousemove", handleMouseMove);
    };
  }, [mouseX, mouseY]);

  // Generate a grid of full-length lines
  const spacing = 96;
  const cols = 30; // approx 2880px width
  const rows = 20; // approx 1920px height

  const hLines: number[] = [];
  const vLines: number[] = [];

  for (let r = 0; r <= rows; r++) {
    hLines.push(r * spacing);
  }
  for (let c = 0; c <= cols; c++) {
    vLines.push(c * spacing);
  }

  return (
    <div ref={containerRef} className="absolute inset-0 w-full h-full pointer-events-none overflow-hidden z-0">
      {/* Horizontal Lines (shift up/down) */}
      {hLines.map((y, i) => (
        <MagneticHorizontalLine key={`h-${i}`} y={y} smoothY={smoothY} />
      ))}
      
      {/* Vertical Lines (shift left/right) */}
      {vLines.map((x, i) => (
        <MagneticVerticalLine key={`v-${i}`} x={x} smoothX={smoothX} />
      ))}
    </div>
  );
}

function MagneticHorizontalLine({ y, smoothY }: { y: number; smoothY: MotionValue<number> }) {
  // Calculate vertical shift based on distance to mouse Y
  const yOffset = useTransform(smoothY, (my: number) => {
    const distance = my - y;
    const influenceRadius = 120; // How close the mouse needs to be
    const maxPull = 30; // How far the line moves (in pixels)

    if (Math.abs(distance) < influenceRadius) {
      // Pull line towards mouse smoothly
      const pull = (1 - Math.abs(distance) / influenceRadius) * maxPull;
      return distance > 0 ? pull : -pull;
    }
    return 0;
  });

  return (
    <motion.div
      className="absolute left-0 right-0 h-[1px] bg-foreground/15"
      style={{ top: y, y: yOffset }}
    />
  );
}

function MagneticVerticalLine({ x, smoothX }: { x: number; smoothX: MotionValue<number> }) {
  // Calculate horizontal shift based on distance to mouse X
  const xOffset = useTransform(smoothX, (mx: number) => {
    const distance = mx - x;
    const influenceRadius = 120; // How close the mouse needs to be
    const maxPull = 30; // How far the line moves (in pixels)

    if (Math.abs(distance) < influenceRadius) {
      // Pull line towards mouse smoothly
      const pull = (1 - Math.abs(distance) / influenceRadius) * maxPull;
      return distance > 0 ? pull : -pull;
    }
    return 0;
  });

  return (
    <motion.div
      className="absolute top-0 bottom-0 w-[1px] bg-foreground/15"
      style={{ left: x, x: xOffset }}
    />
  );
}
