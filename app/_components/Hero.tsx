"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform } from "motion/react";
import AnimatedChars from "./effects/AnimatedChars";
import ParticleCanvas from "./ParticleCanvas";
import { profile } from "../constants/content-data";

export default function Hero({ onStart }: { onStart: () => void }) {
  const ref = useRef<HTMLElement>(null);

  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const contentY = useTransform(scrollYProgress, [0, 1], [0, -260]);
  const contentOpacity = useTransform(scrollYProgress, [0, 0.5], [1, 0]);
  const contentScale = useTransform(scrollYProgress, [0, 1], [1, 0.72]);

  const [first, ...rest] = profile.name.split(" ");

  return (
    <section
      ref={ref}
      className="relative flex min-h-screen w-full flex-col items-center justify-center overflow-hidden px-6 text-center"
    >
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
          new · episode i
        </motion.p>

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

        <motion.div
          initial={{ opacity: 0, y: 14 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.6, duration: 0.6, ease: "easeOut" }}
          className="mt-14 flex flex-col items-center gap-4"
        >
          <button
            onClick={onStart}
            className="group flex items-center gap-3 rounded-full border border-neutral-700 px-8 py-3 font-mono text-xs uppercase tracking-[0.3em] text-neutral-400 transition-all hover:border-neutral-400 hover:text-neutral-100"
          >
            <motion.span
              animate={{ opacity: [1, 0.3, 1] }}
              transition={{ duration: 1.4, repeat: Infinity }}
              className="h-1.5 w-1.5 rounded-full bg-emerald-400"
            />
            press start
          </button>
          <p className="font-mono text-[9px] uppercase tracking-[0.35em] text-neutral-700">
            or scroll ↓
          </p>
        </motion.div>
      </motion.div>
    </section>
  );
}
