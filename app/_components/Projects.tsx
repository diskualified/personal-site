"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import AnimatedChars from "./AnimatedChars";
import { projects } from "./content-data";

export default function Projects() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="projects"
      ref={ref}
      className="mx-auto w-full max-w-3xl px-6 py-24 md:py-32"
    >
      <header className="mb-12 text-center md:mb-16">
        <motion.p
          initial={{ opacity: 0, y: 10 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, ease: "easeOut" }}
          className="font-mono text-[10px] uppercase tracking-[0.4em] text-neutral-500"
        >
          inventory
        </motion.p>
        <h2 className="mt-4 text-3xl font-light tracking-tight md:text-4xl">
          <AnimatedChars text="projects" inView={inView} delay={0.1} />
        </h2>
      </header>

      <ul className="divide-y divide-neutral-200 border-y border-neutral-200 dark:divide-neutral-800 dark:border-neutral-800">
        {projects.map((p, i) => (
          <motion.li
            key={p.name}
            initial={{ opacity: 0, x: -16 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{
              delay: 0.3 + i * 0.1,
              duration: 0.5,
              ease: [0.25, 0.46, 0.45, 0.94],
            }}
          >
            <a
              href={p.href}
              className="group flex flex-col gap-1 py-6 transition sm:grid sm:grid-cols-[5rem_1fr_auto] sm:items-baseline sm:gap-6"
            >
              <span className="font-mono text-xs text-neutral-500">
                {p.year}
              </span>
              <div className="flex flex-col gap-1 sm:flex-row sm:items-baseline sm:gap-3">
                <span className="text-lg group-hover:underline">{p.name}</span>
                <span className="text-sm text-neutral-500">{p.summary}</span>
              </div>
              <span className="font-mono text-[11px] uppercase tracking-widest text-neutral-400 transition group-hover:text-neutral-900 dark:group-hover:text-neutral-100">
                {p.tag} →
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
    </section>
  );
}
