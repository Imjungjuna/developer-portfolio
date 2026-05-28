"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { SectionLabel } from "@/components/section-label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { education } from "@/data/education";
import { fadeUp } from "@/lib/animations";

export function Education() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <section id="education" className="py-16">
      <SectionLabel>Education</SectionLabel>
      <motion.div
        ref={ref}
        className="mt-6 space-y-4"
        variants={fadeUp}
        initial="hidden"
        animate={isInView ? "visible" : "hidden"}
      >
        {education.map((edu) => (
          <Card
            key={edu.school}
            className="-mx-6 sm:mx-0 rounded-none sm:rounded-xl"
          >
            <CardHeader className="px-6 sm:px-4">
              <div className="flex items-center justify-between">
                <CardTitle className="text-lg">{edu.school}</CardTitle>
                <span className="text-sm text-muted-foreground">
                  {edu.period}
                </span>
              </div>
              <p className="text-sm text-muted-foreground">{edu.degree}</p>
            </CardHeader>
            <CardContent className="px-6 sm:px-4">
              <ul className="list-disc space-y-1 pl-4 text-sm text-muted-foreground">
                {edu.details.map((detail) => (
                  <li key={detail}>{detail}</li>
                ))}
              </ul>
            </CardContent>
          </Card>
        ))}
      </motion.div>
    </section>
  );
}
