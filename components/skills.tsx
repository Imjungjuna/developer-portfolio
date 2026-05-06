"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { SectionLabel } from "@/components/section-label";
import { SkillCard } from "@/components/skill-card";
import { skillCategories } from "@/data/skills";
import { fadeUp, staggerContainer } from "@/lib/animations";

export function Skills() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.1 });

  return (
    <section id="skills" className="py-16">
      <SectionLabel>Skills</SectionLabel>
      <motion.div
        ref={ref}
        className="mt-6 grid gap-4 md:grid-cols-3"
        variants={staggerContainer}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {skillCategories.map((category) => (
          <motion.div key={category.title} variants={fadeUp}>
            <SkillCard category={category} />
          </motion.div>
        ))}
      </motion.div>
    </section>
  );
}
