"use client";

import { ReactLenis } from "@studio-freight/react-lenis";

export function SmoothScroll({ children }: { children: React.ReactNode }) {
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const Lenis = ReactLenis as any;
  return (
    <Lenis root options={{ lerp: 0.05, duration: 1.5 }}>
      {children}
    </Lenis>
  );
}
