"use client";

import { motion } from "motion/react";

interface Props {
  text: string;
  inView: boolean;
  delay?: number;
  className?: string;
}

export default function AnimatedChars({
  text,
  inView,
  delay = 0,
  className,
}: Props) {
  return (
    <span className={className} aria-label={text}>
      {text.split("").map((char, i) => (
        <motion.span
          key={i}
          initial={{ opacity: 0, y: 18, filter: "blur(6px)" }}
          animate={
            inView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 18, filter: "blur(6px)" }
          }
          transition={{
            delay: delay + i * 0.038,
            duration: 0.5,
            ease: [0.25, 0.46, 0.45, 0.94],
          }}
          style={{ display: "inline-block" }}
        >
          {char === " " ? " " : char}
        </motion.span>
      ))}
    </span>
  );
}
