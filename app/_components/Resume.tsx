"use client";

import { useRef } from "react";
import { motion, useInView } from "motion/react";
import AnimatedChars from "./AnimatedChars";
import { resume } from "./content-data";

export default function Resume() {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section
      id="resume"
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
          stats screen
        </motion.p>
        <h2 className="mt-4 text-3xl font-light tracking-tight md:text-4xl">
          <AnimatedChars text="resume" inView={inView} delay={0.1} />
        </h2>
      </header>

      <div className="grid gap-12 md:grid-cols-2">
        {/* Experience column */}
        <div>
          <motion.h3
            initial={{ opacity: 0, y: 10 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.3, duration: 0.5, ease: "easeOut" }}
            className="font-mono text-[11px] uppercase tracking-widest text-neutral-500"
          >
            experience
          </motion.h3>
          <ul className="mt-6 space-y-8">
            {resume.experience.map((e, i) => (
              <motion.li
                key={e.role + e.company}
                initial={{ opacity: 0, y: 16 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  delay: 0.4 + i * 0.12,
                  duration: 0.55,
                  ease: [0.25, 0.46, 0.45, 0.94],
                }}
              >
                <p className="text-lg">{e.role}</p>
                <p className="mt-1 text-sm text-neutral-500">
                  {e.company} · {e.period}
                </p>
                <p className="mt-3 leading-relaxed text-neutral-600 dark:text-neutral-400">
                  {e.summary}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>

        {/* Skills + education column */}
        <div className="space-y-12">
          <div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.35, duration: 0.5, ease: "easeOut" }}
              className="font-mono text-[11px] uppercase tracking-widest text-neutral-500"
            >
              education
            </motion.h3>
            <ul className="mt-6 space-y-4">
              {resume.education.map((e, i) => (
                <motion.li
                  key={e.school}
                  initial={{ opacity: 0, y: 16 }}
                  animate={inView ? { opacity: 1, y: 0 } : {}}
                  transition={{
                    delay: 0.45 + i * 0.12,
                    duration: 0.55,
                    ease: [0.25, 0.46, 0.45, 0.94],
                  }}
                >
                  <p>{e.degree}</p>
                  <p className="mt-1 text-sm text-neutral-500">
                    {e.school} · {e.period}
                  </p>
                </motion.li>
              ))}
            </ul>
          </div>

          <div>
            <motion.h3
              initial={{ opacity: 0, y: 10 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.5, duration: 0.5, ease: "easeOut" }}
              className="font-mono text-[11px] uppercase tracking-widest text-neutral-500"
            >
              skill tree
            </motion.h3>
            <ul className="mt-6 flex flex-wrap gap-2">
              {resume.skills.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={inView ? { opacity: 1, scale: 1 } : {}}
                  transition={{
                    delay: 0.55 + i * 0.06,
                    duration: 0.4,
                    ease: [0.34, 1.56, 0.64, 1],
                  }}
                  className="rounded-full border border-neutral-300 px-3 py-1 font-mono text-[11px] uppercase tracking-wider text-neutral-600 dark:border-neutral-700 dark:text-neutral-400"
                >
                  {s}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>
  );
}
