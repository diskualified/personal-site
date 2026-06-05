"use client";

import { motion } from "motion/react";
import { projects } from "../../constants/content-data";

export function ProjectsContent() {
  return (
    <div className="mx-auto max-w-2xl px-8 pb-32 pt-28">
      <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-sky-700">
        chapter 02
      </p>
      <h2 className="mt-3 text-4xl font-light tracking-tight text-neutral-100">
        personal projects
      </h2>

      <ul className="mt-14 flex flex-col gap-4">
        {projects.map((p, i) => (
          <motion.li
            key={p.name}
            initial={{ opacity: 0, y: 18 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 + i * 0.1, duration: 0.4 }}
          >
            <a
              href={p.href}
              className="group flex items-center justify-between rounded-xl border border-neutral-800 bg-neutral-900/40 px-6 py-5 transition-colors hover:border-sky-900"
            >
              <div className="flex items-center gap-5">
                <span className="font-mono text-xs text-neutral-600">
                  {p.year}
                </span>
                <div>
                  <p className="text-neutral-200 transition-colors group-hover:text-white">
                    {p.name}
                  </p>
                  <p className="mt-0.5 text-sm text-neutral-500">{p.summary}</p>
                </div>
              </div>
              <span className="font-mono text-[9px] uppercase tracking-widest text-neutral-700 transition-colors group-hover:text-sky-500">
                {p.tag} →
              </span>
            </a>
          </motion.li>
        ))}
      </ul>
    </div>
  );
}
