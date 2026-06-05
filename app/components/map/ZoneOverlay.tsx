"use client";

import { useEffect } from "react";
import { motion } from "motion/react";
import type { ZoneId } from "./WorldMap";
import { ZONE_META } from "./WorldMap";
import { ProjectsContent } from "./Projects";
import { ResumeContent } from "./Resume";
import { ContactContent } from "./Contact";
import { JourneyContent } from "./Journey";

export default function ZoneOverlay({
  zone,
  origin,
  onClose,
}: {
  zone: ZoneId;
  origin: { x: number; y: number };
  onClose: () => void;
}) {
  const meta = ZONE_META[zone];

  // Escape key to close
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") onClose();
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [onClose]);

  return (
    <div className="fixed inset-0 z-50">
      {/* Circle-reveal background */}
      <motion.div
        initial={{ clipPath: `circle(0px at ${origin.x}px ${origin.y}px)` }}
        animate={{ clipPath: `circle(3000px at ${origin.x}px ${origin.y}px)` }}
        exit={{ clipPath: `circle(0px at ${origin.x}px ${origin.y}px)` }}
        transition={{ duration: 0.55, ease: [0.4, 0, 0.2, 1] }}
        className="absolute inset-0 bg-[#0a0a0a]"
      />

      {/* Scrollable content */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.25, delay: 0.28 }}
        className="absolute inset-0 overflow-y-auto"
      >
        {/* Thin colored top accent */}
        <div
          className="sticky top-0 z-10 h-0.5 w-full"
          style={{ background: meta.color }}
        />
        {zone === "resume" && <ResumeContent />}
        {zone === "projects" && <ProjectsContent />}
        {zone === "contact" && <ContactContent />}
        {zone === "journey" && <JourneyContent />}
      </motion.div>

      {/* Back button — stays fixed while content scrolls */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ delay: 0.38, duration: 0.22 }}
        onClick={onClose}
        className="absolute left-6 top-5 z-20 flex cursor-pointer items-center gap-2 rounded-full border border-neutral-800 bg-[#0a0a0a]/80 px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-neutral-500 backdrop-blur-sm transition-colors hover:border-neutral-600 hover:text-neutral-200"
      >
        ← map
      </motion.button>
    </div>
  );
}
