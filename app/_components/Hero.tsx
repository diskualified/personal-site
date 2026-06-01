"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import AnimatedChars from "./AnimatedChars";
import ParticleCanvas from "./ParticleCanvas";
import { profile } from "./content-data";

export default function Hero() {
  const ref = useRef<HTMLElement>(null);

  // Map scroll through the hero section to parallax values
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -110]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.65], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.93]);
  const indicatorOpacity = useTransform(scrollYProgress, [0, 0.3], [1, 0]);

  const [first, ...rest] = profile.name.split(" ");

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
      {/* Atmospheric particle field */}
      <ParticleCanvas />

      <motion.div
        style={{ y: contentY, opacity: contentOpacity, scale: contentScale }}
        className="relative z-10 flex flex-col items-center"
      >
        <motion.p
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.15, duration: 0.6, ease: "easeOut" }}
          className="font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-500"
        >
          new game · press scroll to begin
        </motion.p>

        {/* Per-character name — the logartis signature technique */}
        <h1 className="mt-10 text-6xl font-light tracking-tight sm:text-7xl md:text-8xl">
          <AnimatedChars text={first} inView delay={0.45} />
          <span className="text-neutral-400 dark:text-neutral-600">
            {rest.length ? (
              <AnimatedChars
                text={" " + rest.join(" ")}
                inView
                delay={0.45 + first.length * 0.038}
              />
            ) : null}
          </span>
        </h1>

        <motion.p
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2, duration: 0.6, ease: "easeOut" }}
          className="mt-8 max-w-md text-neutral-500 dark:text-neutral-400"
        >
          {profile.tagline}
        </motion.p>

        <motion.nav
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.6, ease: "easeOut" }}
          className="mt-16 flex flex-wrap items-center justify-center gap-x-8 gap-y-2 font-mono text-xs uppercase tracking-widest text-neutral-500"
        >
          <a
            className="transition hover:text-neutral-900 dark:hover:text-neutral-100"
            href="#journey"
          >
            journey
          </a>
          <span aria-hidden>·</span>
          <a
            className="transition hover:text-neutral-900 dark:hover:text-neutral-100"
            href="#projects"
          >
            projects
          </a>
          <span aria-hidden>·</span>
          <a
            className="transition hover:text-neutral-900 dark:hover:text-neutral-100"
            href="#resume"
          >
            resume
          </a>
        </motion.nav>
      </motion.div>

      {/* Scroll indicator fades as user scrolls away */}
      <motion.div
        style={{ opacity: indicatorOpacity }}
        className="absolute bottom-12 flex flex-col items-center gap-3 text-neutral-400"
      >
        <span className="font-mono text-[10px] uppercase tracking-[0.3em]">
          scroll
        </span>
        <span className="block h-10 w-px animate-pulse bg-neutral-300 dark:bg-neutral-700" />
      </motion.div>
    </section>
  );
}
