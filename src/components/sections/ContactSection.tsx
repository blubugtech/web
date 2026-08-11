'use client';

import { motion } from 'framer-motion';
import { Magnetic } from '@/components/ui/Magnetic';

export function ContactSection() {
  return (
    <section id="contact" className="py-32 px-6 md:px-12 bg-background text-foreground border-t border-border overflow-hidden flex flex-col items-center justify-center">
      <div className="max-w-4xl mx-auto text-center flex flex-col items-center justify-center space-y-12">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, ease: 'easeOut' }}
          className="space-y-6"
        >
          <h2 className="text-5xl md:text-7xl font-bold tracking-tighter">
            Contribute & Support
          </h2>
          <p className="text-muted-foreground text-lg md:text-xl max-w-xl mx-auto font-light">
            Blu Bug Tech is open to contributions. Open-source projects grow through people who use them, improve them, and share them.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.2, ease: 'easeOut' }}
        >
          <Magnetic>
            <a href="https://github.com/blubugtech" target="_blank" className="inline-block px-8 py-4 bg-blue-600 text-white rounded-full font-medium text-lg tracking-tight hover:scale-105 hover:bg-blue-700 transition-all duration-300">
              Explore GitHub
            </a>
          </Magnetic>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ duration: 0.8, delay: 0.4, ease: 'easeOut' }}
          className="mt-16 pt-16 border-t border-border w-full flex flex-col items-center gap-4"
        >
          <p className="text-sm text-blue-600 uppercase tracking-widest font-semibold">About the Creator</p>
          <h3 className="text-2xl font-bold">Aman Kumar Maurya</h3>
          <p className="text-muted-foreground">Software Developer · Open-Source Builder</p>
          <div className="flex items-center gap-4 mt-4">
            <a href="https://github.com/amankrmj09" target="_blank" className="text-blue-600 hover:underline">GitHub Profile</a>
            <span className="text-muted-foreground">•</span>
            <a href="https://amankrmj.dev" target="_blank" className="text-blue-600 hover:underline">Portfolio</a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
