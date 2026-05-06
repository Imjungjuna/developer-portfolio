"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import { fadeUp } from "@/lib/animations";

export function SectionLabel({ children }: { children: React.ReactNode }) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <motion.p
      ref={ref}
      className="text-sm font-medium text-muted-foreground"
      variants={fadeUp}
      initial="hidden"
      animate={isInView ? "visible" : "hidden"}
    >
      {children}
    </motion.p>
  );
}
