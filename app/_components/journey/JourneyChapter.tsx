"use client";

import { useEffect, useRef, useState } from "react";
import type { Chapter } from "../constants/journey-data";
import InteractiveNode from "./InteractiveNode";

export default function JourneyChapter({
  chapter,
  index,
}: {
  chapter: Chapter;
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const fromLeft = index % 2 === 0;

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const obs = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) setVisible(true);
      },
      { threshold: 0.25 },
    );
    obs.observe(el);
    return () => obs.disconnect();
  }, []);

  return (
    <div ref={ref} className="relative py-20 md:py-24">
      <div
        className={`absolute left-6 top-20 z-10 -translate-x-1/2 transition-all duration-700 md:left-1/2 md:top-24 ${
          visible ? "scale-100 opacity-100" : "scale-50 opacity-0"
        }`}
        aria-hidden
      >
        <span
          className={`flex h-10 w-10 items-center justify-center rounded-full border font-mono text-xs transition-colors duration-700 ${
            visible
              ? "border-neutral-900 bg-neutral-900 text-white dark:border-neutral-100 dark:bg-neutral-100 dark:text-black"
              : "border-neutral-300 bg-white text-neutral-500 dark:border-neutral-700 dark:bg-black"
          }`}
        >
          {chapter.number}
        </span>
      </div>
      <div
        className={`pl-16 transition-all duration-700 ease-out md:pl-0 ${
          fromLeft
            ? "md:mr-auto md:w-[calc(50%-3rem)] md:pr-12 md:text-right"
            : "md:ml-auto md:w-[calc(50%-3rem)] md:pl-12"
        } ${
          visible
            ? "translate-x-0 opacity-100"
            : fromLeft
              ? "-translate-x-4 opacity-0"
              : "translate-x-4 opacity-0"
        }`}
      >
        <p className="font-mono text-[11px] uppercase tracking-widest text-neutral-500">
          chapter {chapter.number} · {chapter.subtitle}
        </p>
        <h3 className="mt-3 text-3xl font-light tracking-tight md:text-4xl">
          {chapter.title}
        </h3>
        <p className="mt-5 leading-relaxed text-neutral-600 dark:text-neutral-400">
          {chapter.body}
        </p>
        {chapter.nodes && chapter.nodes.length > 0 && (
          <div
            className={`mt-8 flex flex-wrap gap-2 ${
              fromLeft ? "md:justify-end" : "justify-start"
            }`}
          >
            {chapter.nodes.map((n) => (
              <InteractiveNode key={n.id} node={n} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
