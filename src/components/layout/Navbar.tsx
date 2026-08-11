"use client";

import Link from "next/link";
import Image from "next/image";
import { Magnetic } from "@/components/ui/Magnetic";
import { ThemeToggle } from "@/components/ui/ThemeToggle";

export function Navbar() {
  return (
    <nav className="w-full fixed top-0 left-0 z-50 flex items-center justify-between px-8 py-4 bg-background/90 backdrop-blur-md border-b border-border/50">
      <div className="flex items-center gap-3">
        <Link href="/" className="flex items-center gap-3 group">
          <div className="relative w-10 h-10 overflow-hidden rounded-full border border-border group-hover:scale-105 transition-transform duration-300">
            <Image src="/logo/logo.png" alt="Blu Bug Tech Logo" fill className="object-contain p-[2px]" />
          </div>
          <span className="text-xl font-bold tracking-tighter text-foreground">
            Blu Bug Tech
          </span>
        </Link>
      </div>
      <div className="flex items-center space-x-1 md:space-x-2">
        <Magnetic>
          <Link href="/#about" className="px-2 md:px-4 py-2 block text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300">
            About
          </Link>
        </Magnetic>
        <Magnetic>
          <Link href="/projects" className="px-2 md:px-4 py-2 block text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300">
            Projects
          </Link>
        </Magnetic>
        <Magnetic>
          <Link href="/contact" className="px-2 md:px-4 py-2 block text-xs md:text-sm font-medium text-muted-foreground hover:text-foreground transition-colors duration-300">
            Contact
          </Link>
        </Magnetic>
        <div className="pl-2 border-l border-border ml-2 flex items-center">
          <ThemeToggle />
        </div>
      </div>
    </nav>
  );
}
