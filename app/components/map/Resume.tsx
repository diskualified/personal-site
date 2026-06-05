"use client";

import { motion } from "motion/react";
import { resume } from "../../constants/content-data";

export function ResumeContent() {
  return (
    <div className="mx-auto max-w-2xl px-8 pb-32 pt-28">
      <p className="font-mono text-[10px] uppercase tracking-[0.45em] text-violet-600">
        chapter 01
      </p>
      <h2 className="mt-3 text-4xl font-light tracking-tight text-neutral-100">
        work experience
      </h2>

      <div className="mt-14 grid gap-12 md:grid-cols-2">
        <div>
          <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-600">
            experience
          </p>
          <ul className="mt-6 space-y-8">
            {resume.experience.map((e, i) => (
              <motion.li
                key={e.role}
                initial={{ opacity: 0, y: 14 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 + i * 0.1 }}
              >
                <p className="text-lg font-light text-neutral-200">{e.role}</p>
                <p className="mt-1 font-mono text-[10px] text-neutral-600">
                  {e.company} · {e.period}
                </p>
                <p className="mt-3 text-sm leading-relaxed text-neutral-500">
                  {e.summary}
                </p>
              </motion.li>
            ))}
          </ul>
        </div>

        <div className="space-y-10">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-600">
              education
            </p>
            <ul className="mt-6 space-y-4">
              {resume.education.map((e) => (
                <li key={e.school}>
                  <p className="font-light text-neutral-200">{e.degree}</p>
                  <p className="mt-1 font-mono text-[10px] text-neutral-600">
                    {e.school} · {e.period}
                  </p>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="font-mono text-[10px] uppercase tracking-widest text-neutral-600">
              skill tree
            </p>
            <ul className="mt-6 flex flex-wrap gap-2">
              {resume.skills.map((s, i) => (
                <motion.li
                  key={s}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ delay: 0.4 + i * 0.06 }}
                  className="rounded-full border border-neutral-800 px-3 py-1 font-mono text-[10px] uppercase tracking-wider text-neutral-500"
                >
                  {s}
                </motion.li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
