'use client';

import { useRef, useEffect, useState } from 'react';
import { motion, useScroll, useTransform, MotionValue } from 'framer-motion';
import { fadeUpContainer, fadeUpItem } from '@/lib/animations';
import Link from 'next/link';
import { apiClient } from '@/lib/axios';

interface ProjectSummary {
  title: string;
  shortDesc: string;
  links?: { live?: string, repo?: string };
}

function SkeletonStackCard({ index }: { index: number }) {
  const y = [0, 30, 60][index] || 60;
  const scale = [1, 0.95, 0.90][index] || 0.90;
  const opacity = [1, 0.8, 0.6][index] || 0.6;
  
  return (
    <div 
      style={{
        transform: `translateY(${y}px) scale(${scale})`,
        opacity,
        zIndex: 10 - index,
        transformOrigin: "top center",
      }}
      className="absolute top-0 left-0 w-full flex flex-col justify-between p-8 md:p-12 h-[400px] rounded-3xl bg-background border border-border overflow-hidden shadow-xl"
    >
      <div className="z-10 flex justify-between items-start">
        <div className="w-12 h-12 bg-muted/50 border border-border rounded-full animate-pulse"></div>
        <div className="w-10 h-10 border border-border rounded-full bg-muted/50 animate-pulse"></div>
      </div>
      <div className="z-10 w-full">
        <div className="h-8 w-2/3 bg-muted/50 rounded mb-6 animate-pulse"></div>
        <div className="h-4 w-full bg-muted/50 rounded mb-2 animate-pulse"></div>
        <div className="h-4 w-4/5 bg-muted/50 rounded animate-pulse"></div>
      </div>
    </div>
  )
}

function StackCard({ 
  project, 
  index, 
  progress 
}: { 
  project: any, 
  index: number, 
  progress: MotionValue<number> 
}) {
  const y = useTransform(
    progress,
    [index - 2, index - 1, index, index + 1],
    [60, 30, 0, -800]
  );
  
  const scale = useTransform(
    progress,
    [index - 2, index - 1, index, index + 1],
    [0.90, 0.95, 1, 1.05]
  );
  
  const opacity = useTransform(
    progress,
    [index - 3, index - 2, index - 1, index, index + 0.8, index + 1],
    [0, 0.6, 0.8, 1, 0, 0]
  );
  
  const rotateX = useTransform(
    progress,
    [index, index + 1],
    [0, 15]
  );
  
  const rotateZ = useTransform(
    progress,
    [index, index + 1],
    [0, -5]
  );
  
  return (
    <motion.a 
      href={project.links?.live || project.links?.repo || "#"}
      target="_blank"
      style={{
        y, scale, opacity, rotateX, rotateZ,
        zIndex: 10 - index,
        transformOrigin: "top center",
      }}
      className="absolute top-0 left-0 w-full group flex flex-col justify-between p-8 md:p-12 h-[400px] rounded-3xl bg-background border border-border hover:border-primary/50 overflow-hidden shadow-xl"
    >
      <div className="absolute inset-0 bg-gradient-to-br from-primary/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
      
      <div className="z-10 flex justify-between items-start">
        <div className="w-12 h-12 bg-muted/50 border border-border rounded-full flex items-center justify-center text-xl group-hover:scale-110 transition-transform duration-500">
          {project.title.split(' ')[0]}
        </div>
        <div className="w-10 h-10 border border-border rounded-full flex items-center justify-center -rotate-45 group-hover:rotate-0 group-hover:bg-primary group-hover:border-primary group-hover:text-primary-foreground transition-all duration-300">
          →
        </div>
      </div>

      <div className="z-10">
        <h3 className="text-3xl font-bold mb-4 text-foreground group-hover:text-primary transition-colors duration-300">{project.title.split(' ').slice(1).join(' ')}</h3>
        <p className="text-muted-foreground group-hover:text-foreground transition-colors duration-300">
          {project.shortDesc}
        </p>
      </div>
    </motion.a>
  )
}

export function ShowcaseSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const [featuredProjects, setFeaturedProjects] = useState<ProjectSummary[]>([]);

  useEffect(() => {
    apiClient.get('/api/projects/recent')
      .then(res => setFeaturedProjects(res.data.content || []))
      .catch(console.error);
  }, []);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"]
  });

  const progress = useTransform(scrollYProgress, [0, 1], [0, Math.max(featuredProjects.length - 1, 0)]);

  if (featuredProjects.length === 0) {
    return (
      <section id="projects" className="bg-background/50 text-foreground border-t border-border/50">
        <div ref={containerRef} className="relative w-full py-24 sm:py-32 overflow-hidden">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
            
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUpContainer}
                className="max-w-2xl"
              >
                <motion.h2 
                  variants={fadeUpItem}
                  className="text-sm font-semibold leading-7 text-primary uppercase tracking-widest mb-2"
                >
                  What We Build
                </motion.h2>
                <motion.p 
                  variants={fadeUpItem}
                  className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6 text-foreground"
                >
                  Projects & Guides
                </motion.p>
                <motion.p 
                  variants={fadeUpItem}
                  className="text-lg leading-relaxed text-muted-foreground max-w-xl"
                >
                  Small and useful software projects built and shared openly alongside practical guides for learning and working with software.
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Link href="/projects" className="inline-block px-8 py-4 bg-foreground text-background font-medium rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300 shadow-lg shadow-black/5">
                  View All Projects
                </Link>
              </motion.div>
            </div>

            <div className="relative w-full max-w-2xl mx-auto h-[460px]">
              {[0, 1, 2].map((i) => (
                <SkeletonStackCard key={i} index={i} />
              ))}
            </div>

          </div>
        </div>
      </section>
    );
  }

  return (
    <section id="projects" className="bg-background/50 text-foreground border-t border-border/50">
      <div ref={containerRef} style={{ height: `${featuredProjects.length * 80}vh` }} className="relative w-full">
        <div className="sticky top-0 h-screen w-full flex flex-col justify-center overflow-hidden py-24 sm:py-32">
          <div className="mx-auto max-w-7xl px-6 lg:px-8 w-full">
            
            <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-10 mb-16">
              <motion.div
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, margin: "-100px" }}
                variants={fadeUpContainer}
                className="max-w-2xl"
              >
                <motion.h2 
                  variants={fadeUpItem}
                  className="text-sm font-semibold leading-7 text-primary uppercase tracking-widest mb-2"
                >
                  What We Build
                </motion.h2>
                <motion.p 
                  variants={fadeUpItem}
                  className="text-4xl font-bold tracking-tight sm:text-5xl lg:text-6xl mb-6 text-foreground"
                >
                  Projects & Guides
                </motion.p>
                <motion.p 
                  variants={fadeUpItem}
                  className="text-lg leading-relaxed text-muted-foreground max-w-xl"
                >
                  Small and useful software projects built and shared openly alongside practical guides for learning and working with software.
                </motion.p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, margin: "-100px" }}
                transition={{ duration: 0.8, delay: 0.3 }}
              >
                <Link href="/projects" className="inline-block px-8 py-4 bg-foreground text-background font-medium rounded-full hover:bg-primary hover:text-primary-foreground transition-colors duration-300 shadow-lg shadow-black/5">
                  View All Projects
                </Link>
              </motion.div>
            </div>

            <div className="relative w-full max-w-2xl mx-auto h-[400px]">
              {featuredProjects.map((project, i) => (
                <StackCard 
                  key={project.title}
                  project={project}
                  index={i}
                  progress={progress}
                />
              ))}
            </div>

          </div>
        </div>
      </div>
    </section>
  );
}
