"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import AnimatedChars from "../effects/AnimatedChars";

export default function JourneyHeader() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <header ref={ref} className="mb-20 text-center md:mb-28">
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, ease: "easeOut" }}
        className="font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-500"
      >
        act one
      </motion.p>
      <h2 className="mt-4 text-3xl font-light tracking-tight md:text-4xl">
        <AnimatedChars text="the journey so far" inView={inView} delay={0.1} />
      </h2>
      <motion.p
        initial={{ opacity: 0, y: 10 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ delay: 0.8, duration: 0.5, ease: "easeOut" }}
        className="mt-4 text-sm text-neutral-500"
      >
        each marker is a chapter. tap the runes along the way to open
        side-quests.
      </motion.p>
    </header>
  );
}
