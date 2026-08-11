"use client";

import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { fadeUpContainer, fadeUpItem } from "@/lib/animations";
import { Magnetic } from "@/components/ui/Magnetic";
import Link from "next/link";
import { apiClient } from "@/lib/axios";

interface ProjectSummary {
  id: string;
  title: string;
  shortDesc: string;
  type: string;
  techStack?: string[];
  tags?: string[];
  thumbnailUrl?: string;
  isFeatured?: boolean;
  links?: { live?: string, repo?: string };
}

function ProjectCardSkeleton() {
  return (
    <div className="group block p-8 rounded-3xl bg-background/40 backdrop-blur-md border border-border">
      <div className="flex flex-col h-full justify-between">
        <div>
          <div className="h-8 w-1/2 bg-muted/50 rounded mb-4 animate-pulse"></div>
          <div className="h-4 w-full bg-muted/50 rounded mb-2 animate-pulse"></div>
          <div className="h-4 w-5/6 bg-muted/50 rounded mb-8 animate-pulse"></div>
        </div>
        <div className="flex flex-wrap gap-2">
          {[1, 2, 3].map((i) => (
            <div key={i} className="h-6 w-16 bg-muted/50 rounded-full animate-pulse"></div>
          ))}
        </div>
      </div>
    </div>
  );
}


export default function ProjectsPage() {
  const [allProjects, setAllProjects] = useState<ProjectSummary[]>([]);

  useEffect(() => {
    apiClient.get('/api/projects?size=100')
      .then(res => setAllProjects(res.data.content || []))
      .catch(console.error);
  }, []);

  return (
    <main className="min-h-screen pt-32 pb-24 px-6 md:px-12 bg-background/25 text-foreground">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="mb-16"
        >
          <h1 className="text-5xl md:text-7xl font-bold tracking-tighter mb-6">
            All Projects
          </h1>
          <p className="text-lg text-muted-foreground max-w-2xl leading-relaxed">
            Small and useful software projects built and shared openly. Dive into our open-source tools, services, and experimental grids.
          </p>
        </motion.div>

        <motion.div
          variants={fadeUpContainer}
          initial="hidden"
          animate="visible"
          className="grid grid-cols-1 md:grid-cols-2 gap-8"
        >
          {allProjects.length > 0 ? (
            allProjects.map((project, idx) => (
              <motion.a
                href={project.links?.live || project.links?.repo || "#"}
                target="_blank"
                key={project.id || idx}
                variants={fadeUpItem}
                className="group block p-8 rounded-3xl bg-background/40 backdrop-blur-md border border-border hover:border-primary hover:shadow-2xl hover:shadow-primary/10 transition-all duration-500 overflow-hidden relative"
              >
                {project.isFeatured && (
                  <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-bold px-3 py-1 rounded-bl-lg">
                    Featured
                  </div>
                )}
                <div className="flex flex-col h-full justify-between relative z-10">
                  <div>
                    {project.thumbnailUrl && (
                      <div className="mb-6 rounded-xl overflow-hidden aspect-video bg-muted/20 border border-border/50">
                        <img 
                          src={project.thumbnailUrl} 
                          alt={project.title} 
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" 
                        />
                      </div>
                    )}
                    <h2 className="text-2xl font-bold mb-4 group-hover:text-primary transition-colors duration-300">
                      {project.title}
                    </h2>
                    <p className="text-muted-foreground leading-relaxed mb-8">
                      {project.shortDesc}
                    </p>
                  </div>
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-wrap gap-2">
                      {(project.tags || []).map((t) => (
                        <span key={t} className="px-3 py-1 text-xs font-semibold uppercase tracking-wider bg-background border border-border rounded-full text-muted-foreground group-hover:border-primary/40 group-hover:text-primary transition-colors duration-300">
                          {t}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </motion.a>
            ))
          ) : (
            [0, 1, 2, 3].map((idx) => (
              <motion.div key={idx} variants={fadeUpItem}>
                <ProjectCardSkeleton />
              </motion.div>
            ))
          )}
        </motion.div>
        
        <div className="mt-24 flex justify-center">
          <Magnetic>
            <Link href="/" className="px-8 py-4 rounded-full border border-border font-medium hover:bg-foreground hover:text-background transition-colors duration-300">
              Back to Home
            </Link>
          </Magnetic>
        </div>
      </div>
    </main>
  );
}
