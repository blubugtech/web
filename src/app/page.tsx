import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { ShowcaseSection } from "@/components/sections/ShowcaseSection";
import Link from "next/link";
import { Magnetic } from "@/components/ui/Magnetic";

export default function Home() {
  return (
    <main className="flex min-h-screen flex-col w-full">
      <HeroSection />
      <ShowcaseSection />
      <AboutSection />
      
      {/* Simple CTA linking to Contact */}
      <section className="py-24 flex flex-col items-center justify-center bg-background/50 px-6 text-center border-t border-border/50">
        <h2 className="text-4xl md:text-5xl font-bold tracking-tight text-foreground mb-6">Ready to collaborate?</h2>
        <p className="text-lg text-muted-foreground mb-10 max-w-lg">Let&apos;s build something useful together. Check out the projects or get in touch.</p>
        <Magnetic>
          <Link href="/contact" className="px-8 py-4 bg-primary text-primary-foreground rounded-full font-medium tracking-tight hover:brightness-110 hover:scale-105 transition-all duration-300 shadow-lg shadow-primary/20">
            Get in touch
          </Link>
        </Magnetic>
      </section>
    </main>
  );
}
