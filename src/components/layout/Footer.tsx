"use client";

import Link from "next/link";
import Image from "next/image";
import { Magnetic } from "@/components/ui/Magnetic";

export function Footer() {
  return (
    <footer className="w-full py-12 px-8 border-t border-border/50 bg-background/80">
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-6">
        <div className="flex flex-col items-center md:items-start gap-4">
          <div className="flex items-center gap-3">
            <div className="relative w-8 h-8 overflow-hidden rounded-full border border-border">
              <Image src="/logo/logo.png" alt="Blu Bug Tech Logo" fill className="object-contain p-1" />
            </div>
            <span className="text-lg font-bold tracking-tighter text-foreground">
              Blu Bug Tech
            </span>
          </div>
          <p className="text-sm text-muted-foreground text-center md:text-left">
            © {new Date().getFullYear()} Blu Bug Tech. <br className="md:hidden" />Building useful open-source software.
          </p>
        </div>
        <div className="flex items-center space-x-6">
          <Magnetic>
            <Link href="https://github.com/blubugtech" target="_blank" className="px-2 py-1 block text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
              GitHub
            </Link>
          </Magnetic>
          <Magnetic>
            <Link href="https://github.com/amankrmj09" target="_blank" className="px-2 py-1 block text-sm text-muted-foreground hover:text-foreground transition-colors duration-300">
              Creator
            </Link>
          </Magnetic>
        </div>
      </div>
    </footer>
  );
}
