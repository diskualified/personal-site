"use client";

import { useEffect, useRef } from "react";
import { motion, useInView } from "motion/react";
import type { ZoneId } from "./WorldMap";
import { ZONE_META } from "./WorldMap";
import { chapters } from "../../constants/journey-data";
import { profile } from "../../constants/content-data";
import { ProjectsContent } from "./Projects";
import { ResumeContent } from "./Resume";

// ─── Journey zone ─────────────────────────────────────────────────────────────

function ChapterBlock({
  chapter,
  index,
}: {
  chapter: (typeof chapters)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.2 });

  return (
    <div ref={ref} className="relative pb-20 pl-16">
      <motion.div
        animate={inView ? { scale: 1, opacity: 1 } : { scale: 0, opacity: 0 }}
        transition={{ duration: 0.35, delay: 0.05 }}
        className="absolute left-0 top-0 flex h-11 w-11 items-center justify-center rounded-full border border-amber-900 bg-[#0a0a0a]"
      >
        <span className="font-mono text-[9px] text-amber-600">
          {chapter.number}
        </span>
      </motion.div>

      <motion.div
        animate={inView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
        transition={{ duration: 0.45, delay: 0.1 }}
      >
        <p className="font-mono text-[9px] uppercase tracking-widest text-amber-900">
          chapter {chapter.number} · {chapter.subtitle}
        </p>
        <h3 className="mt-3 text-2xl font-light text-neutral-100">
          {chapter.title}
        </h3>
        <p className="mt-4 leading-relaxed text-neutral-500">{chapter.body}</p>

        {chapter.nodes && chapter.nodes.length > 0 && (
          <div className="mt-5 flex flex-wrap gap-2">
            {chapter.nodes.map((n) => (
              <span
                key={n.id}
                className="inline-flex items-center gap-1.5 rounded-full border border-neutral-800 px-3 py-1 font-mono text-[9px] uppercase tracking-widest text-neutral-600"
              >
                <span className="h-1 w-1 rounded-full bg-amber-700" />
                {n.title}
              </span>
            ))}
          </div>
        )}
      </motion.div>
    </div>
  );
}

function JourneyContent() {
  return (
    <div className="mx-auto max-w-2xl px-8 pb-32 pt-28">
      <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-amber-700">
        chapter 01
      </p>
      <h2 className="mt-3 text-4xl font-light tracking-tight text-neutral-100">
        the journey
      </h2>

      <div className="relative mt-16">
        <div className="absolute bottom-0 left-5 top-0 w-px bg-linear-to-b from-amber-900/60 via-amber-900/30 to-transparent" />
        <div className="flex flex-col">
          {chapters.map((c, i) => (
            <ChapterBlock key={c.id} chapter={c} index={i} />
          ))}
        </div>
      </div>
    </div>
  );
}

// ─── Contact zone ─────────────────────────────────────────────────────────────

function ContactContent() {
  return (
    <div className="mx-auto max-w-2xl px-8 pb-32 pt-28">
      <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-emerald-700">
        chapter 03
      </p>
      <h2 className="mt-3 text-4xl font-light tracking-tight text-neutral-100">
        contact me
      </h2>

      <motion.div
        initial={{ opacity: 0, y: 18 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 0.25 }}
        className="mt-14"
      >
        <p className="leading-relaxed text-neutral-500">
          Open to interesting problems, collaborations, and good causes. Whether
          you want to build something or just say hello — send a message.
        </p>

        <div className="mt-10 flex flex-col gap-3">
          <a
            href={`mailto:${profile.email}`}
            className="group flex items-center gap-3 rounded-xl border border-neutral-800 bg-neutral-900/40 px-6 py-4 text-sm text-neutral-400 transition-colors hover:border-emerald-900 hover:text-neutral-200"
          >
            <span className="h-1.5 w-1.5 rounded-full bg-emerald-500" />
            {profile.email}
            <span className="ml-auto font-mono text-[9px] uppercase tracking-widest text-neutral-700 transition-colors group-hover:text-emerald-600">
              open email ↗
            </span>
          </a>
        </div>
      </motion.div>
    </div>
  );
}

// ─── Overlay shell ────────────────────────────────────────────────────────────

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

        {zone === "journey" && <JourneyContent />}
        {zone === "projects" && <ProjectsContent />}
        {zone === "contact" && <ContactContent />}
        {zone === "resume" && <ResumeContent />}
      </motion.div>

      {/* Back button — stays fixed while content scrolls */}
      <motion.button
        initial={{ opacity: 0, x: -10 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: -10 }}
        transition={{ delay: 0.38, duration: 0.22 }}
        onClick={onClose}
        className="absolute left-6 top-5 z-20 flex items-center gap-2 rounded-full border border-neutral-800 bg-[#0a0a0a]/80 px-4 py-2 font-mono text-[9px] uppercase tracking-widest text-neutral-500 backdrop-blur-sm transition-colors hover:border-neutral-600 hover:text-neutral-200"
      >
        ← map
      </motion.button>
    </div>
  );
}
