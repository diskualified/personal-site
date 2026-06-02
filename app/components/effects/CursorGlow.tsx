"use client";

import { useEffect } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "motion/react";

export default function CursorGlow() {
  const rawX = useMotionValue(-500);
  const rawY = useMotionValue(-500);

  const x = useSpring(rawX, { stiffness: 55, damping: 18, mass: 1 });
  const y = useSpring(rawY, { stiffness: 55, damping: 18, mass: 1 });

  const glowX = useTransform(x, (v) => v - 400);
  const glowY = useTransform(y, (v) => v - 400);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      rawX.set(e.clientX);
      rawY.set(e.clientY);
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, [rawX, rawY]);

  return (
    <div
      className="pointer-events-none fixed inset-0 z-0 hidden overflow-hidden md:block"
      aria-hidden
    >
      <motion.div
        style={{
          x: glowX,
          y: glowY,
          position: "absolute",
          width: 800,
          height: 800,
          borderRadius: "50%",
          background:
            "radial-gradient(circle at center, rgba(150,150,150,0.07) 0%, transparent 60%)",
        }}
      />
    </div>
  );
}
