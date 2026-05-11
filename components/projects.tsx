"use client";

import { useRef, useState } from "react";
import { motion, useInView } from "motion/react";
import { Monitor, Smartphone, EyeOff } from "lucide-react";
import { SectionLabel } from "@/components/section-label";
import { ProjectCard, type VideoMode } from "@/components/project-card";
import { projects } from "@/data/projects";
import { fadeUp, staggerContainer } from "@/lib/animations";

const VIDEO_MODES: {
  mode: VideoMode;
  icon: React.ElementType;
  label: string;
}[] = [
  { mode: "desktop", icon: Monitor, label: "Desktop view" },
  { mode: "mobile", icon: Smartphone, label: "Mobile view" },
  { mode: "hidden", icon: EyeOff, label: "Hide videos" },
];

export function Projects() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });
  const [videoMode, setVideoMode] = useState<VideoMode>("desktop");

  return (
    <section id="projects" className="py-16">
      <div className="flex items-center justify-between">
        <SectionLabel>Projects</SectionLabel>
        <div role="group" aria-label="Video display mode" className="hidden sm:flex items-center gap-1">
          {VIDEO_MODES.map(({ mode, icon: Icon, label }) => (
            <button
              key={mode}
              onClick={() => setVideoMode(mode)}
              aria-label={label}
              aria-pressed={videoMode === mode}
              className={`p-1 transition-colors ${
                videoMode === mode
                  ? "text-foreground"
                  : "text-muted-foreground hover:text-foreground"
              }`}
            >
              <Icon className="size-4" />
            </button>
          ))}
        </div>
      </div>
      <motion.div
        ref={ref}
        className="mt-6 space-y-6"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {projects.map((project) => (
          <motion.div key={project.id} variants={fadeUp}>
            <ProjectCard project={project} videoMode={videoMode} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
